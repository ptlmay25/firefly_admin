import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { FacebookFilled, InstagramOutlined, TwitterOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import classes from './Footer.module.css'

const Footer = (props) => {
    return (
        <>
            <Container className={ classes.Footer } fluid id={ props.id }>
                <Row>
                    <Col md={6} lg={4} className={ classes.Details }>
                        <h3 style={{ color: 'white' }}>Start Your Wholesale Business with Saler’s club</h3>
                        <p>Become your own boss and earn up to  ₹ 30,000 or more every month</p>
                        <Button 
                            className= { classes.Button } 
                            variant="success" 
                            onClick={ () => window.open('https://play.google.com/store/apps/details?id=com.firefly.ibiz', '_blank') }>
                                Get App
                        </Button>
                    </Col>

                    <Col md={1} lg={4}></Col>
                    <Col md={1} lg={2} style={{ borderLeft: '2px solid white' }}></Col>

                    <Col md={4} lg={2} className={ classes.Contact }>
                        <h3 style={{ color: 'white' }}>Contact Us</h3>
                        <div className={ classes.ContactDetails }>
                            <p>info@salersclub.com</p>
                            <p>partner@salersclub.com</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className={ classes.LinkContainer }>
                <div className={ classes.Links }>
                    <span onClick={ () => props.openModal() } className={ classes.Link } style={{ cursor: 'pointer' }}>About Us</span>
                    <Link to="/terms" className={ classes.Link }>T&C's</Link>
                    <Link to="/privacy" className={ classes.Link }>Privacy Policy</Link>
                    <Link to="/refund" className={ classes.Link }>Refund Policy</Link>
                </div>
                
                <div className={ classes.Icons }>
                    <a href="https://www.facebook.com/Salersclub-115967853648127" rel="noreferrer" target="_blank">
                        <FacebookFilled className={ classes.Icon }/>
                    </a> {'    '}
                    <a href="https://www.instagram.com/salersclub/" rel="noreferrer" target="_blank">
                        <InstagramOutlined className={ classes.Icon } />
                    </a> {'    '}
                    <a href="https://twitter.com/Salersclub" rel="noreferrer" target="_blank">
                        <TwitterOutlined className={ classes.Icon }/>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Footer
