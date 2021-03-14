import React from 'react'
import { Card, Col } from 'react-bootstrap'

import classes from './CustomCard.module.css'

const CustomCard = (props) => {
    return (
        <Col sm={6} md={6} lg={3} style={{ padding: '15px' }}>
            <Card>
                <Card.Img variant="top" src={ props.brandImg } alt={ props.alt } style={{ height: '150px' }} />
                <Card.Body style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    <div className={ classes.BodyDiv }>
                        <p>Brand Name </p>
                        <p>No of Products </p>
                    </div>

                    <div className={ classes.BodyDiv }>
                        <p> { props.brand } </p>
                        <p> { props.products } </p>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CustomCard
