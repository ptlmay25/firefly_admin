import React from 'react'

import Section from '../../components/Home/Shared/Section/Section'

import classes from './Terms.module.css'
import TermSheet from './TermSheet'
import Back from '../../components/Shared/Back/Back'

const Sections = () => {
    return (
        <>
            <Back link="/" text="Home" /> 
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
