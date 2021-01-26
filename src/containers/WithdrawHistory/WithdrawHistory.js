import React from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'
import { Input, Space } from 'antd'

import classes from './WithdrawHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'

const WithdrawHistory = () => {
    const { Search } = Input
    const totalWithdrawalRequest = 50
    const totalValue = 20

    return (
        <>
            <NavigationBar />
            <div className={ classes.InfoContainer }>
                <p><Space size="middle"> <u>Total Withdrawal Requests: </u> { totalWithdrawalRequest }</Space></p>
                <Search placeholder="Search" enterButton="Search" className={ classes.Search } />
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
                <h6>Withdrawal History</h6>
                <CustomTable columns={ columns.WITHDRAWAL_HISTORY } data={ null } />
            </div>
        </>
    ) 
}

export default WithdrawHistory
