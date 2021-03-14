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
                    const newUsers = response.data.map((user) => {
                        return {
                            ...user,
                            key: user._id,
                            name: user.firstName ? `${user.firstName} ${user.lastName}` : '',
                            acc_bal: `₹ ${ convertToINR(user.acc_bal) }`,
                            createdAt: new Date(user.createdAt).toLocaleDateString('en-IN')
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
        setDataSource(users.filter( entry =>  entry.name.includes(e.target.value) ))
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
                                <Search placeholder="Search by Name" onSearch={ onSearch }/>
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
