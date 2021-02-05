import React, { useState, useEffect } from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'
import { Space } from 'antd'

import classes from './ContactHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import Search from '../../components/Shared/Search/Search'
import { useHttpClient } from '../../resources/http-hook'
import { showErrorModal } from '../../resources/Utilities'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'

const ContactHistory = () => {
    const [ contactHistory, setContactHistory ] = useState([])
    const [ dataSource, setDataSource ] = useState([]);
    const { isLoading, sendRequest } = useHttpClient()

    useEffect(() => {
        const fetchData = () => {
            sendRequest('/contactHistory')
                .then((response) => {
                    const newData = response.data.map((data) => {
                        return {
                            ...data,
                            key: data._id,
                            createdAt: new Date(data.createdAt).toLocaleDateString('en-IN')

                        }
                    })
                    setContactHistory(newData)
                    setDataSource(newData)
                })
                .catch((error) => showErrorModal(error.message))
        }
        fetchData()
    }, [sendRequest])

    const onSearch = e => {
        setDataSource(contactHistory.filter( entry =>  entry.name.includes(e.target.value) ))
    }

    return (
        <>
            <NavigationBar />
            { 
                isLoading 
                ?   <div className={ classes.Center }>
                        <LoadingSpinner />
                    </div> 
                : null
            }
            {
                !isLoading && contactHistory
                ?   <>
                        <div className={ classes.InfoContainer }>
                            <Space size="middle"><p> <u>Total Requests: </u> { contactHistory.length }</p></Space>
                        </div>

                        <div className={ classes.TableContainer }>
                            <div className={classes.Header}>
                                <h6>Contact History</h6>
                                <Search placeholder="Search By Name" onSearch={ onSearch } className={ classes.Search }/>
                            </div>
                            <CustomTable columns={ columns.CONTACT_HISTORY } data={ dataSource } />
                        </div>
                    </>
                :   null
            }
        </>
    )
}

export default ContactHistory
