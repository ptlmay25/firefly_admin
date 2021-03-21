import React from 'react'
import { Button } from 'react-bootstrap'

import playStore from '../../../assets/images/playstore1.png'

import classes from  './Applink.module.css'

const AppLink = () => {
    return (
        <div className={ classes.AppLink }>
            <h3 className={ classes.Title }>Start Your Wholesale Business Today!</h3>
            <p className={ classes.Desc }>Gone are the days when you needed a large investment, a big warehouse, and a fleet of delivery vans to start a wholesale business. With Saler's Club, now anyone can start a wholesale business from home with just a smartphone. And can earn up to ₹ 30,000 a month. Start your own wholesale business with saler's club today.</p>
            <Button variant="dark" className={ classes.Button }><img src={ playStore } alt="Play Store" />
                {' '}
                <a href="https://play.google.com/store/apps/details?id=com.firefly.ibiz" rel="noreferrer" target="_blank" className={ classes.Link }>
                    Get the App
                </a>
            </Button>
        </div>
    )
}

export default AppLink
