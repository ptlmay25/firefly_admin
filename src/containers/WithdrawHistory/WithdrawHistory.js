import React, { useState, useEffect } from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'
import { Input, Space } from 'antd'

import classes from './WithdrawHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import Search from '../../components/Shared/Search/Search'
import { useHttpClient } from '../../resources/http-hook'
import { showErrorModal } from '../../resources/Utilities'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'


const WithdrawHistory = () => {
    const [ totalValue, setTotalValue ] = useState(0)
    const [ withdrawalData, setWithdrawalData ] = useState([])
    const [ dataSource, setDataSource ] = useState([]);

    const { isLoading, sendRequest } = useHttpClient()

    useEffect(() => {
        let totalWithdrawalAmount = 0
        const fetchData = () => {
            sendRequest('/withdrawHistory')
                .then((response) => {
                    const newData = response.data.map((data) => {
                        totalWithdrawalAmount += data.total_amount 
                        return {
                            ...data,
                            key: data._id,
                            createdAt: new Date(data.createdAt).toLocaleDateString('en-IN')

                        }
                    })
                    setTotalValue(totalWithdrawalAmount)
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
                ?   <div className={ classes.Center }>
                        <LoadingSpinner />
                    </div> 
                : null
            }
            {
                !isLoading && withdrawalData
                ?   <>
                        <div className={ classes.InfoContainer }>
                            <Space size="middle"><p> <u>Total Withdrawal Requests: </u> { withdrawalData.length }</p></Space>
                        </div>
                        <div className={ classes.InfoContainer1 }>
                        <Space size="middle"> 
                            <u>Total Withdrawal value: </u> 
                            <Input size="medium" value={ totalValue } disabled style={{ width: '100px'}}/>
                        </Space>
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
