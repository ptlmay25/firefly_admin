import React from 'react'
import { Input, Space } from 'antd'
import { Table } from 'react-bootstrap'

import NavigationBar from '../../components/Navigation/NavigationBar'
import classes from './UserList.module.css'
import TableHeader from '../../components/Shared/TableHeader'

const { Search } = Input

const UserList = (props) => {
    const users = 20000
    const headers = ['User ID', 'Join Date', 'Full Name', 'Phone Number', 'Gender', 'Total Token Purchased', 'Avg cost per token', 'Account Balance']
 
    return (
        <div>
            <NavigationBar />
            <div className={ classes.InfoContainer }>
                <p><Space size="middle"> <u>Total Users: </u> { users }</Space></p>
                <Search placeholder="Search User" enterButton="Search" className={ classes.Search } />
            </div>

            <div className={ classes.TableContainer }>
                <Table responsive="sm" bordered hover>
                    <TableHeader headers={ headers } />
                    <tbody style={{ textAlign: 'center', cursor: 'pointer' }}>
                        <tr onClick= {() => props.history.push('./users/1001') }>
                            <td>1001</td>
                            <td>12</td>
                            <td>dqybdiub</td>
                            <td>duqhd</td>
                            <td>1831</td>
                            <td>3124</td>
                            <td>43343</td>
                            <td>241</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default UserList
