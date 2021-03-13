//  eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { Table } from 'antd'

import NavigationBar from '../../components/Navigation/NavigationBar'
import Search from '../../components/Shared/Search/Search'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'
import classes from './PartnerList.module.css'
import columns from '../../resources/TableColumns'
//  eslint-disable-next-line
import { convertToINR, itemRender } from '../../resources/Utilities'
import { useHttpClient } from '../../resources/http-hook'
import { showErrorModal } from '../../resources/Utilities'
import { Button } from 'react-bootstrap'

const PartnerList = (props) => {
    //  eslint-disable-next-line
    const [ partners, setpartners ] = useState([])
    const [ dataSource, setDataSource ] = useState([])
    //  eslint-disable-next-line
    const { isLoading, sendRequest } = useHttpClient()

    useEffect(() => {
        const fetchPartners = () => {
            sendRequest('/retailer')
                .then((response) => {
                    const newUsers = response.data.map((user) => {
                        return {
                            ...user,
                            key: user._id,
                            retailId: user._id,
                            date: new Date(user.createdAt).toLocaleDateString('en-IN')
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
        setDataSource(partners.filter( entry =>  entry.storeName.includes(e.target.value) ))
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
                                    <Search placeholder="Search by Store Name" onSearch={ onSearch }/>
                                </div>
                            </div>
                            <div className={ classes.TableContainer }>
                                <Table 
                                    columns={ columns.PARTNER_LIST }
                                    dataSource={ dataSource }
                                    pagination={{ defaultPageSize: 5, itemRender: itemRender, showSizeChanger: true, pageSizeOptions: [5,10,20] }} 
                                    bordered
                                    rowClassName={ classes.Row } />
                            </div>
                        </>   
                    : null
                }
        </div>
    )
}

export default PartnerList
