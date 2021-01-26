import React from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'
import { Input, Space } from 'antd'

import classes from './PurchaseHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
 
const PurchaseHistory = () => {
    const { Search } = Input
    const tokenCount = 50
    const tokenValue = 20

    const data = [
        { date: '1', purchase_id: '1', account_no: '12', no_token: '12', price: '123', total: '1242', status: 'Successful' },
        { date: '2', purchase_id: '2', account_no: '34', no_token: '43', price: '145', total: '4121', status: 'Successful' },
        { date: '3', purchase_id: '3', account_no: '24', no_token: '54', price: '156', total: '4421', status: 'Successful' },
        { date: '4', purchase_id: '4', account_no: '123', no_token: '31', price: '166', total: '4553', status: 'Successful' }
    ]

    return (
        <>
            <NavigationBar />
            <div className={ classes.InfoContainer }>
                <p><Space size="middle"> <u>Total Number of Tokens Purchased: </u> { tokenCount }</Space></p>
                <Search placeholder="Search" enterButton="Search" className={ classes.Search } />
            </div>
            <div className={ classes.InfoContainer1 }>
                <p>
                    <Space size="middle"> 
                        <u>Total Token value: </u> 
                        <Input size="medium" value={ tokenValue } disabled style={{ width: '100px'}}/>
                    </Space>
                </p>
            </div>
            <div className={ classes.TableContainer }>
                <h6>Token Purchase History</h6>
                <CustomTable columns={ columns.PURCHASE_HISTORY } data={ data } />
            </div>
        </>
    )
}

export default PurchaseHistory
