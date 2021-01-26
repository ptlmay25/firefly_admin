import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import Card from '../../components/Dashboard/Card/Card'
import classes from './Dashboard.module.css'

const Dashboard = () => {
    return (
        <Container fluid className={ classes.Dashboard }>
            <Row>
                <Col md={2} className={ classes.SideMenu }>
                    <h3>FIREFLY</h3>
                    <hr></hr>
                    <div className={ classes.Links }>
                        <NavLink to="/dash" className={ classes.Link }>Dashboard</NavLink>
                        <NavLink to="/purchase-history" className={ classes.Link }>Purchase History</NavLink>
                        <NavLink to="/selling-history" className={ classes.Link }>Sell History</NavLink>
                        <NavLink to="/withdraw-history" className={ classes.Link }>Withdraw History</NavLink>
                        <NavLink to="/logout" className={ classes.Link }>Log out</NavLink>
                    </div>
                </Col>

                <Col md={10} className={ classes.MainMenu }>
                    <h5>Dashboard</h5>
                    <hr></hr>
                    <div style={{ padding: '10px 20px' }}>
                        <Row>
                            <Card title="Token Price + Dividend" color="#06C167" cash_amount="2500" amount="" link="token-price"/>
                            <Card title="Total Token Purchased" color="#CC20F6" cash_amount="65000" amount="5000000" />
                        </Row>

                        <Row>
                            <Card title="Total Token sold" color="#E3CF1A" cash_amount="65000" amount="25000" />
                            <Card title="Withdraw Request" color="#F94A4A" cash_amount="65000" amount="80/100" link="withdraw-request" />
                        </Row>

                        <Row>
                            <Card title="Total Hotels + Rooms" color="#5B2600" cash_amount="Rooms: 5000" amount="Brand: 100" link="hotels"/>
                            <Card title="User List" color="#3B5AC9" cash_amount="1000" amount="" link="users"/>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard
