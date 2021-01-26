import React from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'
import { Input, Space } from 'antd'

import classes from './SellingHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'

const SellingHistory = () => {
    const { Search } = Input
    const tokenCount = 50
    const tokenValue = 20

    return (
        <>
            <NavigationBar />
            <div className={ classes.InfoContainer }>
                <p><Space size="middle"> <u>Total Number of Tokens Sold: </u> { tokenCount }</Space></p>
                <Search placeholder="Search" enterButton="Search" className={ classes.Search } />
            </div>
            <div className={ classes.InfoContainer1 }>
                <p>
                    <Space size="middle"> 
                        <u>Total Sell value: </u> 
                        <Input size="medium" value={ tokenValue } disabled style={{ width: '100px'}}/>
                    </Space>
                </p>
            </div>
            <div className={ classes.TableContainer }>
                <h6>Token Sell History</h6>
                <CustomTable columns={ columns.SELLING_HISTORY } data={ null} />
            </div>
        </>
    )
}

export default SellingHistory
