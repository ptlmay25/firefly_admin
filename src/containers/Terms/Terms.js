import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

import Section from '../../components/Home/Shared/Section/Section'

import classes from './Terms.module.css'
import TermSheet from './TermSheet'

const Sections = () => {
    return (
        <>
            <div className={ classes.LinkContainer }>
                <ArrowLeftOutlined style={{ fontSize: '12px', marginRight: '5px', verticalAlign: 'middle' }}/> 
                <Link to="/" className={ classes.Link } >
                    Home
                </Link>
            </div>
            <div className={ classes.Terms }>
                <h4 style={{ marginBottom: '30px' }}>TERMS OF SERVICE</h4>
                {
                    TermSheet.map(element => 
                        <Section title={ element.title } content={ element.content } />    
                    )
                }

            </div>
        </>
    )
}

export default Sections
