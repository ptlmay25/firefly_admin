import React, { useState } from 'react'
import { Space, Button, Table } from 'antd'

// import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import NavigationBar from '../../components/Navigation/NavigationBar'
import classes from './WithdrawRequest.module.css'
import { itemRender } from '../../resources/Utilities'
import Search from '../../components/Shared/Search/Search'

const WithdrawRequest = () => {
    const account_noRequests = 5
    const account_noValue = 25000

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
              name: record.name,
        }),
    };


    const data = [
        { key: 1 , date: '1', user_id: '1', upi: '123', account_no: '1242', ifsc: '40981', amount: '41213' },
        { key: 2, date: '2', user_id: '2', upi: '145', account_no: '4121', ifsc: '40981', amount: '41213' },
        { key: 3, date: '3', user_id: '3', upi: '156', account_no: '4421', ifsc: '40981', amount: '41213' },
        { key: 4, date: '4', user_id: '4', upi: '166', account_no: '4553', ifsc: '40981', amount: '41213' }
    ]

    const [dataSource, setDataSource] = useState(data);

    const onSearch = e => {
        setDataSource(data.filter( entry =>  entry.user_id.includes(e.target.value) ))
    }

    return (
        <>
            <NavigationBar />
            <div className={ classes.InfoContainer }>
                <Space size="middle">User List: <Button type="primary" danger size="large">Withdraw</Button></Space>
                <Search placeholder="Search By User ID" onSearch={ onSearch } className={ classes.Search }/>
            </div>
            <div className={ classes.InfoContainer1 }>
                <p><Space size="middle"><u>Total Requests: </u> { account_noRequests } </Space></p>
                <p><Space size="middle"><u>Withdraw Order Value: </u> { account_noValue } </Space></p>
            </div>
            <div className={ classes.TableContainer }>
                <Table 
                    columns={ columns.WITHDRAWAL_REQUEST }
                    dataSource={ dataSource }
                    pagination={{ defaultPageSize: 5, itemRender: itemRender , showSizeChanger: true, pageSizeOptions: [5,10,20] }} 
                    bordered
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    rowClassName={ classes.Row } />
            </div>
        </>
    )
}

export default WithdrawRequest
