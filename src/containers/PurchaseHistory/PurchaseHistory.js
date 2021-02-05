import React, { useState, useEffect } from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'
import { Input, Space } from 'antd'
import { useHttpClient } from '../../resources/http-hook'

import classes from './PurchaseHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import Search from '../../components/Shared/Search/Search'
import { showErrorModal } from '../../resources/Utilities'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'

const PurchaseHistory = () => {
    const [ tokenCount, setTokenCount ] = useState()
    const [ tokenValue, setTokenValue ]  = useState()
    const [ purchaseData, setPurchaseData ] = useState([])
    const [ dataSource, setDataSource ] = useState([]);
    const { isLoading, sendRequest } = useHttpClient()

    useEffect(() => {
        const fetchData = () => {
            sendRequest('/purchase')
                .then((response) => {
                    let tempTokenCount = 0
                    let totalTokenValue = 0
                    const newData = response.data.map((data) => {
                        tempTokenCount += data.num_of_tokens
                        totalTokenValue += data.total_price
                        return {
                            ...data,
                            key: data._id,
                            createdAt: new Date(data.createdAt).toLocaleDateString('en-IN'),
                            status: response.status
                        }
                    })
                    setTokenCount(tempTokenCount)
                    setTokenValue(totalTokenValue)
                    setPurchaseData(newData)
                    setDataSource(newData)
                })
                .catch((error) => showErrorModal(error.message))
        }
        fetchData()
    }, [sendRequest])


    const onSearch = e => {
        setDataSource(purchaseData.filter( entry =>  entry.purchase_id.includes(e.target.value) ))
    }

    return (
        <>
            <NavigationBar />
            { 
                isLoading 
                ?   <div className={ classes.Center }>
                        <LoadingSpinner/>
                    </div> 
                : null
            }
            {
                !isLoading && purchaseData
                ?   <>  
                        <div className={ classes.InfoContainer }>
                            <Space size="middle"><p> <u>Total Number of Tokens Purchased: </u> { tokenCount }</p></Space>
                        </div>
                        <div className={ classes.InfoContainer1 }>
                            <Space size="middle"> 
                                <u>Total Token value: </u> 
                                <Input size="medium" value={ tokenValue } disabled style={{ width: '100px'}}/>
                            </Space>
                        </div>
                        <div className={ classes.TableContainer }>
                            <div className={classes.Header}>
                                <h6>Token Purchase History</h6>
                                <Search placeholder="Search By Purchase ID" onSearch={ onSearch } className={ classes.Search }/>
                            </div>
                            <CustomTable columns={ columns.PURCHASE_HISTORY } data={ dataSource } />
                        </div>
                    </>     
                :   null
            }
        </>
    )
}

export default PurchaseHistory
