import React, { useState, useEffect } from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'
import { Input, Space } from 'antd'
import { useHttpClient } from '../../resources/http-hook'

import classes from './PurchaseHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import Search from '../../components/Shared/Search/Search'
 
const data = [
    { date: '1', purchase_id: '1', account_no: '12', no_token: '12', price: '123', total: '1242', status: 'Successful' },
    { date: '2', purchase_id: '2', account_no: '34', no_token: '43', price: '145', total: '4121', status: 'Successful' },
    { date: '3', purchase_id: '3', account_no: '24', no_token: '54', price: '156', total: '4421', status: 'Successful' },
    { date: '4', purchase_id: '4', account_no: '123', no_token: '31', price: '166', total: '4553', status: 'Successful' }
]

const PurchaseHistory = () => {
    //eslint-disable-next-line
    const [ tokenCount, setTokenCount ] = useState(50)
    //eslint-disable-next-line
    const [ tokenValue, setTokenValue ]  = useState(20)
    const [ purchaseData, setPurchaseData ] = useState(data)
    const [ dataSource, setDataSource ] = useState(purchaseData);
    //eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    useEffect(() => {
        const fetchData = () => {
            sendRequest('/purchase')
                .then((response) => {
                    setPurchaseData(response.data)
                })
                .catch((error) => console.log(error))
        }
        fetchData()
    }, [sendRequest])


    const onSearch = e => {
        setDataSource(data.filter( entry =>  entry.purchase_id.includes(e.target.value) ))
    }

    return (
        <>
            <NavigationBar />
            <div className={ classes.InfoContainer }>
                <p><Space size="middle"> <u>Total Number of Tokens Purchased: </u> { tokenCount }</Space></p>
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
                <div className={classes.Header}>
                    <h6>Token Purchase History</h6>
                    <Search placeholder="Search By Purchase ID" onSearch={ onSearch } className={ classes.Search }/>
                </div>
                <CustomTable columns={ columns.PURCHASE_HISTORY } data={ dataSource } />
            </div>
        </>
    )
}

export default PurchaseHistory
