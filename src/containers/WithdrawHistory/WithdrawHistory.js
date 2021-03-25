import React, { Component } from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'

import classes from './WithdrawHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import Search from '../../components/Shared/Search/Search'
import { convertToINR, showErrorModal } from '../../resources/Utilities'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'
import axios from 'axios'
import { apiContext } from '../../resources/api-context'


class WithdrawHistory extends Component {

    state = {
        totalValue: 0,
        withdrawalData: '',
        dataSource: '',
        isLoading: true
    }

    getUserData = (userId) => {
        return axios.get(apiContext.baseURL + `/user/view/${ userId }`)
            .then((response) => {
                return {
                    name: response.data.data[0].username,
                    UPI: response.data.data[0].UPI,
                }
            })
            .catch((error) => showErrorModal(error.message))
    }

    componentDidMount = async () => {
        let totalWithdrawalAmount = 0
        
        try {
            const requestData = await axios.get(apiContext.baseURL + '/withdrawRequest')
            const filteredData = requestData.data.data.filter(data => data.Status === true)

            this.setState({ isLoading: false })

            const newData = await filteredData.map(async (data) => {
                if(data.total_amount) {
                    totalWithdrawalAmount += data.total_amount 
                }
                
                const userData = await this.getUserData(data.userId)

                const transformedData = {
                    request_number: data._id,
                    total_amount: data.total_amount,
                    BankAccountNumber: data.BankAccountNumber,
                    IFSC: data.IFSC,
                    createdAt: new Date(data.createdAt).toLocaleDateString('en-IN')
                }

                return {
                    ...transformedData,
                    key: data._id,
                    name: userData.name,
                    UPI: userData.UPI,
                    searchString: Object.values(transformedData).join(''),
                    total_amount: `₹ ${ convertToINR(data.total_amount) }`,
                }
            })

            const newData1 = await Promise.all(newData)

            this.setState({
                totalValue: `₹ ${ convertToINR(totalWithdrawalAmount) }`,
                withdrawalData: newData1,
                dataSource: newData1
            })

        } catch(error) {
            this.setState({ isLoading: false })
            showErrorModal(error.message)
        }
    }

    onSearch = e => {
        this.setState({ dataSource: this.state.withdrawalData.filter( entry =>  entry.searchString.includes(e.target.value) )})
    }

    render() {
        return (
            <div>
                <>
                    <NavigationBar />
                    { 
                        this.state.isLoading 
                        ? <LoadingSpinner />
                        : null
                    }
                    {
                        !this.state.isLoading && this.state.withdrawalData
                        ?   <>
                                <div className={ classes.InfoContainer }>
                                    <h6> Total Withdrawal Requests :- &nbsp; <span style={{ fontSize: '20px' }}>{ this.state.withdrawalData.length }</span> </h6>
                                    <h6> Total Withdrawal Value :- &nbsp; <span style={{ fontSize: '20px' }}>{ this.state.totalValue }</span> </h6>
                                </div>

                                <div className={ classes.TableContainer }>
                                    <div className={classes.Header}>
                                        <h6>Withdrawal History</h6>
                                        <Search placeholder="Search Withdraw History" onSearch={ this.onSearch } className={ classes.Search }/>
                                    </div>
                                    <CustomTable columns={ columns.WITHDRAWAL_HISTORY } data={ this.state.dataSource } />
                                </div>
                            </>
                        :   null
                    }
                </>
            </div>
        )
    }
}

export default WithdrawHistory
