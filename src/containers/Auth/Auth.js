import React, { useState } from 'react'
import { Input, Button, Space } from 'antd'
import { Container } from 'react-bootstrap'

import AdminImage from '../../assets/admin.png'
import classes from './Auth.module.css'

const Auth = () => {
    const [isOtpEntered, setIsOtpEntered] = useState(false)

    return (
        <div className={ classes.Auth }>
            <img src={AdminImage} alt="Admin Logo" className={ classes.Image } />
            <Container className={ classes.InputContainer }>
                <Input maxLength="10" minLength="10" placeholder="Phone No." className={ classes.Input }/>
                {
                    isOtpEntered ?
                    <React.Fragment>
                        <Space direction="vertical" className={ classes.Input }>
                            <Input.Password placeholder="Enter OTP" style={{ marginTop: '20px' }}/>
                        </Space>

                        <Button 
                            size="large" 
                            shape="round" 
                            type="primary" 
                            className={ classes.OTP }> 
                                Login
                        </Button>
                    </React.Fragment>   :
                    <Button 
                        size="large" 
                        shape="round" 
                        type="primary" 
                        className={ classes.OTP } 
                        onClick={() => setIsOtpEntered(true)}>
                            Send OTP
                    </Button>
                }
            </Container>
        </div>
    )
}

export default Auth
