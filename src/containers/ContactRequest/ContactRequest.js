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

const ContactRequest = () => {
    // eslint-disable-next-line
    const [ requests, setRequests ] = useState(5)
    const [ requestData, setRequestData ] = useState([])
    const [ dataSource, setDataSource ] = useState([]);
    const { isLoading, sendRequest } = useHttpClient()

    useEffect(() => {
        const fetchData = () => {
            sendRequest('/contactRequest')
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
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
              name: record.name,
        }),
    };

    const onSearch = e => {
        setDataSource(requestData.filter( entry =>  entry.name.includes(e.target.value) ))
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
                            <Space size="middle">Contact Us requests: <Button type="primary" danger size="large">Solved</Button></Space>
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
