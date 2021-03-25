import React, { Component } from 'react'
import { Button, Table } from 'antd'

import columns from '../../resources/TableColumns'
import NavigationBar from '../../components/Navigation/NavigationBar'
import classes from './WithdrawRequest.module.css'
import { convertToINR, itemRender } from '../../resources/Utilities'
import Search from '../../components/Shared/Search/Search'
import { showErrorModal } from '../../resources/Utilities'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'
import axios from 'axios'
import { apiContext } from '../../resources/api-context'


class WithdrawRequest extends Component {

    state = {
        value: 0,
        requestData: '',
        dataSource: '',
        selectedRows: [],
        isLoading: true
    }

    getUserData = (userId) => {
        return axios.get(apiContext.baseURL + `/user/view/${ userId }`)
            .then((response) => {
                return {
                    name: response.data.data[0].username,
                    balance: response.data.data[0].acc_bal
                }
            })
            .catch((error) => showErrorModal(error.message))
    }

    componentDidMount = async () => {
        try {
            const withdrawData = await axios.get(apiContext.baseURL + '/withdrawRequest')
            this.setState({ isLoading: false })
    
            let withdrawRequestValue = 0
            const filteredData = withdrawData.data.data.filter(data => data.Status === false)

            const newData = await filteredData.map(async (data) => {
                if(data.total_amount) {
                    withdrawRequestValue += data.total_amount
                }

                const userData = await this.getUserData(data.userId)

                const transformedData = {
                    withdraw_id: data._id,
                    userId: data.userId,
                    name: userData.name,
                    total_amount: data.total_amount,
                    BankAccountNumber: data.BankAccountNumber,
                    acc_bal: userData.balance,
                    IFSC: data.IFSC,
                    createdAt: new Date(data.createdAt).toLocaleDateString('en-IN')
                }

                return {
                    ...transformedData,
                    key: data._id,
                    searchString: Object.values(transformedData).join(''),
                    amount: data.total_amount,
                    total_amount: `₹ ${ convertToINR(data.total_amount) }`,
                    acc_bal: `₹ ${ convertToINR(transformedData.acc_bal) }`,
                }
            })

            const newData1 = await Promise.all(newData)

            this.setState({ 
                value: `₹ ${ convertToINR(withdrawRequestValue) }`,
                requestData: newData1,
                dataSource: newData1
            })
        } catch(error) {
            this.setState({ isLoading: false })
            showErrorModal(error.message)
        }
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          this.setState({ selectedRows: selectedRows })
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
              name: record.name,
        }),
    };

    onSearch = e => {
        this.setState({ dataSource: this.state.requestData.filter( entry =>  entry.searchString.includes(e.target.value) ) })
    } 

    onWithdrawHandler = () => {
        this.setState({ isLoading: true })
        if(this.state.selectedRows.length === 0) {
            alert("Select entries to withdraw first")
        } else {
            this.state.selectedRows.forEach(element => {
                axios.put(apiContext.baseURL + `/withdrawRequest/check/${element.withdraw_id}/user/${element.userId}`, { total_amount: element.amount })
                    .then((response) => {
                        window.location.reload()
                    })
                    .catch((error) => {
                        this.setState({ isLoading: false })
                        showErrorModal(error.message)
                    }) 
            })
        }   
    }

    render() {
        return (
            <>
                <NavigationBar />
                { 
                    this.state.isLoading 
                    ? <LoadingSpinner />
                    : null
                }
                {
                    !this.state.isLoading && this.state.requestData
                    ?   <>
                            <div className={ classes.InfoContainer }>
                                <Button type="primary" danger size="large" onClick={() => this.onWithdrawHandler() } style={{ width: '200px' }}>Withdraw</Button>                    
                                <div>
                                    <h6> Total Requests :- &nbsp; <span style={{ fontSize: '20px' }}>{ this.state.requestData.length }</span> </h6>
                                    <h6> Withdraw Order Value :- &nbsp; <span style={{ fontSize: '20px' }}>{ this.state.value }</span> </h6>
                                </div>        
                            </div>

                            <div className={ classes.TableContainer }>
                                <div className={classes.Header}>
                                    <h6>Withdrawal Requests</h6>
                                    <Search placeholder="Search Withdraw Requests" onSearch={ this.onSearch } className={ classes.Search }/>
                                </div>
                                <Table 
                                    columns={ columns.WITHDRAWAL_REQUEST }
                                    dataSource={ this.state.dataSource }
                                    pagination={{ defaultPageSize: 5, itemRender: itemRender , showSizeChanger: true, pageSizeOptions: [5,10,20] }} 
                                    bordered
                                    rowSelection={{
                                        type: 'checkbox',
                                        ...this.rowSelection,
                                    }}
                                    rowClassName={ classes.Row } />
                            </div>
                        </>
                    : null
                }
            </>
        )
    }
}

export default WithdrawRequest


