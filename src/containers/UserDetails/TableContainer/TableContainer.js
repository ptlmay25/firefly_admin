import React, { useState } from 'react'

import TabPanel from '../../../components/UserDetails/TabPanel/TabPanel'
import RadioGroup from '../../../components/UserDetails/RadioGroup/RadioGroup'
import columns from '../../../resources/TableColumns'

import classes from './TableContainer.module.css'

const TableContainer = (props) => {
    const withdrawData = props.withdrawData
    const purchaseData = props.purchaseData
    const sellingData = props.sellData   

    const [ selectedTable, setSelectedTable ] = useState('withdraw')

    const [ dataSourceWithdraw, setDataSourceWithdraw ] = useState(withdrawData);
    const [ dataSourcePurchase, setDataSourcePurchase ] = useState(purchaseData);
    const [ dataSourceSelling, setDataSourceSelling ] = useState(sellingData);
    
    const onSearchWithdraw = e => {
        setDataSourceWithdraw(withdrawData.filter( entry =>  entry.date.includes(e.target.value) ))
    }
    const onSearchPurchase = e => {
        setDataSourcePurchase(purchaseData.filter( entry =>  entry.purchaseId.includes(e.target.value) ))
    }
    const onSearchSelling = e => {
        setDataSourceSelling(sellingData.filter( entry =>  entry.sellingId.includes(e.target.value) ))
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
                            ?   <TabPanel title="Withdrawal" columns={ columns.USER_WITHDRAWAL_HISTORY } data={ dataSourceWithdraw } placeholder="Search by Date" onSearch={ onSearchWithdraw } /> 
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
                </div>
            </div>
    )
}

export default TableContainer
