import React, { Component } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { Input, Modal } from 'antd'
import firebase from 'firebase'
import PhoneInput from 'react-phone-input-2'
import update from 'immutability-helper'
import axios from 'axios'
import moment from 'moment'

import NavigationBar from '../../components/Navigation/NavigationBar'
import InputDiv from '../../components/TokenPrice/InputDiv/InputDiv'
import classes from './TokenPrice.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import Search from '../../components/Shared/Search/Search'
import "../../resources/firebase-context";
import { apiContext } from '../../resources/api-context'
import { convertToINR, showErrorModal } from '../../resources/Utilities'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'

const MONTHS = [ 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

export class TokenPrice extends Component {

    state = {
        allowUpdate: false,
        isModalOpen: false,
        otpSent: false,
        confirmResult: null,
        verificationCode: "",
        inProgress: false,  
        tokenPriceHistory: null,
        dataSource: null,
        isLoading: true,
        tokenHistory: {
            month_year: moment(),
            upload_date: moment(),
            price_per_token: 0,
            total_revenue: 0,
            operating_expenses: 0,
            interest_and_taxes: 0,
            split_50_50: 0,
            net_profit: 0,
            total_number_of_tokens: 0,
            dividend_per_token: 0,
            new_token_price: 0,
        },
    }

    getTokenPrice = async () => {
        try {
            return await (await axios.get(apiContext.baseURL + '/token/getLatestTokenPrice')).data.data.token_price
        } catch(error) {
            showErrorModal(error.message)
        }
    }

    getNumberOfTokens = async () => {
        try {
            return await (await axios.get(apiContext.baseURL + '/token/getNumberOfTokens')).data.data
        } catch (error) {
            showErrorModal(error.message)
        }
    }

    getTokenHistory = async () => {
        try {
            const tokenHistoryData = await (await axios.get(apiContext.baseURL + '/token')).data.data
        
            return tokenHistoryData.map((element) => {
                const date = new Date(element.upload_date)
                return {
                    key: element._id,
                    total_revenue: `₹ ${ convertToINR(element.total_revenue )}`,
                    operating_expenses: `₹ ${ convertToINR(element.operating_expenses )}`,
                    interest_and_taxes: `₹ ${ convertToINR(element.interest_and_taxes )}`,
                    net_profit: `₹ ${ convertToINR(element.net_profit )}`,
                    split_50_50: `₹ ${ convertToINR(element.split_50_50 )}`,
                    total_number_of_tokens: element.total_number_of_tokens,
                    dividend_per_token: `₹ ${ convertToINR(element.dividend_per_token )}`,
                    token_price: `₹ ${ convertToINR(element.token_price )}`,
                    upload_date: new Date(element.upload_date).toLocaleDateString('en-IN'),
                    month: `${ MONTHS[ date.getMonth()] } ${ date.getFullYear() }`
                }
            })
        } catch (error) {
            showErrorModal(error.message)
        }
    }

    componentDidMount = async () => {
        try {            
            const tokenInfo = this.state.tokenHistory

            const tokenHistoryData = await this.getTokenHistory()
            tokenInfo.price_per_token = await this.getTokenPrice()
            tokenInfo.total_number_of_tokens = await this.getNumberOfTokens()

            this.setState({
                isLoading: false,
                tokenHistory: tokenInfo,
                tokenPriceHistory: tokenHistoryData,
                dataSource: tokenHistoryData
            })
        }
        catch(error) {
            showErrorModal(error.message)
        }
    }

    onSearch = e => {
        this.setState({ dataSource: this.state.tokenPriceHistory.filter((entry) =>  entry.upload_date.includes(e.target.value))})
    }

    captchaInit = () => {
        if (this.applicationVerifier && this.recaptchaWrapperRef) {
          this.applicationVerifier.clear()
          this.recaptchaWrapperRef.innerHTML = `<div id="recaptcha-container"></div>`
        }
    
        this.applicationVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible"
          }
        );
    }

    sendOtp = (event) => {
        event.preventDefault();

        if(apiContext.validPhoneNumbers.includes(this.state.phone)){
            this.captchaInit();
            this.setState({ inProgress: true });
        
            firebase.auth().signInWithPhoneNumber("+" + this.state.phone, this.applicationVerifier)
            .then(confirmResult => {
                this.setState({ confirmResult, otpSent: true, inProgress: false });
            })
            .catch(error => {
                this.captchaInit();
                this.setState({ inProgress: false });
                alert(error.message);
            })
        }
        else {
            alert("The Number you have entered is not authenticated! Kindly enter administrator's phone number.")
        }
    }
    
    verifyOtp = (event) => {
        event.preventDefault();
    
        const { confirmResult, verificationCode } = this.state
        if (verificationCode.length === 6) {
          confirmResult
            .confirm(verificationCode)
            .then(user => {
                this.setState({ otpSent: false, userDetails: user, phone : "", verificationCode: "", inProgress : false });    
                axios.post(apiContext.baseURL + '/token/create', { data: { ...this.state.tokenHistory }})
                    .then((response) => {
                        this.onClearHandler()
                        this.setState({ 
                            isModalOpen: false,
                        })
                        window.location.reload()
                    })
                    .catch((error) => {
                        this.setState({ isModalOpen: false })
                        showErrorModal(error.message)
                        throw error
                    })
            })
            .catch(error => {
              alert(error.message)
            })
        } else {
          alert("Please enter a 6 digit OTP code.");
        }
    }

    onFormSubmit = (event) => {
        event.preventDefault()
        const tokenHistory = this.state.tokenHistory
        tokenHistory.dividend_per_token = tokenHistory.split_50_50 / tokenHistory.total_number_of_tokens
        tokenHistory.new_token_price = tokenHistory.dividend_per_token + tokenHistory.price_per_token
        
        let date = tokenHistory.upload_date.toString()
        tokenHistory.upload_date = `${date.substring(3,5)}/${date.substring(0,2)}/${date.substring(6,)}`
    
        this.setState({ tokenHistory: tokenHistory, allowUpdate: true })
    }

    onClearHandler = async () => {
        const tokenHistoryCopy = {
            month_year: moment(),
            upload_date: moment(),
            price_per_token: await this.getTokenPrice(),
            total_revenue: 0,
            operating_expenses: 0,
            interest_and_taxes: 0,
            net_profit: 0,
            split_50_50: 0,
            total_number_of_tokens: await this.getNumberOfTokens(),
            dividend_per_token: 0,
            new_token_price: 0,
        }
        this.setState({ 
            tokenHistory: tokenHistoryCopy,
            allowUpdate: false
        })
    }

    onChangeDateHandler = (date, dateString, field) => {
        this.setState({ tokenHistory: update(this.state.tokenHistory, {[field]: { $set: dateString }}) })
    }

    onTotalTokenChangeHandler = (value) => {
        this.setState({ price_per_token: update(this.state.tokenHistory, { total_number_of_tokens: { $set: value }})})
    } 

    onTokenPriceChangeHandler = (value) => {
        this.setState({ price_per_token: update(this.state.tokenHistory, { price_per_token: { $set: value }})})
    }

    onChangeHandler = (value, field, updateProfit=false) => {
        if(field === 'total_revenue') {
            const { interest_and_taxes, operating_expenses } = this.state.tokenHistory
            const tokenHistoryCopy = { ...this.state.tokenHistory }
            
            if(!isNaN(value)){
                tokenHistoryCopy.total_revenue = value
                tokenHistoryCopy.net_profit = value - interest_and_taxes - operating_expenses
                tokenHistoryCopy.split_50_50 = tokenHistoryCopy.net_profit/2
            }
            this.setState({ tokenHistory: tokenHistoryCopy })
        } else if(field === 'total_no_of_tokens') {
            const tokenHistoryCopy = { ...this.state.tokenHistory }
            if(!isNaN(value)) {
                tokenHistoryCopy.total_number_of_tokens = value
            }

            this.setState({ tokenHistory: tokenHistoryCopy })
        } else if(updateProfit) {
            const tokenHistoryCopy = { ...this.state.tokenHistory }
            const { net_profit } = this.state.tokenHistory

            if(!isNaN(value)) {
                tokenHistoryCopy[field] = value
                tokenHistoryCopy.net_profit = net_profit + (this.state.tokenHistory[field] - value) 
                tokenHistoryCopy.split_50_50 = tokenHistoryCopy.net_profit/2
            }

            this.setState({ tokenHistory: tokenHistoryCopy })
        } else {
            this.setState({ 
                tokenHistory: update(this.state.tokenHistory, { [field]: { $set: value }}) 
            })
        }
    }

    render() {
        const { otpSent, allowUpdate, verificationCode, dataSource, inProgress, phone, tokenHistory } = this.state
        const { price_per_token, month_year, upload_date, total_revenue, operating_expenses, interest_and_taxes, split_50_50, net_profit, total_number_of_tokens, dividend_per_token, new_token_price } = tokenHistory
        const date = new Date().toLocaleDateString('EN-IN')
        return (
            <>
                <NavigationBar />
                {
                    this.state.isLoading 
                        ?   <LoadingSpinner />
                        :   
                            <>
                                <div className={ classes.FormContainer }>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '140px' }}>
                                        <h6><u>Token Price Calculation</u></h6>
                                        <Button variant="danger" style={{ width: '150px' }} onClick={() => this.onClearHandler()}>Clear All</Button>
                                    </div>
                                    <Container fluid style={{ marginTop: '40px' }}>
                                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                                            <Row>
                                                <Col md={5}>
                                                    <InputDiv 
                                                        label="Price per token" 
                                                        type="number" 
                                                        onChange={(value) => this.onTokenPriceChangeHandler(value)}
                                                        value={ price_per_token } 
                                                        disabled/>
                
                                                    <InputDiv 
                                                        label="Month + Year" 
                                                        type="month" 
                                                        value={ month_year } 
                                                        onChange={(data, dateString) => this.onChangeDateHandler(data, dateString, 'month_year')}
                                                        required
                                                        disabled={ allowUpdate }/>
                                                    
                                                    <InputDiv 
                                                        label="Date" 
                                                        type="date" 
                                                        value={ upload_date } 
                                                        onChange={(data, dateString) => this.onChangeDateHandler(data, dateString, 'upload_date')} 
                                                        required
                                                        disabled={ allowUpdate }/>
                
                                                    <InputDiv 
                                                        label="Total Revenue" 
                                                        type="number" 
                                                        value={ total_revenue === 0 ? '' : total_revenue } 
                                                        onChange={(value) => this.onChangeHandler(value, 'total_revenue')}
                                                        required
                                                        disabled={ allowUpdate } />
                
                                                    <InputDiv 
                                                        label="Operating Expenses" 
                                                        type="number" 
                                                        value={ operating_expenses === 0 ? '' : operating_expenses  } 
                                                        onChange={(value) => this.onChangeHandler(value, 'operating_expenses', true)} 
                                                        required
                                                        disabled={ allowUpdate }/>
                
                                                    <InputDiv 
                                                        label="Interest and tax" 
                                                        type="number" 
                                                        value={ interest_and_taxes === 0 ? '' : interest_and_taxes  }
                                                        onChange={(value) => this.onChangeHandler(value, 'interest_and_taxes', true)} 
                                                        required
                                                        disabled={ allowUpdate } />
                
                                                    <InputDiv 
                                                        label="Net Profit" 
                                                        type="number" 
                                                        value={ net_profit === 0 ? '' : net_profit  }
                                                        disabled />
                                                </Col>
                                                <Col md={1}></Col>
                                                <Col md={5}>
                                                    <InputDiv 
                                                        label="50/50 Split" 
                                                        type="number" 
                                                        value={ split_50_50 === 0 ? '' : split_50_50  }
                                                        disabled />
                
                                                    <InputDiv 
                                                        label="Total Outstanding tokens" 
                                                        type="number" 
                                                        value={ total_number_of_tokens === 0 ? '' : total_number_of_tokens  }
                                                        onChange={(value) => this.onTotalTokenChangeHandler(value)}
                                                        disabled />
                                                    
                                                    <div style={{ padding: '80px 50px 0' }}>
                                                        <Table borderless size="sm">
                                                            <tbody>
                                                                <tr>
                                                                    <td colSpan={2} style={{ fontWeight: '500' }}>Today's Dividend per token: </td>
                                                                    <td colSpan={2} style={{ fontWeight: '500' }}>{ dividend_per_token === 0 ? '' : `${ convertToINR(dividend_per_token ) }` }</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ fontWeight: '500' }}>New Token Price: </td>
                                                                    <td style={{ fontWeight: '500' }}>{ new_token_price === 0 ? '' : `${ convertToINR(new_token_price) }` }</td>
                                                                    <td style={{ fontWeight: '500' }}>Date: </td>
                                                                    <td style={{ fontWeight: '500' }}>{date}</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                    <div style={{ padding: '20px 70px' }} className={ classes.ButtonDiv }>
                                                        <Button variant="primary" style={{ width: '150px' }} type="submit">Calculate</Button>
                                                        <Button variant="secondary" style={{ width: '150px' }} disabled={ !allowUpdate } onClick={() => this.setState({ isModalOpen: true })}>
                                                            Update
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </form>
                                    </Container>
                                </div>
                                <div className={ classes.TableContainer }>
                                    <div className={classes.Header}>
                                        <h6>Token Price History</h6>
                                        <Search placeholder="Search By Date" onSearch={ this.onSearch } className={ classes.Search }/>
                                    </div>
                                    <CustomTable columns={ columns.TOKEN_PRICE_HISTORY } data={ dataSource } />
                                </div>
                            </>
                }
                
                
                <Modal
                    visible={ this.state.isModalOpen }
                    footer={ null }
                    className={ classes.Modal }
                    destroyOnClose
                    centered
                    onCancel={ () => this.setState({ isModalOpen: false }) }
                    >
                        <div className={ classes.LoginContainer }>
                            <h6>Confirm your ID to update Token price</h6>
                            <PhoneInput 
                                placeholder="Admin Phone Number" 
                                country='in'
                                value={ phone }
                                required={ true }
                                autoFocus={ true }
                                onChange={ (p) => this.setState({ phone: p }) }
                                disabled={ inProgress } 
                                className={ classes.Input } 
                                style={{ width: '350px', marginTop: '40px' }}
                            />

                            {
                                !otpSent 
                                    ?   <Button 
                                            className={ classes.OTP }
                                            onClick={(event) => this.sendOtp(event)}
                                            disabled={ !allowUpdate }>
                                                Get OTP
                                        </Button> 
                                    :   <>
                                            <Input.Password
                                                value={ verificationCode }
                                                onChange={ (e) => this.setState({ verificationCode: e.target.value }) } 
                                                placeholder="OTP" 
                                                maxLength={6}
                                                style={{ width: '300px', marginTop: '15px' }} />
                                            <div>
                                                <Button 
                                                    className={ classes.LoginButton }
                                                    onClick={(event) => this.verifyOtp(event)}>
                                                        Update
                                                </Button>
                                                <Button 
                                                    variant="danger" 
                                                    className={ classes.LoginButton } 
                                                    onClick={() => this.setState({ isModalOpen: false})}>
                                                        Cancel
                                                </Button>    
                                            </div>  
                                        </>
                            }
                        </div>
                </Modal>
                
                <div ref={ref => this.recaptchaWrapperRef = ref}>
                      <div id="recaptcha-container"></div>
                </div>
                <br />
                <br />
            </>
        )
    }
}

export default TokenPrice

