import React, { Component } from 'react'
import { Button, Col, Container, Row, Form } from 'react-bootstrap'
import PhoneInput from 'react-phone-input-2'
import axios from 'axios'
import update from 'immutability-helper'

import NavigationBar from '../../components/Navigation/NavigationBar'

import classes from './TokenPurchase.module.css'
import { Input, Select } from 'antd'
import { convertToINR, showErrorModal } from '../../resources/Utilities'
import { apiContext } from '../../resources/api-context'

const { Option } = Select;


class TokenPurchase extends Component {
    state = {
        phoneNumberEntered: false,
        userData: '',
        FormData: {
            mobileNo: '',
            name: '',
            token_price: 0,
            numberOfTokens: '',
            paymentMethod: '',
            referenceNo: '',
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
        this.setState({ FormData: update(this.state.FormData, { token_price: { $set: token_price }}) })
    }

    onChange = (value, field) => {
        this.setState({ FormData: update(this.state.FormData, { [field]: { $set: value }}) })
    }

    onPhoneNumberSubmit = async () => {
        try {
            const userData = await (await axios.get(apiContext.baseURL +  `/user/viewMobile/+${this.state.FormData.mobileNo}`)).data.data[0]
            
            this.setState({ 
                phoneNumberEntered: true, 
                userData: userData,
                FormData: update(this.state.FormData, { name: { $set: userData.username }})
            })
        } catch(error) {
            showErrorModal('No such User Exists.')
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault()

        const { userData, FormData } = this.state
        
        const formData = {
            user_id: userData._id,
            num_of_tokens: parseInt(FormData.numberOfTokens),
            payment_mode: FormData.paymentMethod,
            payment_token: FormData.referenceNo
        }

        axios.post(apiContext.baseURL + '/buysell/buy', { data: {...formData}})
            .then((res) => {
                this.props.history.push('/admin2050/dash')
            })
            .catch((error) => showErrorModal('Token Purchase Failed.'))
    }

    render() {
        const { mobileNo, name, token_price, numberOfTokens, paymentMethod, referenceNo } = this.state.FormData
        return (
            <>
                <NavigationBar />
                <Container fluid className={ classes.FormContainer }>
                    <h4>Manual Token Purchase</h4>
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
                                                <span>Full Name </span>
                                                <Input 
                                                    value={ name } 
                                                    onChange={(event) => this.onChange(event.target.value, 'name')}
                                                    disabled />
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
                                                <span>Number of Tokens Purchased *</span>
                                                <Input
                                                    type="number"
                                                    value = { numberOfTokens } 
                                                    placeholder="Enter No of tokens purchased by user"
                                                    required
                                                    onChange={(event) => this.onChange(event.target.value, 'numberOfTokens')} />
                                            </Row>
                                        </Col>

                                        <Col md={1}></Col>
                                        <Col md={3}>
                                            <Row style={{ display: 'flex', flexFlow: 'column' }}>
                                                <span>Payment Method *</span>
                                                <Select 
                                                    value={ paymentMethod }
                                                    onChange={(value) => this.onChange(value, 'paymentMethod')}>
                                                        <Option value="upi">UPI</Option>
                                                        <Option value="neft">NEFT</Option>
                                                        <Option value="cheque">Cheque</Option>
                                                </Select>
                                            </Row>

                                            <Row className={ classes.Form }>
                                                <span>UPI / Cheque No / NEFT transaction No *</span>
                                                <Input
                                                    value = { referenceNo } 
                                                    placeholder="Enter your UTR or Cheque No"
                                                    required
                                                    onChange={(event) => this.onChange(event.target.value, 'referenceNo')} />
                                            </Row>

                                            <p style={{ marginTop: '40px', fontSize: '18px' }}>Total Amount :  { `₹ ${ convertToINR(token_price * numberOfTokens)}`} </p>

                                            <div className={ classes.ButtonContainer }>
                                                <Button id="save" style={{ width: '150px' }} type="submit">Update</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                    }                        
                </Container>
            </>
        )
    }
}

export default TokenPurchase
