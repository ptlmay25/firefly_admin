import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

import classes from './Header.module.css'

import playStore from '../../../assets/images/playstore1.png'
import phone from '../../../assets/images/phone.png'

const Header = () => {
    return (
        <div className={ classes.Header }>
            <div className={ classes.Title }>
                <p className={ classes.Saler }>Saler's Club</p>
                <p className={ classes.Contact } onClick={() => window.location = '#footer'} >Contact Us</p>
            </div>

            <Row>
                <Col sm={ 8 } md={ 6 }  className={ classes.Data }>
                    <h2 style={{ color: 'white' }} className={ classes.Heading }>Start your wholesale business from home & earn up to ₹30,000 a month</h2>
                    <div className={ classes.Info }>
                        <p className={ classes.Para }>Saler’s club is democratizing wholesale business  for everyone</p>
                        <Button
                            variant="dark" 
                            className={ classes.Button }
                            onClick={ () => window.open('https://play.google.com/store/apps/details?id=com.firefly.ibiz', '_blank') }>
                                <img src={ playStore } alt="Play Store" />
                                {' '}Get the App
                        </Button>
                    </div>
                </Col>

                <Col sm={ 1 } md={ 1 }></Col>

                <Col sm={ 3 } md={ 4 }>
                    <img src={ phone } alt="Phone" className={ classes.Image } />
                </Col>
            </Row>
        </div>
    )
}

export default Header
