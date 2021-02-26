import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import NavigationBar from '../../components/Navigation/NavigationBar'
import Box from '../../components/UserDetails/Box/Box'
import UserDetail from '../../components/UserDetails/UserDetail/UserDetail'
import classes from './UserDetails.module.css'
import TableContainer from './TableContainer/TableContainer'
import Heading from '../../components/UserDetails/Heading'
import Avatar from '../../assets/avatar.png'
import { convertToINR, showErrorModal } from '../../resources/Utilities'

import axios from 'axios'
import { apiContext } from '../../resources/api-context'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'


class UserDetails extends Component {

    state = {
        data: {},
        isLoading: true
    }

    componentDidMount() {
        const id = this.props.location.state

        axios.get(apiContext.baseURL + `/user/view/${id}`)
            .then((response) => {
                this.setState({ data: response.data.data[0], isLoading: false })
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                showErrorModal(error.message)
            })
    }

    render() {
        let personalDetails = []
        let financialDetails = []
        const data = this.state.data

        if(data) {
            personalDetails = [
                { field: 'User ID', value: data._id },
                { field: 'First Name', value: data.firstName },
                { field: 'Last Name', value: data.lastName },
                { field: 'Gender', value: data.gender },
                { field: 'Date of Birth', value: data.DOB },
                { field: 'Phone Number', value: data.mobileNo },
                { field: 'Aadhar/Pan Card Number', value: data.aadharCardNo },
                { field: 'Email Address', value: data.emailAddress },
                { field: 'Home Address', value: data.homeAddress },
                { field: 'City', value: data.city },
                { field: 'State', value: data.state },
                { field: 'Zip Code', value: data.zipcode  },
                { field: 'Country', value: data.country },
                { field: 'Join Date', value: new Date(data.createdAt).toLocaleDateString('EN-IN') },
            ]
            financialDetails  = [
                { field: 'UPI', value: data.UPI },
                { field: 'Bank Account Number', value: data.bankAccountNo },
                { field: 'IFSC Code', value: data.IFSC },
            ]
        }

        return (
            <div>
                <NavigationBar />
                {
                    this.state.isLoading
                        ?   <div className={ classes.Center }>
                                <LoadingSpinner />
                            </div>
                        :   <>
                                <div className={ classes.BoxContainer }>
                                    <Box title="Account Balance" amount={ data.acc_bal ? `₹ ${ convertToINR(data.acc_bal) }` : '₹ 0.00' } />
                                    <Box title="Total Withdraw" amount={ data.total_withdraw ? ` ₹ ${ convertToINR(data.total_withdraw) }` : '₹ 0.00' } />
                                    <Box title="Total Tokens" amount={ data ? data.tokens : 0 } />
                                </div>

                                <div className={ classes.DetailsContainer }>
                                    <Heading title="Personal" />
                                    <div className={ classes.InfoContainer }>
                                        <div className={ classes.Info }>
                                            <Table borderless>
                                                <tbody>
                                                    {
                                                        data ? 
                                                        personalDetails.map((detail) => (
                                                            <UserDetail key={ detail.field } field={ detail.field } value={ detail.value } />
                                                        )) : null
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                        <div className={ classes.Photo }>
                                            <img src={ Avatar } alt="" width="175px" height="175px" />                
                                        </div>
                                    </div>
                                </div>

                                <div className={ classes.DetailsContainer }>
                                    <Heading title="Financial "/>
                                    <div className={ classes.Info }>
                                        <Table borderless>
                                            <tbody>
                                                {
                                                    financialDetails.map((detail) => (
                                                        <UserDetail key={ detail.field } field={ detail.field } value={ detail.value } />
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>

                                <TableContainer />
                            </>
                }
            </div>    
        )
    }
}

export default UserDetails