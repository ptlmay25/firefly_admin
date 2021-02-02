import React, { Component } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { Input } from 'antd'
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

export class TokenPrice extends Component {

    state = {
        allowUpdate: false,
        otpSent: false,
        confirmResult: null,
        verificationCode: "",
        inProgress: false,
        data: null,
        dataSource: null,
        tokenHistory: {
            month_year: moment(),
            upload_date: moment(),
            total_revenue: 0,
            operating_expenses: 0,
            interest_and_taxes: 0,
            service_fee: 0,
            net_profit: 0,
            total_number_of_tokens: 0,
            previous_divident: 0,
            divident_per_token: 0,
        },
    }

    componentDidMount() {
        axios({ method: 'get', url: 'http://localhost:5000/api/token/' })
        .then((response) => {
            if(response.data.length > 0)
                this.setState({ dataSource: response.data })
        })
        .catch((error) => {
            throw error
        }) 
    }

    onSearch = e => {
        this.setState({ dataSource: this.state.data.filter((entry) =>  entry.date.includes(e.target.value))})
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
    
    verifyOtp = (event) => {
        event.preventDefault();
    
        const { confirmResult, verificationCode } = this.state
        if (verificationCode.length === 6) {
          confirmResult
            .confirm(verificationCode)
            .then(user => {
              this.setState({ otpSent: false, userDetails: user, phone : "", verificationCode: "", inProgress : false });    
            //   alert("Hurray, Your OTP is verified successfully..!!!!");
            // Send update request here
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
        tokenHistory.divident_per_token = tokenHistory.net_profit / tokenHistory.total_number_of_tokens
        this.setState({ tokenHistory: tokenHistory })
        console.log(tokenHistory)

        axios.post('http://localhost:5000/api/token/add', { tokenHistory })
        .then((response) => {
            this.setState({ allowUpdate: response.data.status === 'success' })
        })
        .catch((error) => {
            throw error
        })
    }

    onClearHandler = () => {
        const tokenHistoryCopy = {
            month_year: moment(),
            upload_date: moment(),
            total_revenue: 0,
            operating_expenses: 0,
            interest_and_taxes: 0,
            service_fee: 0,
            net_profit: 0,
            total_number_of_tokens: 0,
            previous_divident: 0,
            divident_per_token: 0,
        }
        this.setState({ 
            tokenHistory: tokenHistoryCopy,
            allowUpdate: false
        })
    }

    onChangeDateHandler = (date, dateString, field) => {
        this.setState({ tokenHistory: update(this.state.tokenHistory, {[field]: {$set: dateString}}) })
    }

    onChangeHandler = (value, field, updateProfit=false) => {
        if(field === 'total_revenue') {
            const { interest_and_taxes, operating_expenses } = this.state.tokenHistory
            const tokenHistoryCopy = { ...this.state.tokenHistory }
            
            if(!isNaN(value)){
                tokenHistoryCopy.total_revenue = value
                tokenHistoryCopy.service_fee = value * 0.15
                tokenHistoryCopy.net_profit = value * 0.85 - interest_and_taxes - operating_expenses
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
        const { month_year, upload_date, total_revenue, operating_expenses, interest_and_taxes, service_fee, net_profit, total_number_of_tokens, previous_divident, divident_per_token } = tokenHistory
        const date = new Date()
        return (
            <>
                <NavigationBar />
                <div className={ classes.FormContainer }>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '140px' }}>
                        <h6><u>Dividend Calculation</u></h6>
                        <Button variant="danger" style={{ width: '150px' }} onClick={() => this.onClearHandler()}>Clear All</Button>
                    </div>
                    <Container fluid style={{ marginTop: '40px' }}>
                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                            <Row>
                                <Col md={5}>
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
                                        label="15% Service fee" 
                                        type="number" 
                                        value={ service_fee === 0 ? '' : service_fee  }
                                        disabled />
                                </Col>
                                <Col md={1}></Col>
                                <Col md={5}>
                                    <InputDiv 
                                        label="Net Profit" 
                                        type="number" 
                                        value={ net_profit === 0 ? '' : net_profit  }
                                        disabled />

                                    <InputDiv 
                                        label="Total Outstanding tokens" 
                                        type="number" 
                                        value={ total_number_of_tokens === 0 ? '' : total_number_of_tokens  }
                                        onChange={(value) => this.onChangeHandler(value, 'total_number_of_tokens')} 
                                        required
                                        disabled={ allowUpdate } />
                                    
                                    <div style={{ padding: '40px 50px 0' }}>
                                        <Table borderless size="sm">
                                            <tbody>
                                                <tr>
                                                    <td style={{ fontWeight: '500' }}>Date: </td>
                                                    <td style={{ fontWeight: '500' }}>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: '500' }}>Last Dividend: </td>
                                                    <td style={{ fontWeight: '500' }}>{ previous_divident === 0 ? '' : previous_divident }</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: '500' }}>Today's Dividend per token: </td>
                                                    <td style={{ fontWeight: '500' }}>{ divident_per_token === 0 ? '' : divident_per_token }</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div style={{ padding: '20px 70px' }} className={ classes.ButtonDiv }>
                                        <Button variant="primary" style={{ width: '150px' }} type="submit">Calculate</Button>
                                        <Button variant="secondary" style={{ width: '150px' }} disabled={ !allowUpdate }><a href="#login">Update</a></Button>
                                    </div>
                                </Col>
                            </Row>
                        </form>
                    </Container>
                </div>
                <div className={ classes.TableContainer }>
                    <div className={classes.Header}>
                        <h6>Dividend History</h6>
                        <Search placeholder="Search By Date" onSearch={ this.onSearch } className={ classes.Search }/>
                    </div>
                    <CustomTable columns={ columns.DIVIDEND_HISTORY } data={ dataSource } />
                </div>
                
                <Container as="div" id="login" className={ classes.LoginContainer }>
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
                                        style={{ width: '350px', marginTop: '15px' }} />
                                    <div>
                                        <Button 
                                            className={ classes.LoginButton }
                                            onClick={(event) => this.verifyOtp(event)}>
                                                Update
                                        </Button>
                                        <Button variant="danger" className={ classes.LoginButton }>Cancel</Button>    
                                    </div>  
                                </>
                    }
                </Container>
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

