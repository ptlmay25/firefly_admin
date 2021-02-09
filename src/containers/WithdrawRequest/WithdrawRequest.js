import React, { useState, useEffect } from 'react'
import { Space, Button, Table } from 'antd'

import columns from '../../resources/TableColumns'
import NavigationBar from '../../components/Navigation/NavigationBar'
import classes from './WithdrawRequest.module.css'
import { itemRender } from '../../resources/Utilities'
import Search from '../../components/Shared/Search/Search'
import { useHttpClient } from '../../resources/http-hook'
import { showErrorModal } from '../../resources/Utilities'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'
import axios from 'axios'
import { apiContext } from '../../resources/api-context'


// const requestData = [
//     { key: 10, _id: 1, createdAt: '1/1/21', userId: 'ahaif', UPI: 'djhkwd', BankAccountNumber: '390148901890', IFSC: '83749179', total_amount: '1234414' },
//     { key: 22, _id: 2, createdAt: '1/2/21', userId: 'dadwfw', UPI: 'dfkwojfow', BankAccountNumber: '490181519058', IFSC: '389490814', total_amount: '1244' },
//     { key: 32, _id: 3, createdAt: '1/4/21', userId: 'fweofjw', UPI: 'fwokfpow', BankAccountNumber: '4928904890242', IFSC: '32023911', total_amount: '414314' },
//     { key: 43, _id: 4, createdAt: '1/4/21', userId: 'fwfwefui', UPI: 'wfwfwioo', BankAccountNumber: '4824908239420', IFSC: '31414121', total_amount: '435435' }
// ]

const WithdrawRequest = () => {
    const [ value, setValue ] = useState(0)
    const [ requestData, setRequestData ] = useState([])
    const [ dataSource, setDataSource ] = useState(requestData)
    const [ selectedRows, setSelectedRows ] = useState()
    const { isLoading, sendRequest } = useHttpClient()    

    useEffect(() => {
        const fetchData = () => {
            sendRequest('/withdrawRequest')
                .then((response) => {
                    let withrawRequestValue = 0
                    const newData = response.data.map((data) => {
                        withrawRequestValue += data.total_amount
                        return {
                            ...data,
                            key: data._id,
                            createdAt: new Date(data.createdAt).toLocaleDateString('en-IN')
                        }
                    })
                    setValue(withrawRequestValue)
                    setRequestData(newData)
                    setDataSource(newData)
                })
                .catch((error) => showErrorModal(error.message))
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
        setDataSource(requestData.filter( entry =>  entry.userId.includes(e.target.value) ))
    } 

    const onWithdrawHandler = () => {
        if(selectedRows.length === 0) {
            alert("Select entries to withdraw first")
        } else {
            selectedRows.forEach(element => {
               const elementCopy = { ...element }
               elementCopy.request_number = element.key
               
               axios.post(apiContext.baseURL + `/withdrawRequest/delete/${elementCopy.request_number}`)
                    .then((response) => {
                        if(response.status === 'success') {
                            axios.post(apiContext.baseURL + '/withdrawHistory/add', elementCopy)
                            .then(() => {

                            })
                            .catch((error) => {
                                showErrorModal(error.message)
                            })
                        }
                    })
                    .catch((error) => {
                        showErrorModal(error.message)
                    })
            });
        }
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
                !isLoading && requestData
                ?   <>
                        <div className={ classes.InfoContainer }>
                            <Space size="middle">User List: <Button type="primary" danger size="large" onClick={() => onWithdrawHandler() }>Withdraw</Button></Space>
                            <Search placeholder="Search By User ID" onSearch={ onSearch } className={ classes.Search }/>
                        </div>
                        <div className={ classes.InfoContainer1 }>
                            <p><u>Total Requests: </u><span style={{ marginLeft: '20px'}}> { requestData.length } </span></p>
                            <p><u>Withdraw Order Value: </u><span style={{ marginLeft: '20px'}}> { value } </span></p>
                        </div>
                        <div className={ classes.TableContainer }>
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
