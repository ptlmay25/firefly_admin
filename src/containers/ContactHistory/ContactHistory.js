import React, { useState, useEffect } from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'

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
            sendRequest('/contact/history')
                .then((response) => {
                    const newData = response.data.map((data) => {

                        const transformedData = {
                            _id: data._id,
                            createdAt: new Date(data.createdAt).toLocaleDateString('en-IN'),
                            name: data.name,
                            BankAccountNumber: data.BankAccountNumber,
                            message: data.message,
                        }

                        return {
                            ...transformedData,
                            key: data._id,
                            searchString: Object.values(transformedData).join(''),
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
        setDataSource(contactHistory.filter( entry =>  entry.searchString.includes(e.target.value) ))
    }

    return (
        <>
            <NavigationBar />
            { 
                isLoading 
                ? <LoadingSpinner />
                : null
            }
            {
                !isLoading && contactHistory
                ?   <>
                        <div className={ classes.InfoContainer }>
                            <h6> Total Requests :- &nbsp; <span style={{ fontSize: '20px' }}>{ contactHistory.length }</span> </h6>
                        </div>

                        <div className={ classes.TableContainer }>
                            <div className={classes.Header}>
                                <h6>Contact History</h6>
                                <Search placeholder="Search Contact History" onSearch={ onSearch } className={ classes.Search }/>
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
