import React from 'react'
import { Row, Container, Col } from 'react-bootstrap'

import classes from './Stats.module.css'

import retailers from '../../../assets/images/Stats/retailers.png'
import manufacturers from '../../../assets/images/Stats/manufacturers.png'
import cities from '../../../assets/images/Stats/cities.png'

const Stats = () => {
    return (
        <Container fluid className={ classes.Stats }>
            <Row>
                <Col md={4} className={ classes.Stat }>
                    <img src={ retailers } alt="Retailers" className={ classes.Image }></img>
                    <p className={ classes.Desc }>1,000+ retailers & growing</p>
                </Col>

                <Col md={4} className={ classes.Stat }>
                    <img src={ manufacturers } alt="Manufacturers" className={ classes.Image }></img>
                    <p className={ classes.Desc }>500+ manufacturers</p>
                </Col>

                <Col md={4} className={ classes.Stat }>
                    <img src={ cities } alt="Cities" className={ classes.Image }></img>
                    <p className={ classes.Desc }>20+ towns covered</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Stats
