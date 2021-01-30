import React, { useState } from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'
import { Input, Space } from 'antd'

import classes from './WithdrawHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import Search from '../../components/Shared/Search/Search'

const WithdrawHistory = () => {
    const totalWithdrawalRequest = 50
    const totalValue = 20

    const data = [
        { date: '1', request_no: '1', name: 'Manan', no_token: '12', upi: '123', account_no: '1242', ifsc: '40981', amount: '41213' },
        { date: '2', request_no: '2', name: 'ABCD', no_token: '43', upi: '145', account_no: '4121', ifsc: '40981', amount: '41213' },
        { date: '3', request_no: '3', name: 'diqjod', no_token: '54', upi: '156', account_no: '4421', ifsc: '40981', amount: '41213' },
        { date: '4', request_no: '4', name: 'doqijo', no_token: '31', upi: '166', account_no: '4553', ifsc: '40981', amount: '41213' }
    ]
    
    const [dataSource, setDataSource] = useState(data);

    const onSearch = e => {
        setDataSource(data.filter( entry =>  entry.name.includes(e.target.value) ))
    }

    return (
        <>
            <NavigationBar />
            <div className={ classes.InfoContainer }>
                <p><Space size="middle"> <u>Total Withdrawal Requests: </u> { totalWithdrawalRequest }</Space></p>
            </div>
            <div className={ classes.InfoContainer1 }>
                <p>
                    <Space size="middle"> 
                        <u>Total Withdrawal value: </u> 
                        <Input size="medium" value={ totalValue } disabled style={{ width: '100px'}}/>
                    </Space>
                </p>
            </div>
            <div className={ classes.TableContainer }>
                <div className={classes.Header}>
                    <h6>Withdrawal History</h6>
                    <Search placeholder="Search By Name" onSearch={ onSearch } className={ classes.Search }/>
                </div>
                <CustomTable columns={ columns.WITHDRAWAL_HISTORY } data={ dataSource } />
            </div>
        </>
    ) 
}

export default WithdrawHistory
