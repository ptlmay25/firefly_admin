import React, { useState } from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'
import { Input, Space } from 'antd'

import classes from './SellingHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import Search from '../../components/Shared/Search/Search'

const SellingHistory = () => {
    const tokenCount = 50
    const tokenValue = 20
    const data = null

    const [dataSource, setDataSource] = useState(data);

    const onSearch = e => {
        setDataSource(data.filter( entry =>  entry.selling_id.includes(e.target.value) ))
    }

    return (
        <>
            <NavigationBar />
            <div className={ classes.InfoContainer }>
                <p><Space size="middle"> <u>Total Number of Tokens Sold: </u> { tokenCount }</Space></p>
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
                <div className={classes.Header}>
                    <h6>Token Sell History</h6>
                    <Search placeholder="Search By Selling ID" onSearch={ onSearch } className={ classes.Search }/>
                </div>
                <CustomTable columns={ columns.SELLING_HISTORY } data={ dataSource } />
            </div>
        </>
    )
}

export default SellingHistory
