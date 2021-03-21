import React, { useState, useEffect } from 'react'
import { Button, Table } from 'antd'

import columns from '../../resources/TableColumns'
import NavigationBar from '../../components/Navigation/NavigationBar'
import classes from './WithdrawRequest.module.css'
import { convertToINR, itemRender } from '../../resources/Utilities'
import Search from '../../components/Shared/Search/Search'
import { useHttpClient } from '../../resources/http-hook'
import { showErrorModal } from '../../resources/Utilities'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'
import axios from 'axios'
import { apiContext } from '../../resources/api-context'

const WithdrawRequest = () => {
    const [ value, setValue ] = useState(0)
    const [ requestData, setRequestData ] = useState([])
    const [ dataSource, setDataSource ] = useState(requestData)
    const [ selectedRows, setSelectedRows ] = useState([])
    const { sendRequest } = useHttpClient()  
    const [ isLoading, setIsLoading ] = useState(true) 

    useEffect(() => {
        const fetchData = () => {
            sendRequest('/withdrawRequest')
                .then((response) => {
                    setIsLoading(false)
                    let withdrawRequestValue = 0
                    const filteredData = response.data.filter(data => data.Status === false)
                    const newData = filteredData.map((data) => {
                        if(data.total_amount) {
                            withdrawRequestValue += data.total_amount
                        }

                        const transformedData = {
                            withdraw_id: data._id,
                            userId: data.userId,
                            acc_holder_name: data.acc_holder_name,
                            total_amount: data.total_amount,
                            BankAccountNumber: data.BankAccountNumber,
                            acc_bal: data.acc_bal,
                            IFSC: data.IFSC,
                            createdAt: new Date(data.createdAt).toLocaleDateString('en-IN')
                        }

                        return {
                            ...transformedData,
                            key: data._id,
                            searchString: Object.values(transformedData).join(''),
                            amount: data.total_amount,
                            total_amount: `₹ ${ convertToINR(data.total_amount) }`,
                            acc_bal: `₹ ${ convertToINR(data.acc_bal) }`,
                        }
                    })
                    setValue(`₹ ${ convertToINR(withdrawRequestValue) }`)
                    setRequestData(newData)
                    setDataSource(newData)
                })
                .catch((error) => {
                    setIsLoading(false)
                    showErrorModal(error.message)
                })
        }
        fetchData()
    }, [sendRequest])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectedRows(selectedRows)
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
              name: record.name,
        }),
    };

    const onSearch = e => {
        setDataSource(requestData.filter( entry =>  entry.searchString.includes(e.target.value) ))
    } 

    const onWithdrawHandler = () => {
        setIsLoading(true)
        if(selectedRows.length === 0) {
            alert("Select entries to withdraw first")
        } else {
            selectedRows.forEach(element => {
                axios.put(apiContext.baseURL + `/withdrawRequest/check/${element._id}/user/${element.userId}`, { total_amount: element.amount })
                    .then((response) => {
                        console.log(response)
                    })
                    .catch((error) => {
                        showErrorModal(error.message)
                    }) 
            })
            setIsLoading(false)
            window.location.reload()
        }   
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
                !isLoading && requestData
                ?   <>
                        <div className={ classes.InfoContainer }>
                            <Button type="primary" danger size="large" onClick={() => onWithdrawHandler() } style={{ width: '200px' }}>Withdraw</Button>                    
                            <div>
                                <h6> Total Requests :- &nbsp; <span style={{ fontSize: '20px' }}>{ requestData.length }</span> </h6>
                                <h6> Withdraw Order Value :- &nbsp; <span style={{ fontSize: '20px' }}>{ value }</span> </h6>
                            </div>        
                        </div>

                        <div className={ classes.TableContainer }>
                            <div className={classes.Header}>
                                <h6>Withdrawal Requests</h6>
                                <Search placeholder="Search Withdraw Requests" onSearch={ onSearch } className={ classes.Search }/>
                            </div>
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
                : null
            }
        </>
    )
}

export default WithdrawRequest
