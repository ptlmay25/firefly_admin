import { Input, Radio } from 'antd'
import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import NavigationBar from '../../components/Navigation/NavigationBar'
import Box from '../../components/UserDetails/Box/Box'
import CustomTable from '../../components/UserDetails/CustomTable/CustomTable'
import UserDetail from '../../components/UserDetails/UserDetail/UserDetail'
import classes from './UserDetails.module.css'

const UserDetails = () => {
    const withdrawHistoryTableHeaders = ['Date','Bank Account Number','UPI','ISFC Code','Total Amount', 'Status']
    const purchaseHistoryTableHeaders = ['Date','Purchase ID','Number of Token','Purchase Price','Total Amount', 'Status']
    const sellingHistoryTableHeaders = ['Date','Sellling ID','Number of Token','Sell Price','Total Amount', 'Status']
    const dividendHistoryTableHeaders = ['Date','Number of Token','Total Value','Dividend Per Token','Total Amount']
    const { Search } = Input
    const [ selectedTable, setSelectedTable ] = useState('withdraw')
    
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
                <div className={ classes.InfoContainer }>
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
                    <div className={ classes.Photo }>
                    
                    </div>
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

            <div className={ classes.TableContainer }>
                <hr></hr>
                <div className={ classes.TabContainer }>
                    <Radio.Group as="div" value= { selectedTable } >
                        <Radio.Button 
                            value="withdraw" 
                            onClick={ () => setSelectedTable('withdraw') } 
                            style={{ marginRight: '15px' }}>
                                Withdraw History
                        </Radio.Button>
                        <Radio.Button 
                            value="purchase" 
                            onClick={ () => setSelectedTable('purchase') }
                            style={{ marginRight: '15px' }}>
                                Purchase History
                        </Radio.Button>
                        <Radio.Button 
                            value="selling" 
                            onClick={ () => setSelectedTable('selling') }
                            style={{ marginRight: '15px' }}>
                                Selling History
                        </Radio.Button>
                        <Radio.Button 
                            value="dividend" 
                            onClick={ () => setSelectedTable('dividend') }
                            style={{ marginRight: '15px' }}>
                                Dividend History
                        </Radio.Button>
                    </Radio.Group>
                </div>
                <hr></hr>
                <div className={ classes.SearchContainer }>
                    <Search placeholder="Search" enterButton="Search" className={ classes.Search } />
                </div>
                <div className={ classes.Table }>
                    { 
                        selectedTable === 'withdraw' 
                            ?   <CustomTable heading="Withdraw History" headers={ withdrawHistoryTableHeaders } /> 
                            :   null
                    }  
                    { 
                        selectedTable === 'purchase' 
                            ?  <CustomTable heading="Purchase History" headers={ purchaseHistoryTableHeaders } /> 
                            :   null 
                    }  
                    { 
                        selectedTable === 'selling' 
                            ?  <CustomTable heading="Selling History" headers={ sellingHistoryTableHeaders } /> 
                            :   null 
                    }  
                    { 
                        selectedTable === 'dividend' 
                            ?  <CustomTable heading="Dividend History" headers={ dividendHistoryTableHeaders } /> 
                            :   null 
                    }  
                </div>
            </div>
        </div> 
    )
}

export default UserDetails
