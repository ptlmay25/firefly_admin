import React from 'react'
import { Container, Row } from 'react-bootstrap'

import Benifit from './Benifit/Benifit'
import classes from './Benifits.module.css'

const Benifits = () => {
    return (
        <Container fluid className={ classes.Benifits }>
            <div className={ classes.Header1 }>
                <div className={ classes.Header }>
                    <h2 className={ classes.Heading }>Why Join Saler’s Club ?</h2>
                </div>
            </div>
            <Row className={ classes.Row }>
                <Benifit 
                    title="Become your own boss"
                    desc="Start your wholesale business from home or from anywhere in the world. All you need is a smartphone and an internet connection."
                />

                <Benifit 
                    title="₹ 30,000 income / month"
                    desc="Earn up to ₹30,000 or more each month. There is no limit on how much you can earn."
                />

                <Benifit 
                    title="Up to ₹ 50,000 travel discount"
                    desc="Become a pro member and get up to ₹ 50,000 travel discount a year."
                />
            </Row>
        </Container>
    )
}

export default Benifits
