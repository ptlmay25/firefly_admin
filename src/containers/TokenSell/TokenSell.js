import React, { Component } from 'react'
import { Button, Col, Container, Row, Form } from 'react-bootstrap'
import PhoneInput from 'react-phone-input-2'
import axios from 'axios'
import update from 'immutability-helper'

import NavigationBar from '../../components/Navigation/NavigationBar'

import classes from './TokenSell.module.css'
import { Input } from 'antd'
import { convertToINR, showErrorModal } from '../../resources/Utilities'
import { apiContext } from '../../resources/api-context'


class TokenSell extends Component {
    state = {
        phoneNumberEntered: false,
        userData: '',
        formData: {
            mobileNo: '',
            name: '',
            token_price: 0,
            numberOfTokens: '',
            userTokens: '',
        }
    }

    getTokenPrice = async () => {
        try {
            return await (await axios.get(apiContext.baseURL + '/token/getLatestTokenPrice')).data.data.token_price
        } catch(error) {
            showErrorModal(error.message)
        }
    }
    
    componentDidMount = async ()  => {
        const token_price = await this.getTokenPrice()
        this.setState({ formData: update(this.state.formData, { token_price: { $set: token_price }}) })
    }

    onChange = (value, field) => {
        this.setState({ formData: update(this.state.formData, { [field]: { $set: value }}) })
    }

    onPhoneNumberSubmit = async () => {
        try {
            const userData = await (await axios.get(apiContext.baseURL +  `/user/viewMobile/+${this.state.formData.mobileNo}`)).data.data[0]
            
            const formDataCopy = this.state.formData
            formDataCopy.userTokens = userData.tokens
            formDataCopy.name = userData.username

            this.setState({ 
                phoneNumberEntered: true, 
                userData: userData,
                formData: formDataCopy
            })
        } catch(error) {
            showErrorModal('No such User Exists.')
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault()

        const { userData, formData } = this.state

        if(formData.numberOfTokens > formData.userTokens) {
            showErrorModal('User Does not have enough tokens.')
        } else {
            const FormData = {
                user_id: userData._id,
                num_of_tokens: parseInt(formData.numberOfTokens),
            }
    
            axios.post(apiContext.baseURL + '/buysell/sell', { data: {...FormData}})
                .then((res) => {
                    this.props.history.push('/admin2050/dash')
                })
                .catch((error) => showErrorModal('Token Purchase Failed.'))
        }
    }

    render() {
        const { mobileNo, name, token_price, numberOfTokens, userTokens } = this.state.formData
        return (
            <>
                <NavigationBar />
                <Container fluid className={ classes.FormContainer }>
                    <h4>Manual Token Sell</h4>
                    {
                        !this.state.phoneNumberEntered
                            ?   
                                <Row style={{ paddingTop: '40px', paddingLeft: '40px' }}>
                                    <Col md={ 3 }>
                                        <Row style={{ display: 'flex', flexFlow: 'column' }} className={ classes.Phone }>
                                            <span>Phone Number *</span>
                                            <PhoneInput
                                                value={ mobileNo }
                                                required
                                                onChange={ (value) => this.onChange(value, 'mobileNo') }
                                                country='in'
                                                placeholder="Enter User's Phone Number" />                                   
                                        </Row>
                                        <div style={{ textAlign: 'right' }}>
                                            <Button
                                                variant="success"
                                                style={{ width: '120px', marginRight: '-10px' }} 
                                                onClick={() => this.onPhoneNumberSubmit()}>
                                                    Submit
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            :   <Form onSubmit={ this.onSubmitHandler }>
                                    <Row style={{ paddingTop: '40px', paddingLeft: '40px' }}>
                                        <Col md={ 3 }>
                                            <Row style={{ display: 'flex', flexFlow: 'column' }} className={ classes.Phone }>
                                                <span>Phone Number *</span>
                                                <PhoneInput
                                                    value={ mobileNo }
                                                    disabled
                                                    country='in'
                                                    placeholder="Enter User's Phone Number" />                                   
                                            </Row>

                                            <Row className={ classes.Form }>
                                                <span>Token Price</span>
                                                <Input
                                                    type="number"
                                                    value = { token_price } 
                                                    disabled
                                                    onChange={(event) => this.onChange(event.target.value, 'token_price')} />
                                            </Row>

                                            <Row className={ classes.Form }>
                                                <span>Number of Tokens to Sell *</span>
                                                <Input
                                                    type="number"
                                                    value = { numberOfTokens } 
                                                    placeholder="Enter No of tokens sold by user"
                                                    required
                                                    onChange={(event) => this.onChange(event.target.value, 'numberOfTokens')} />
                                            </Row>

                                            <p style={{ marginTop: '40px', fontSize: '18px' }}>Total Amount :  { `₹ ${ convertToINR(token_price * numberOfTokens)}`} </p>

                                            <div className={ classes.ButtonContainer }>
                                                <Button id="save" style={{ width: '150px' }} type="submit">Update</Button>
                                            </div>
                                        </Col>

                                        <Col md={1}></Col>
                                        <Col md={3}>
                                            <Row>
                                                <span>Full Name </span>
                                                <Input 
                                                    value={ name } 
                                                    onChange={(event) => this.onChange(event.target.value, 'name')}
                                                    disabled />
                                            </Row>

                                            <Row className={ classes.Form }>
                                                <span>Available Tokens</span>
                                                <Input
                                                    type="number"
                                                    value = { userTokens } 
                                                    placeholder="Enter No of tokens sold by user"
                                                    disabled
                                                    onChange={(event) => this.onChange(event.target.value, 'userTokens')} />
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>
                    }                        
                </Container>
            </>
        )
    }
}

export default TokenSell
