import React from 'react'
import { Col } from 'react-bootstrap'

import classes from './Benifit.module.css'


const Benifit = (props) => {
    return (
        <Col md={4} className={ classes.Benifit }>
            <h4 className={ classes.Title }>{ props.title }</h4>
            <p className={ classes.Desc }> { props.desc } </p>
        </Col>
    )
}

export default Benifit
