import React, { useState } from 'react'
import { Table } from 'react-bootstrap'

import NavigationBar from '../../components/Navigation/NavigationBar'
import Box from '../../components/UserDetails/Box/Box'
import UserDetail from '../../components/UserDetails/UserDetail/UserDetail'
import classes from './UserDetails.module.css'
import columns from '../../resources/TableColumns'
import TabPanel from '../../components/UserDetails/TabPanel/TabPanel'
import Heading from '../../components/UserDetails/Heading'
import RadioGroup from '../../components/UserDetails/RadioGroup/RadioGroup'
import { useEffect } from 'react'
import { useHttpClient } from '../../resources/http-hook'

const UserDetails = (props) => {
    const withdrawData = null
    const purchaseData = null 
    const sellingData = null   
    const dividendData = null

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
            { field: 'Join Date', value: data[0].createdAt },
        ]
        financialDetails  = [
            { field: 'UPI', value: data[0].UPI },
            { field: 'Bank Account Number', value: data[0].bankAccountNo },
            { field: 'IFSC Code', value: data[0].IFSC },
        ]
    }

    const [ selectedTable, setSelectedTable ] = useState('withdraw')

    const [ dataSourceWithdraw, setDataSourceWithdraw ] = useState(withdrawData);
    const [ dataSourcePurchase, setDataSourcePurchase ] = useState(purchaseData);
    const [ dataSourceSelling, setDataSourceSelling ] = useState(sellingData);
    const [ dataSourceDividend, setDataSourceDividend ] = useState(dividendData);
    
    const onSearchWithdraw = e => {
        setDataSourceWithdraw(withdrawData.filter( entry =>  entry.amount.includes(e.target.value) ))
    }
    const onSearchPurchase = e => {
        setDataSourcePurchase(purchaseData.filter( entry =>  entry.purchase_id.includes(e.target.value) ))
    }
    const onSearchSelling = e => {
        setDataSourceSelling(sellingData.filter( entry =>  entry.selling_id.includes(e.target.value) ))
    }
    const onSearchDividend = e => {
        setDataSourceDividend(dividendData.filter( entry =>  entry.date.includes(e.target.value) ))
    }

    return (
        <div>
            <NavigationBar />
            <div className={ classes.BoxContainer }>
                <Box title="Account Balance" amount="5,00,000" />
                <Box title="Total Withdraw" amount="30,000" />
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
                        <img src="" alt="" />                
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

            <div className={ classes.TableContainer }>
                <hr></hr>
                <div className={ classes.TabContainer }>
                    <RadioGroup selectedTable={ selectedTable } setSelectedTable={ setSelectedTable } /> 
                </div>
                <hr></hr>

                <div className={ classes.Table }>
                    { 
                        selectedTable === 'withdraw' 
                            ?   <TabPanel title="Withdrawal" columns={ columns.USER_WITHDRAWAL_HISTORY } data={ dataSourceWithdraw } placeholder="Search by amount" onSearch={ onSearchWithdraw } /> 
                            :   null
                    }  
                    { 
                        selectedTable === 'purchase' 
                            ?  <TabPanel title="Purchase"  columns={ columns.USER_PURCHASE_HISTORY } data={ dataSourcePurchase } placeholder="Search By ID" onSearch={ onSearchPurchase } /> 
                            :   null 
                    }  
                    { 
                        selectedTable === 'selling' 
                            ?  <TabPanel title="Selling"  columns={ columns.USER_SELLING_HISTORY } data={ dataSourceSelling } placeholder="Search by ID" onSearch={ onSearchSelling }  /> 
                            :   null 
                    }  
                    { 
                        selectedTable === 'dividend' 
                            ?  <TabPanel title="Dividend" columns={ columns.USER_DIVIDEND_HISTORY } data={ dataSourceDividend } placeholder="Search by Date" onSearch={ onSearchDividend } /> 
                            :   null 
                    }  
                </div>
            </div>
        </div> 
    )
}

export default UserDetails
