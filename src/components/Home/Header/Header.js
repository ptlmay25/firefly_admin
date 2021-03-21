import React from 'react'
import { Button } from 'react-bootstrap'

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

            <div className={ classes.Content }>
                <div className={ classes.Data }>               
                    <h2 style={{ color: 'white' }} className={ classes.Heading }>Start your wholesale business from home & earn up to ₹30,000 a month</h2>
                    <div className={ classes.Info }>
                        <p className={ classes.Para }>Saler’s club is democratizing wholesale business  for everyone</p>
                        <Button variant="dark" className={ classes.Button }><img src={ playStore } alt="Play Store" /> 
                            {' '}
                            <a href="https://play.google.com/store/apps/details?id=com.firefly.ibiz" rel="noreferrer" target="_blank" className={ classes.Link }>
                                Get the App
                            </a>
                        </Button>
                    </div>
                </div>
                <img src={ phone } alt="Phone" className={ classes.Image } />
            </div>
        </div>
    )
}

export default Header
