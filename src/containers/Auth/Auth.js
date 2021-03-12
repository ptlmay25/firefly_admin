import React, { Component } from 'react'
import { Input, Button, Space } from 'antd'
import firebase from 'firebase';
import PhoneInput from 'react-phone-input-2'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'

import AdminImage from '../../assets/admin.png'
import classes from './Auth.module.css'
import "../../resources/firebase-context";
import * as actions from './../../store/actions/index'


class Auth extends Component {
    state = {
      OTPSent: false,
      confirmResult: null,
      verificationCode: "",
      inProgress: false
    }

    componentDidMount = () => {
      if(sessionStorage.getItem('token')) {
        this.props.history.push('./dash')
      }
    }

    // To create a new Captcha for OTP verification
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

    // To send OTP to the entered mobile number
    sendOtp = (event) => {
      event.preventDefault();
      if(this.state.phone === '917600257008' || this.state.phone === '917874994529') {
        this.captchaInit();
        this.setState({ inProgress: true });
    
        firebase.auth().signInWithPhoneNumber("+" + this.state.phone, this.applicationVerifier)
          .then(confirmResult => {
            this.setState({ confirmResult, OTPSent: true, inProgress: false });
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
    
    // To verify the input OTP
    verifyOtp = (event) => {
      event.preventDefault();
  
      const { confirmResult, verificationCode } = this.state
      if (verificationCode.length === 6) {
        confirmResult
          .confirm(verificationCode)
          .then(user => {
            this.setState({ OTPSent: false, userDetails: user, phone : "", verificationCode: "", inProgress : false });    
            this.props.onAuthStart()
            sessionStorage.setItem('token', true)
            this.props.history.push('/dash')
          })
          .catch(error => {
            alert(error.message)
          })
      } else {
        alert("Please enter a 6 digit OTP code.");
      }
    }

    render() {
        return (
            <div className={ classes.Auth }>
                <img src={AdminImage} alt="Admin Logo" className={ classes.Image } />
                <Container className={ classes.InputContainer }>
                    <PhoneInput 
                        value={ this.state.phone }
                        required={ true }
                        autoFocus={ true }
                        onChange={ (phone) => this.setState({ phone }) }
                        country='in'
                        disabled={ this.state.inProgress }
                        className={ classes.PhoneInput }
                        placeholder="Phone Number" />

                    {
                        !this.state.OTPSent 
                        ?   <Button 
                                size="large" 
                                shape="round" 
                                type="primary" 
                                className={ classes.OTP } 
                                onClick={(event) => this.sendOtp(event)}>
                                    Send OTP
                            </Button>
                        :   <>
                                <Space direction="vertical" className={ classes.Input }>
                                    <Input.Password
                                        value={ this.state.verificationCode }
                                        onChange={ (e) => this.setState({ verificationCode: e.target.value }) }                            
                                        placeholder="Enter OTP"
                                        maxLength={6}
                                        style={{ marginTop: '20px', marginLeft: '10px' ,width: '300px' }}/>
                                </Space>

                                <Button 
                                        size="large" 
                                        shape="round" 
                                        type="primary" 
                                        className={ classes.OTP }
                                        onClick={(event) => this.verifyOtp(event)}> 
                                            Login
                                </Button>
                            </>
                    }
                    <div ref={ref => this.recaptchaWrapperRef = ref}>
                      <div id="recaptcha-container"></div>
                    </div>
                </Container>
            </div>
        )
    }
}

const mapDispatchtoProps = dispatch => {
  return {
      onAuthStart: () => dispatch(actions.authStart()),
  }
}

export default connect(null, mapDispatchtoProps)(Auth)
