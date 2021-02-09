import React, { useState, useEffect } from 'react'
import { Space, Button, Table } from 'antd'

import columns from '../../resources/TableColumns'
import NavigationBar from '../../components/Navigation/NavigationBar'
import classes from './ContactRequest.module.css'
import { itemRender } from '../../resources/Utilities'
import Search from '../../components/Shared/Search/Search'
import { useHttpClient } from '../../resources/http-hook'
import { showErrorModal } from '../../resources/Utilities'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'
import axios from 'axios'
import { apiContext } from '../../resources/api-context'

const ContactRequest = () => {
    // eslint-disable-next-line
    const [ requests, setRequests ] = useState(5)
    const [ requestData, setRequestData ] = useState([])
    const [ dataSource, setDataSource ] = useState([]);
    const [ selectedRows, setSelectedRows ] = useState()
    const { isLoading, sendRequest } = useHttpClient()

    useEffect(() => {
        const fetchData = () => {
            sendRequest('/contact')
                .then((response) => {
                    const newData = response.data.map((data) => {
                        return {
                            ...data,
                            key: data._id,
                            createdAt: new Date(data.createdAt).toLocaleDateString('en-IN')
                        }
                    })
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
        setDataSource(requestData.filter( entry =>  entry.name.includes(e.target.value) ))
    }

    const onSolvedHandler = () => {
        if(selectedRows.length === 0) {
            alert("Select entries to withdraw first")
        } else {
            selectedRows.forEach(element => {
               const elementCopy = { ...element }
               elementCopy.request_number = element.key
               
               axios.post(apiContext.baseURL + `/contact/delete/${elementCopy.request_number}`)
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
                            <Space size="middle">Contact Us requests: <Button type="primary" danger size="large" onClick={() => onSolvedHandler()}>Solved</Button></Space>
                            <Search placeholder="Search By User ID" onSearch={ onSearch } className={ classes.Search }/>
                        </div>
                        <div className={ classes.InfoContainer1 }>
                            <p><u>Total Requests: </u><span style={{ marginLeft: '20px'}}> { requests } </span></p>
                        </div>
                        <div className={ classes.TableContainer }>
                            <Table 
                                columns={ columns.CONTACT_REQUEST }
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

export default ContactRequest
