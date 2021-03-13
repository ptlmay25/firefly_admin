import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

import Section from '../../components/Home/Shared/Section/Section'


import classes from './Refund.module.css'
import RefundSheet from './RefundSheet'

const Refund = () => {
    return (
        <>
            <div className={ classes.LinkContainer }>
                <ArrowLeftOutlined style={{ fontSize: '12px', marginRight: '5px', verticalAlign: 'middle' }}/> 
                <Link to="/" className={ classes.Link } >
                    Home
                </Link>
            </div>

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
