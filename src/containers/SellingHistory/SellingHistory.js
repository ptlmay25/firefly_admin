import React, { useState, useEffect } from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'
import { Input, Space } from 'antd'

import classes from './SellingHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import Search from '../../components/Shared/Search/Search'
import { useHttpClient } from '../../resources/http-hook'

const data = null 

const SellingHistory = () => {
    //eslint-disable-next-line
    const [ tokenCount, setTokenCount ] = useState(50)
    //eslint-disable-next-line
    const [ tokenValue, setTokenValue ]  = useState(20)
    const [ sellingData, setSellingData ] = useState(data)
    const [ dataSource, setDataSource ] = useState(sellingData);
    //eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    useEffect(() => {
        const fetchData = () => {
            sendRequest('/sell')
                .then((response) => {
                    setSellingData(response.data)
                })
                .catch((error) => console.log(error))
        }
        fetchData()
    }, [sendRequest])

    
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
