import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import classes from './Card.module.css'

const Card = (props) => {
    return (
        <Col md={5}>
            <Link to={ `./${ props.link }` } className={ classes.Link }>
                <div className={ classes.Card } style={{ backgroundColor:  props.color }} >
                    <div className={ classes.Heading }>
                        <p style={{ fontSize: '18px' }}> { props.title } </p>
                        <p style={{ fontSize: '17px' }}> { props.amount } </p>
                    </div>
                    <p style={{ fontSize: '17px' }}> { props.cash_amount } </p>
                </div>
            </Link>
        </Col>
    )
}

export default Card
