import React from 'react'
import { Col } from 'react-bootstrap'

import classes from  './Item.module.css'

const Item = (props) => {
    return (
        <Col md={4} className={ classes.Item }>
            <img src={ props.image } alt={ props.alt } />
        </Col>
    )
}

export default Item
