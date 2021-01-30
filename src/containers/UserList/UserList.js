import React, { useState, useEffect } from 'react'
import { Space, Table } from 'antd'


import NavigationBar from '../../components/Navigation/NavigationBar'
import Search from '../../components/Shared/Search/Search'
import ErrorModal from '../../components/Shared/ErrorModal/ErrorModal'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'
import classes from './UserList.module.css'
import columns from '../../resources/TableColumns'
import { itemRender } from '../../resources/Utilities'
import { useHttpClient } from '../../resources/http-hook'

const UserList = (props) => {
    const [ users, setUsers] = useState([])
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    useEffect(() => {
        const fetchUsers = () => {
            sendRequest('/user')
                .then((response) => {
                    setUsers(response.data)
                })
                .catch((error) => console.log(error))
        }
        fetchUsers()
    }, [sendRequest])

    const onRowClick = row => {
        return {
            onClick: () => props.history.push(`/users/${row._id}`, row._id),
        }
    }
    // eslint-disable-next-line
    const [dataSource, setDataSource] = useState(users);
    const onSearch = e => {
        setDataSource(users.filter( entry =>  entry.name.includes(e.target.value) ))
    }

    return (
        <div>
            <NavigationBar />
            <div className={ classes.InfoContainer }>
                <p><Space size="middle"> <u>Total Users: </u> { users.length }</Space></p>
                <Search placeholder="Search by Name" onSearch={ onSearch }/>
            </div>

            <ErrorModal error={error} onClear={clearError}/>
            { isLoading ? 
                <div className={ classes.Center }>
                    <LoadingSpinner />
                </div> : null
            }
            { !isLoading && users ? 

            <div className={ classes.TableContainer }>
                <Table 
                    columns={ columns.USER_LIST }
                    dataSource={ users }
                    pagination={{ defaultPageSize: 5, itemRender: itemRender, showSizeChanger: true, pageSizeOptions: [5,10,20] }} 
                    bordered
                    onRow={ onRowClick }
                    rowClassName={ classes.Row } />
            </div>
            : null }
        </div>
    )
}

export default UserList
