import React, { useState, useEffect } from 'react'
import { Table } from 'antd'

import NavigationBar from '../../components/Navigation/NavigationBar'
import Search from '../../components/Shared/Search/Search'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'
import classes from './UserList.module.css'
import columns from '../../resources/TableColumns'
import { convertToINR, itemRender } from '../../resources/Utilities'
import { useHttpClient } from '../../resources/http-hook'
import { showErrorModal } from '../../resources/Utilities'

const UserList = (props) => {
    const [ users, setUsers] = useState([])
    const [ dataSource, setDataSource ] = useState([])
    const { isLoading, sendRequest } = useHttpClient()

    useEffect(() => {
        const fetchUsers = () => {
            sendRequest('/user')
                .then((response) => {
                    const newUsers = response.data.map((data) => {

                        const transformedData = {
                            _id: data._id, 
                            name: data.username,
                            mobileNo: data.mobileNo,
                            gender: data.gender,
                            tokens: data.tokens,
                            total_dividend: data.total_dividend,
                            acc_bal: data.acc_bal,
                            createdAt: new Date(data.createdAt).toLocaleDateString('en-IN')
                        }

                        return {
                            ...transformedData,
                            key: data._id,
                            searchString: Object.values(transformedData).join(''),
                            acc_bal: `₹ ${ convertToINR(data.acc_bal) }`,
                        }
                    })
                    setUsers(newUsers)
                    setDataSource(newUsers)
                })
                .catch((error) => showErrorModal(error.message))
        }
        fetchUsers()
    }, [sendRequest])

    const onRowClick = row => {
        return {
            onClick: () => props.history.push(`/admin2050/users/${row._id}`, row._id),
        }
    }
    const onSearch = e => {
        setDataSource(users.filter( entry =>  entry.searchString.includes(e.target.value) ))
    }
    
    return (
        <div>
            <NavigationBar />
            { 
                isLoading 
                ? <LoadingSpinner />
                : null
            }
            { 
                !isLoading && users 
                    ?   <>
                            <div className={ classes.InfoContainer }>
                                <h6> Total Users :- &nbsp; <span style={{ fontSize: '20px' }}>{ users.length }</span> </h6>
                                <Search placeholder="Search User" onSearch={ onSearch }/>
                            </div>
                            <div className={ classes.TableContainer }>
                                <Table 
                                    columns={ columns.USER_LIST }
                                    dataSource={ dataSource }
                                    pagination={{ defaultPageSize: 5, itemRender: itemRender, showSizeChanger: true, pageSizeOptions: [5,10,20] }} 
                                    bordered
                                    onRow={ onRowClick }
                                    rowClassName={ classes.Row } />
                            </div>
                        </>   
                    : null
                }
        </div>
    )
}

export default UserList
