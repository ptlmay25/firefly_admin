import React, { useState } from 'react'
import { Table } from 'react-bootstrap'

import NavigationBar from '../../components/Navigation/NavigationBar'
import Box from '../../components/UserDetails/Box/Box'
import UserDetail from '../../components/UserDetails/UserDetail/UserDetail'
import classes from './UserDetails.module.css'
import TableContainer from './TableContainer/TableContainer'
import Heading from '../../components/UserDetails/Heading'
import { useEffect } from 'react'
import { useHttpClient } from '../../resources/http-hook'
import Avatar from '../../assets/avatar.png'

const UserDetails = (props) => {
    const [ data, setData ] = useState(null)
    const { sendRequest } = useHttpClient()

    useEffect(() => {
        const id = props.location.state    
        const fetchUserData = () => {
            sendRequest(`/user/view/${id}`).then((response) => {
                setData(response.data)
            })
        }
        fetchUserData()    
    }, [sendRequest, props])

    let personalDetails = []
    let financialDetails = []
    if(data) {
        personalDetails = [
            { field: 'User ID', value: data[0]._id },
            { field: 'First Name', value: data[0].firstName },
            { field: 'Last Name', value: data[0].lastName },
            { field: 'Gender', value: data[0].gender },
            { field: 'Date of Birth', value: data[0].DOB },
            { field: 'Phone Number', value: data[0].mobileNo },
            { field: 'Aadhar/Pan Card Number', value: data[0].aadharCardNo },
            { field: 'Email Address', value: data[0].emailAddress },
            { field: 'Home Address', value: data[0].homeAddress },
            { field: 'City', value: data[0].city },
            { field: 'State', value: data[0].state },
            { field: 'Zip Code', value: data[0].zipcode  },
            { field: 'Country', value: data[0].country },
            { field: 'Join Date', value: new Date(data[0].createdAt).toLocaleDateString('EN-IN') },
        ]
        financialDetails  = [
            { field: 'UPI', value: data[0].UPI },
            { field: 'Bank Account Number', value: data[0].bankAccountNo },
            { field: 'IFSC Code', value: data[0].IFSC },
        ]
    }

    return (
        <div>
            <NavigationBar />
            <div className={ classes.BoxContainer }>
                <Box title="Account Balance" amount={ data ? data.balance : 0 } />
                <Box title="Total Withdraw" amount={ data ? data.total_withdraw : 0 } />
                <Box title="Total Tokens" amount={ data ? data.total_tokens : 0 } />
            </div>

            <div className={ classes.DetailsContainer }>
                <Heading title="Personal" />
                <div className={ classes.InfoContainer }>
                    <div className={ classes.Info }>
                        <Table borderless>
                            <tbody>
                                {
                                    data ? 
                                    personalDetails.map((detail) => (
                                        <UserDetail key={ detail.field } field={ detail.field } value={ detail.value } />
                                    )) : null
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div className={ classes.Photo }>
                        <img src={ data.image ? data.image : Avatar } alt="" width="175px" height="175px" />                
                    </div>
                </div>
            </div>

            <div className={ classes.DetailsContainer }>
                <Heading title="Financial "/>
                <div className={ classes.Info }>
                    <Table borderless>
                        <tbody>
                            {
                                financialDetails.map((detail) => (
                                    <UserDetail key={ detail.field } field={ detail.field } value={ detail.value } />
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>

            <TableContainer />
        </div> 
    )
}

export default UserDetails
