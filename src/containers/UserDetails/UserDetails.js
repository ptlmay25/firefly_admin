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
        userData: null,
        userAccountDetails: {
            accountBalance: 0,
            withdrawAmount: 0,
            profit: 0,
            tokens: 0
        },
        userPurchaseData: null,
        userSellingData: null,
        userWithdrawData: null,
        isLoading: true
    }

    componentDidMount = async () => {
        const userId = this.props.location.state
        try {
            const userData = await (await axios.get(apiContext.baseURL + `/user/view/${userId}`)).data.data[0]
            const userPurchaseData = await (await axios.get(apiContext.baseURL + `/purchase/view/user/${userId}`)).data.data
            const userSellingData = await (await axios.get(apiContext.baseURL + `/sell/view/user/${userId}`)).data.data
            const userWithdrawData = await (await axios.get(apiContext.baseURL + `/withdrawRequest/view/user/${userId}`)).data.data

            console.log(userWithdrawData)

            const userPurchaseDataCopy = userPurchaseData.map((element) => {
                return {
                    date: new Date(element.date).toLocaleDateString('en-IN'),
                    purchaseId: element._id,
                    num_of_tokens: element.num_of_tokens,
                    token_price: `₹ ${ convertToINR(element.token_price) }`,
                    total_amount: `₹ ${ convertToINR(element.token_price * element.num_of_tokens) }`,
                    status: element.status
                }
            })

            const userSellingDataCopy = userSellingData.map((element) => {
                return {
                    date: new Date(element.date).toLocaleDateString('en-IN'),
                    sellingId: element._id,
                    num_of_tokens: element.num_of_tokens,
                    token_price: `₹ ${ convertToINR(element.token_price) }`,
                    total_amount: `₹ ${ convertToINR(element.token_price * element.num_of_tokens) }`,
                    status: element.status
                }
            })

            const userWithdrawDataCopy = userWithdrawData.map((element) => {
                return {
                    ...element,
                    date: new Date(element.createdAt).toLocaleDateString('en-IN'),
                    total_amount: `₹ ${ convertToINR(element.total_amount) }`,
                }
            }) 

            const userAccountDetailsCopy = this.state.userAccountDetails

            userWithdrawData.forEach(element => {
                userAccountDetailsCopy.withdrawAmount += element.total_amount
            })

            let totalTokenPurchased = 0
            let totalPurchaseAmount = 0
            userPurchaseData.forEach(element => {
                totalTokenPurchased += element.num_of_tokens
                totalPurchaseAmount += element.token_price * element.num_of_tokens
            })

            let totalTokenSold = 0
            userSellingData.forEach(element => {
                totalTokenSold += element.num_of_tokens
            })

            const token_price = await( await axios.get(apiContext.baseURL + `/token/getLatestTokenPrice`)).data.data.token_price
            userAccountDetailsCopy.profit = (token_price - (totalPurchaseAmount/totalTokenPurchased)) * totalTokenSold
            userAccountDetailsCopy.tokens = totalTokenPurchased - totalTokenSold
            userAccountDetailsCopy.accountBalance = userData.acc_bal ? userData.acc_bal : 0

            this.setState({
                userData, 
                userPurchaseData: userPurchaseDataCopy, 
                userSellingData: userSellingDataCopy, 
                userWithdrawData: userWithdrawDataCopy,
                userAccountDetails: userAccountDetailsCopy, 
                isLoading: false
            })
        }
        catch(error) {
            this.setState({ isLoading: false })
            showErrorModal(error.message)
        }
    }

    render() {
        let personalDetails = []
        let financialDetails = []
        const data = this.state.userData
        const accountData = this.state.userAccountDetails

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
                                    <Box title="FireFly Account Balance" amount={ `₹ ${ convertToINR(accountData.accountBalance) }` } />
                                    <Box title="Total Withdraw" amount={ ` ₹ ${ convertToINR(accountData.withdrawAmount) }` } />
                                    <Box title="Total Number of Tokens" amount={ accountData.tokens } />
                                    <Box title="Total Profit" amount={ `₹ ${ convertToINR(accountData.profit) }` } />
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

                                <TableContainer 
                                    purchaseData = { this.state.userPurchaseData }
                                    sellData = { this.state.userSellingData }
                                    withdrawData = { this.state.userWithdrawData } />
                            </>
                }
            </div>    
        )
    }
}

export default UserDetails