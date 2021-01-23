import React from 'react'
import classes from './Box.module.css'

const Box = (props) => {
    return (
        <div className={ classes.Box }>
            <p>{ props.title }</p>
            <p>{ props.amount }</p>
        </div>
    )
}

export default Box
