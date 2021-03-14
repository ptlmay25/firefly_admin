import classes from './Section.module.css'
import React from 'react'

const Section = (props) => {
    return (
        <div className={ classes.Section }>
            <p className={ classes.Header }>{ props.title }</p>
            {
                props.content.map(element => 
                    <p className={ classes.Para }>{ element }</p>
                )
            }
        </div>
    )
}

export default Section
