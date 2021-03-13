import React from 'react'

import classes from './ModalContent.module.css'

const ModalContent = () => {
    return (
        <div className={ classes.Div }>
            <h5 className={ classes.Header } >ABOUT US</h5>
            <div className={ classes.ParaDiv}>
                <p>We are the making next generation wholesale / reseller app in India. Saler’s club is providing millions of individuals including housewives and graduate students a platform to start their own online wholesale business and earn money with joy and pride, what our resellers like to call #BeYourOwnBoss.</p>
                <p>Saler’s club gives users access to a virtual shop, millions of products from trusted suppliers, payments and shipping facilities thereby removing the hassles of starting an online business. While we do all the heavy-lifting, users can seamlessly sell products to their network and earn.</p>
            </div>
        </div>
    )
}

export default ModalContent
