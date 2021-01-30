import React, { Component } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { Input } from 'antd'
import firebase from 'firebase'
import PhoneInput from 'react-phone-input-2'


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
        dataSource: null
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
            //   this.props.history.push('/')
              alert("Hurray, Your OTP is verified successfully..!!!!");
            })
            .catch(error => {
              alert(error.message)
            })
        } else {
          alert("Please enter a 6 digit OTP code.");
        }
    }

    render() {
        const { otpSent, allowUpdate, verificationCode, dataSource, inProgress, phone } = this.state
        return (
            <>
                <NavigationBar />
                <div className={ classes.FormContainer }>
                    <h6><u>Dividend Calculation</u></h6>
                    <Container fluid style={{ marginTop: '40px' }}>
                        <Row>
                            <Col md={5}>
                                <InputDiv label="Month + Year" type="month" />
                                <InputDiv label="Date" type="date" />
                                <InputDiv label="Total Revenue" type="number" />
                                <InputDiv label="Operating Expenses" type="number" />
                                <InputDiv label="Interest and tax" type="number" />
                                <InputDiv label="15% Service fee" type="number" />
                            </Col>
                            <Col md={1}></Col>
                            <Col md={5}>
                                <InputDiv label="Net Profit" type="number" />
                                <InputDiv label="Total Outstanding tokens" type="number" />
                                <div style={{ padding: '40px 50px 0' }}>
                                    <Table borderless size="sm">
                                        <tbody>
                                            <tr>
                                                <td style={{ fontWeight: '500' }}>Date: </td>
                                                <td style={{ fontWeight: '500' }}>05/01/21</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: '500' }}>Last Dividend: </td>
                                                <td style={{ fontWeight: '500' }}>$250.20</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: '500' }}>Today's Dividend per token: </td>
                                                <td style={{ fontWeight: '500' }}>$250.20</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div style={{ padding: '20px 70px' }}>
                                    <Button variant="primary" style={{ width: '150px' }}>Calculate</Button>
                                    <Button variant="secondary" style={{ width: '150px' }} disabled={ !allowUpdate }>Update</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className={ classes.TableContainer }>
                    <div className={classes.Header}>
                        <h6>Dividend History</h6>
                        <Search placeholder="Search By Date" onSearch={ this.onSearch } className={ classes.Search }/>
                    </div>
                    <CustomTable columns={ columns.DIVIDEND_HISTORY } data={ dataSource } />
                </div>
                
                <Container as="div" className={ classes.LoginContainer }>
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
                                    onClick={(event) => this.sendOtp(event)}>
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

