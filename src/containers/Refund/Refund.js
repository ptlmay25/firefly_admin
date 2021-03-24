import React from 'react'

import Section from '../../components/Home/Shared/Section/Section'


import classes from './Refund.module.css'
import RefundSheet from './RefundSheet'
import Back from '../../components/Shared/Back/Back'

const Refund = () => {
    return (
        <>
            <Back link="/" text="Home" />
            <div className={ classes.Refund }>
                <h4 style={{ marginBottom: '30px' }}>Refund Policy</h4>
                {
                    RefundSheet.map(element => 
                        <Section title={ element.title } content={ element.content } />    
                    )
                }
            </div>
        </>
    )
}

export default Refund
