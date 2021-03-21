import React, { useState, useEffect } from 'react'
import { Table } from 'antd'

import NavigationBar from '../../../components/Navigation/NavigationBar'
import Search from '../../../components/Shared/Search/Search'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner/LoadingSpinner'
import classes from './PartnerList.module.css'
import columns from '../../../resources/TableColumns'
import { convertToPhoneNumber1, itemRender } from '../../../resources/Utilities'
import { useHttpClient } from '../../../resources/http-hook'
import { showErrorModal } from '../../../resources/Utilities'
import { Button } from 'react-bootstrap'

const PartnerList = (props) => {
    const [ partners, setpartners ] = useState([])
    const [ dataSource, setDataSource ] = useState([])
    const { isLoading, sendRequest } = useHttpClient()

    useEffect(() => {
        const fetchPartners = () => {
            sendRequest('/retailer')
                .then((response) => {
                    const newUsers = response.data.map((user) => {

                        const transformedData = {
                            retailId: user._id,
                            storeName: user.storeName,
                            mobileNo: convertToPhoneNumber1(user.mobileNo),
                            city: user.city,
                            state: user.state,
                            date: new Date(user.createdAt).toLocaleDateString('en-IN')

                        }

                        return {
                            ...transformedData,
                            key: user._id,
                            searchString: Object.values(transformedData).join(''),
                        }
                    })
                    setpartners(newUsers)
                    setDataSource(newUsers)
                })
                .catch((error) => showErrorModal(error.message))
        }
        fetchPartners()
    }, [sendRequest])

    const onSearch = e => {
        setDataSource(partners.filter( entry =>  entry.searchString.includes(e.target.value) ))
    }

    const onRowClick = row => {
        return {
            onClick: () => props.history.push(`/admin2050/partners/${row.retailId}`, row.retailId),
        }
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
                !isLoading && partners 
                    ?   <>
                            <div className={ classes.InfoContainer }>
                                <div className={ classes.InfoContainer1 }>
                                    <h6>Retailers Entry:</h6>
                                    <Button
                                        variant="success" 
                                        className={ classes.Button }
                                        onClick={() => props.history.push('./partners/add')}>
                                        + Add
                                    </Button>
                                </div>
                                <div className={ classes.InfoContainer2 }>
                                    <h6> Total Retailers :- &nbsp; <span style={{ fontSize: '20px' }}>{ partners.length }</span> </h6>
                                    <Search placeholder="Search Retailer" onSearch={ onSearch }/>
                                </div>
                            </div>
                            <div className={ classes.TableContainer }>
                                <Table 
                                    columns={ columns.PARTNER_LIST }
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

export default PartnerList
