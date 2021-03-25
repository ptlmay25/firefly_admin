import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import NavigationBar from '../../components/Navigation/NavigationBar'
import Box from '../../components/UserDetails/Box/Box'
import UserDetail from '../../components/UserDetails/UserDetail/UserDetail'
import classes from './UserDetails.module.css'
import TableContainer from './TableContainer/TableContainer'
import Heading from '../../components/UserDetails/Heading'
import Avatar from '../../assets/avatar.png'
import { convertToINR, convertToPhoneNumber, showErrorModal } from '../../resources/Utilities'

import axios from 'axios'
import { apiContext } from '../../resources/api-context'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'
import Back from '../../components/Shared/Back/Back'


const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/salersclub.appspot.com/o/user%2Fdefault.png?alt=media&token=8b84a88d-52b6-4738-bd23-856cb5e42f56'

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

            const userPurchaseDataCopy = userPurchaseData.map((element) => {
                const transformedData = {
                    date: new Date(element.date).toLocaleDateString('en-IN'),
                    purchaseId: element._id,
                    num_of_tokens: element.num_of_tokens,
                    amount: element.token_price * element.num_of_tokens,
                    status: element.status,
                    token_price: element.token_price,
                    total_amount: element.total_amount
                }

                return {
                    ...transformedData,
                    key: element._id,
                    searchString: Object.values(transformedData).join(''),
                    token_price: `₹ ${ convertToINR(element.token_price) }`,
                    total_amount: `₹ ${ convertToINR(element.token_price * element.num_of_tokens) }`,
                }
            })

            const userSellingDataCopy = userSellingData.map((element) => {  
                const transformedData = {
                    date: new Date(element.date).toLocaleDateString('en-IN'),
                    sellingId: element._id,
                    num_of_tokens: element.num_of_tokens,
                    amount: element.token_price * element.num_of_tokens,
                    status: element.status,
                    token_price: element.token_price,
                    total_amount: element.total_amount
                }

                return {
                    ...transformedData,
                    key: element._id,
                    searchString: Object.values(transformedData).join(''),
                    token_price: `₹ ${ convertToINR(element.token_price) }`,
                    total_amount: `₹ ${ convertToINR(element.token_price * element.num_of_tokens) }`,
                }
            })

            const userWithdrawDataCopy = userWithdrawData.map((element) => {
                const transformedData = {
                    date: new Date(element.createdAt).toLocaleDateString('en-IN'),
                    bankAccountNo: element.bankAccountNo,
                    IFSC: element.IFSC,
                    UPI: element.UPI,
                    status: element.Status === true ? 'Fulfilled': 'Pending',
                    amount: element.total_amount,
                    total_amount: element.total_amount
                }
                return {
                    ...transformedData,
                    key: element._id,
                    searchString: Object.values(transformedData).join(''),
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
            if(totalTokenPurchased !== 0)
                userAccountDetailsCopy.profit = (token_price - (totalPurchaseAmount/totalTokenPurchased)) * totalTokenSold
            else
                userAccountDetailsCopy.profit = 0

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
            const name = data.username.split(' ')
            personalDetails = [
                { field: 'User ID', value: data._id },
                { field: 'First Name', value: name[0] },
                { field: 'Last Name', value: name[1] },
                { field: 'Gender', value: data.gender },
                { field: 'Date of Birth', value: data.DOB },
                { field: 'Phone Number', value: convertToPhoneNumber(data.mobileNo) },
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
                        ?   <LoadingSpinner />
                        :   <>
                                <Back link="/admin2050/users" text="Back" padding="50px" />
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
                                            <img src={ data.userImg && data.userImg !== defaultImage ? data.userImg : Avatar } alt="" width="175px" height="175px" />                
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