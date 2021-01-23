import React from 'react'
import { Table } from 'react-bootstrap'
import NavigationBar from '../../components/Navigation/NavigationBar'
import Box from '../../components/UserDetails/Box/Box'
import UserDetail from '../../components/UserDetails/UserDetail/UserDetail'
import classes from './UserDetails.module.css'

const UserDetails = () => {
    return (
        <div>
            <NavigationBar />
            <div className={ classes.BoxContainer }>
                <Box title="Account Balance" amount="5,00,000" />
                <Box title="Total Withdraw" amount="30,000" />
            </div>

            <div className={ classes.DetailsContainer }>
                <hr></hr>
                <h5 style={{ paddingLeft: '10px'}}>Personal Details</h5>
                <hr></hr>
                <div className={ classes.Info }>
                    <Table borderless>
                        <tbody>
                            <UserDetail field="User ID" value="1001"/>
                            <UserDetail field="First Name" value="Nishidh"/>
                            <UserDetail field="Last Name" value="Patel"/>
                            <UserDetail field="Gender" value="Male"/>
                            <UserDetail field="Date of Birth" value="10/02/2020"/>
                            <UserDetail field="Phone Number" value="8019840981"/>
                            <UserDetail field="Aadhar/Pan Card No" value="12249804"/>
                            <UserDetail field="Email Address" value="abc@gmail.com"/>
                            <UserDetail field="Home Address" value="20 Yemen Road, Yemen"/>
                            <UserDetail field="City" value="Surat"/>
                            <UserDetail field="State" value="Gujarat"/>
                            <UserDetail field="Zip Code" value="395005"/>
                            <UserDetail field="Country" value="India"/> 
                            <UserDetail field="Join Date" value="12/02/2021"/>  
                        </tbody>
                    </Table>
                </div>
            </div>

            <div className={ classes.DetailsContainer }>
                <hr></hr>
                <h5 style={{ paddingLeft: '10px'}}>Financial Details</h5>
                <hr></hr>
                <div className={ classes.Info }>
                    <Table borderless>
                        <tbody>
                            <UserDetail field="UPI" value="abc@okicici"/>
                            <UserDetail field="Bank account No" value="981409814098014"/>
                            <UserDetail field="IFSC Code" value="SBIN3103091"/>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default UserDetails
