import React, { useState, useEffect } from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'
import { useHttpClient } from '../../resources/http-hook'

import classes from './PurchaseHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import Search from '../../components/Shared/Search/Search'
import { convertToINR, showErrorModal } from '../../resources/Utilities'
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
                        totalTokenValue += data.num_of_tokens * data.token_price
                        return {
                            key: data._id,
                            pur_id: data._id,
                            user_acc_num: data.user_id,
                            status: data.status,
                            token_price: `₹ ${convertToINR(data.token_price) }`,
                            num_of_tokens: data.num_of_tokens,
                            total_price: `₹ ${ convertToINR(data.num_of_tokens * data.token_price) }`,
                            date: new Date(data.date).toLocaleDateString('en-IN'),
                        }
                    })
                    setTokenCount(tempTokenCount)
                    setTokenValue(`₹ ${ convertToINR(totalTokenValue) }`)
                    setPurchaseData(newData)
                    setDataSource(newData)
                })
                .catch((error) => showErrorModal(error.message))
        }
        fetchData()
    }, [sendRequest])


    const onSearch = e => {
        setDataSource(purchaseData.filter( entry =>  entry.pur_id.includes(e.target.value) ))
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
                            <h6> Total Number of Tokens Purchased :- &nbsp; <span style={{ fontSize: '20px' }}>{ tokenCount }</span> </h6>
                            <h6> Total Token Value :- &nbsp; <span style={{ fontSize: '20px' }}>{ tokenValue }</span> </h6>
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
