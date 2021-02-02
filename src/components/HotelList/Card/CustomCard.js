import React from 'react'
import { Card, Col } from 'react-bootstrap'

import classes from './CustomCard.module.css'

const CustomCard = (props) => {
    return (
        <Col sm={6} md={6} lg={3} style={{ padding: '15px' }}>
            <Card>
                <Card.Img variant="top" src={ props.src } style={{ height: '150px' }} />
                <Card.Body style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    <div className={ classes.BodyDiv }>
                        <p>City: </p>
                        <p> { props.city } </p>
                    </div>

                    <div className={ classes.BodyDiv }>
                        <p>No of Rooms: </p>
                        <p> { props.rooms } </p>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CustomCard
