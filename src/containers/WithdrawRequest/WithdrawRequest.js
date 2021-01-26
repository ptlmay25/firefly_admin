import React from 'react'
import { Input, Space, Button } from 'antd'

import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import NavigationBar from '../../components/Navigation/NavigationBar'
import classes from './WithdrawRequest.module.css'

const WithdrawRequest = () => {
    const { Search } = Input
    const account_noRequests = 5
    const account_noValue = 25000

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };

    const data = [
        { date: '1', request_no: '1', name: 'Manan', no_token: '12', upi: '123', account_no: '1242', ifsc: '40981', amount: '41213' },
        { date: '2', request_no: '2', name: 'ABCD', no_token: '43', upi: '145', account_no: '4121', ifsc: '40981', amount: '41213' },
        { date: '3', request_no: '3', name: 'diqjod', no_token: '54', upi: '156', account_no: '4421', ifsc: '40981', amount: '41213' },
        { date: '4', request_no: '4', name: 'doqijo', no_token: '31', upi: '166', account_no: '4553', ifsc: '40981', amount: '41213' }
    ]

    return (
        <>
            <NavigationBar />
            <div className={ classes.InfoContainer }>
                <Space size="middle">User List: <Button type="primary" danger size="large">Withdraw</Button></Space>
                <Search placeholder="Search" enterButton="Search" className={ classes.Search } />
            </div>
            <div className={ classes.InfoContainer1 }>
                <p><Space size="middle"><u>account_no Requests: </u> { account_noRequests } </Space></p>
                <p><Space size="middle"><u>Withdraw Order Value: </u> { account_noValue } </Space></p>
            </div>
            <div className={ classes.TableContainer }>
                <CustomTable columns={ columns.WITHDRAWAL_HISTORY } data={ data } rowSelection={rowSelection} />
            </div>
        </>
    )
}

export default WithdrawRequest
