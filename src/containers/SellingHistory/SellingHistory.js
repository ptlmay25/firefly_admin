import React, { useState, useEffect } from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'
import { Input, Space } from 'antd'

import classes from './SellingHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import Search from '../../components/Shared/Search/Search'
import { useHttpClient } from '../../resources/http-hook'
import { showErrorModal } from '../../resources/Utilities'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'


const SellingHistory = () => {
    const [ tokenCount, setTokenCount ] = useState(0)
    const [ tokenValue, setTokenValue ]  = useState(0)
    const [ sellingData, setSellingData ] = useState([])
    const [ dataSource, setDataSource ] = useState([]);
    const { isLoading, sendRequest } = useHttpClient()

    useEffect(() => {
        const fetchData = () => {
            sendRequest('/sell')
                .then((response) => {
                    let tempTokenCount = 0
                    let totalTokenValue = 0
                    const newData = response.data.map((data) => {
                        tempTokenCount += data.num_of_tokens
                        totalTokenValue += data.total_price
                        return {
                            ...data,
                            key: data._id,
                            createdAt: new Date(data.createdAt).toLocaleDateString('en-IN')
                        }
                    })
                    setTokenCount(tempTokenCount)
                    setTokenValue(totalTokenValue)
                    setSellingData(newData)
                    setDataSource(newData)
                })
                .catch((error) => showErrorModal(error.message))
        }
        fetchData()
    }, [sendRequest])

    
    const onSearch = e => {
        setDataSource(sellingData.filter( entry =>  entry.selling_id.includes(e.target.value) ))
    }

    return (
        <>
            <NavigationBar />
            { 
                isLoading 
                ?   <div className={ classes.Center }>
                        <LoadingSpinner />
                    </div> 
                : null
            }
            {
                !isLoading && sellingData
                ?   <>
                        <div className={ classes.InfoContainer }>
                            <p><Space size="middle"> <u>Total Number of Tokens Sold: </u> { tokenCount }</Space></p>
                        </div>
                        <div className={ classes.InfoContainer1 }>
                            <Space size="middle"> 
                                <u>Total Sell value: </u> 
                                <Input size="medium" value={ tokenValue } disabled style={{ width: '100px'}}/>
                            </Space>
                        </div>
                        <div className={ classes.TableContainer }>
                            <div className={classes.Header}>
                                <h6>Token Sell History</h6>
                                <Search placeholder="Search By Selling ID" onSearch={ onSearch } className={ classes.Search }/>
                            </div>
                            <CustomTable columns={ columns.SELLING_HISTORY } data={ dataSource } />
                        </div>
                    </>
                :   null
            }
        </>
    )
}

export default SellingHistory
