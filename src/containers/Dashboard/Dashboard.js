import axios from 'axios'
import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import Card from '../../components/Dashboard/Card/Card'
import { apiContext } from '../../resources/api-context'
import { showErrorModal, convertToINR } from '../../resources/Utilities'
import classes from './Dashboard.module.css'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'


class Dashboard extends Component {

    state = {
        data: {
            users: 0,
            token_price: 0,
            purchase: {
                total_tokens: 0,
                amount: 0
            },
            sold: {
                total_tokens: 0,
                amount: 0
            },
            withdrawRequest: {
                requests: 0,
                amount: 0
            },
            hotels: {
                brands: 0,
                rooms: 0
            }
        },
        isLoading: true,
    }

    componentDidMount() {
        axios.get(apiContext.baseURL + '/dashboard')
            .then((response) => {
                this.setState({
                    data: response.data.data,
                    isLoading: false
                })
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                showErrorModal(error.message)
            })
    }

    render() {
        const { token_price , purchase, sold, withdrawRequest, hotels, users } = this.state.data
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
                            <NavLink to="/contact-history" className={ classes.Link }>Contact History</NavLink>
                            <NavLink to="/contact-request" className={ classes.Link }>Contact Requests</NavLink>
                            <NavLink to="/logout" className={ classes.Link } onClick={() => this.props.onAuthEnd()}>Log out</NavLink>
                        </div>
                    </Col>
                    <Col md={10} className={ classes.MainMenu }>
                    {
                        this.state.isLoading 
                            ?   <div className={ classes.Center }>
                                    <LoadingSpinner />
                                </div>
                            :   <>
                                    <h5>Dashboard</h5>
                                    <hr></hr>
                                    <div style={{ padding: '10px 20px' }}>
                                        <Row>
                                            <Card title="Token Price" color="#06C167" cash_amount="" amount={ `₹ ${ convertToINR(token_price) }` } link="token-price"/>
                                            <Card title="Total Token Purchased" color="#CC20F6" cash_amount={ `₹ ${ convertToINR(purchase && purchase.amount) }` } amount={ purchase && purchase.total_tokens } link="purchase-history"/>
                                        </Row>
            
                                        <Row>
                                            <Card title="Total Token sold" color="#E3CF1A" cash_amount={ `₹ ${ convertToINR(sold && sold.amount) }` } amount={ sold && sold.total_tokens } link="selling-history" />
                                            <Card title="Withdraw Requests" color="#F94A4A" cash_amount={ `₹ ${ convertToINR(withdrawRequest && withdrawRequest.amount) }` } amount={ withdrawRequest && withdrawRequest.requests } link="withdraw-request" />
                                        </Row>
            
                                        <Row>
                                            <Card title="Total Hotels + Rooms" color="#5B2600" cash_amount={ `Rooms: ${ hotels && hotels.rooms }` } amount={ `Brands: ${hotels && hotels.brands}` } link="hotels"/>
                                            <Card title="User List" color="#3B5AC9" cash_amount="" amount={ users } link="users"/>
                                        </Row>
                                    </div>
                                </>
                        }
                    </Col>  
                </Row>
            </Container>
        )
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onAuthEnd: () => dispatch(actions.authEnd()),
    }
}

export default connect(null, mapDispatchtoProps)(Dashboard)
