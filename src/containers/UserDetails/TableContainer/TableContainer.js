import React, { useState } from 'react'

import TabPanel from '../../../components/UserDetails/TabPanel/TabPanel'
import RadioGroup from '../../../components/UserDetails/RadioGroup/RadioGroup'
import columns from '../../../resources/TableColumns'

import classes from './TableContainer.module.css'

const TableContainer = () => {
    const withdrawData = null
    const purchaseData = null 
    const sellingData = null   
    const dividendData = null

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
    )
}

export default TableContainer
