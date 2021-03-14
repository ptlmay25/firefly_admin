import React, { useState, useEffect } from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'

import classes from './WithdrawHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import Search from '../../components/Shared/Search/Search'
import { useHttpClient } from '../../resources/http-hook'
import { convertToINR, showErrorModal } from '../../resources/Utilities'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'


const WithdrawHistory = () => {
    const [ totalValue, setTotalValue ] = useState(0)
    const [ withdrawalData, setWithdrawalData ] = useState([])
    const [ dataSource, setDataSource ] = useState([]);

    const { isLoading, sendRequest } = useHttpClient()

    useEffect(() => {
        let totalWithdrawalAmount = 0
        const fetchData = () => {
            sendRequest('/withdrawRequest')
                .then((response) => {
                    const filteredData = response.data.filter(data => data.Status === true)
                    const newData = filteredData.map((data) => {
                        if(data.total_amount) {
                            totalWithdrawalAmount += data.total_amount 
                        }
                        return {
                            ...data,
                            key: data._id,
                            request_number: data._id,
                            total_amount: `₹ ${ convertToINR(data.total_amount) }`,
                            createdAt: new Date(data.createdAt).toLocaleDateString('en-IN')
                        }
                    })
                    setTotalValue(`₹ ${ convertToINR(totalWithdrawalAmount) }`)
                    setWithdrawalData(newData)
                    setDataSource(newData)
                })
                .catch((error) => showErrorModal(error.message))
        }
        fetchData()
    }, [sendRequest])

    const onSearch = e => {
        setDataSource(withdrawalData.filter( entry =>  entry.name.includes(e.target.value) ))
    }

    return (
        <>
            <NavigationBar />
            { 
                isLoading 
                ? <LoadingSpinner />
                : null
            }
            {
                !isLoading && withdrawalData
                ?   <>
                        <div className={ classes.InfoContainer }>
                            <h6> Total Withdrawal Requests :- &nbsp; <span style={{ fontSize: '20px' }}>{ withdrawalData.length }</span> </h6>
                            <h6> Total Withdrawal Value :- &nbsp; <span style={{ fontSize: '20px' }}>{ totalValue }</span> </h6>
                        </div>

                        <div className={ classes.TableContainer }>
                            <div className={classes.Header}>
                                <h6>Withdrawal History</h6>
                                <Search placeholder="Search By Name" onSearch={ onSearch } className={ classes.Search }/>
                            </div>
                            <CustomTable columns={ columns.WITHDRAWAL_HISTORY } data={ dataSource } />
                        </div>
                    </>
                :   null
            }
        </>
    ) 
}

export default WithdrawHistory
