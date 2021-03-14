import React, { Component } from 'react'
import { Button, Table } from 'antd'

import columns from '../../resources/TableColumns'
import NavigationBar from '../../components/Navigation/NavigationBar'
import classes from './ContactRequest.module.css'
import { itemRender } from '../../resources/Utilities'
import Search from '../../components/Shared/Search/Search'
import { showErrorModal } from '../../resources/Utilities'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'
import axios from 'axios'
import { apiContext } from '../../resources/api-context'



class ContactRequest extends Component {

    state = {
        requestData: null,
        dataSource: null,
        selectedRows: [],
        isLoading: true
    }

    getRequestData = async () => {
        try {
            const requestData = await (await axios.get(apiContext.baseURL + '/contact/request')).data.data
            return requestData.map((data) => {
                return {
                    ...data,
                    key: data._id,
                    createdAt: new Date(data.createdAt).toLocaleDateString('en-IN')
                }
            })
        } catch(error) {
            showErrorModal(error.message)
        }
    }

    componentDidMount = async () => {
        const requestData = await this.getRequestData()
        this.setState({
            requestData,
            dataSource: requestData,
            isLoading: false
        })
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({ selectedRows })
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
              name: record.name,
        }),
    };

    onSearch = e => {
        this.setState({ dataSource: this.state.requestData.filter( entry =>  entry.name.includes(e.target.value) )}) 
    }

    onSolvedHandler = async () => {
        if(this.state.selectedRows.length === 0) {
            alert("Select entries to withdraw first")
        } else {
            this.setState({ isLoading: true })
            try {
                this.state.selectedRows.forEach(element => {
                    axios.put(apiContext.baseURL + `/contact/solved/${element.key}`, { Solved: true })
                });
            } catch(error) {
                    showErrorModal(error.message)
                    this.setState({ isLoading: false })
            }
            this.setState({ isLoading: false })
            window.location.reload()
        }
    }

    render() {
        return (
            <>
                <NavigationBar />
                { 
                    this.state.isLoading 
                    ? <LoadingSpinner />
                    : null
                }
                {
                    !this.state.isLoading && this.state.requestData
                    ?   <>
                            <div className={ classes.InfoContainer }>                            
                                <Button type="primary" danger size="large" onClick={() => this.onSolvedHandler() } style={{ width: '200px' }}>Solved</Button>                    
                                <div>
                                    <h6> Total Requests :- &nbsp; <span style={{ fontSize: '20px' }}>{ this.state.requestData.length }</span> </h6>
                                </div>
                            </div>

                            <div className={ classes.TableContainer }>
                                <div className={classes.Header}>
                                    <h6>Contact Us Requests</h6>
                                    <Search placeholder="Search By User ID" onSearch={ this.onSearch } className={ classes.Search }/>
                                </div>
                                <Table 
                                    columns={ columns.CONTACT_REQUEST }
                                    dataSource={ this.state.dataSource }
                                    pagination={{ defaultPageSize: 5, itemRender: itemRender , showSizeChanger: true, pageSizeOptions: [5,10,20] }} 
                                    bordered
                                    rowSelection={{
                                        type: 'checkbox',
                                        ...this.rowSelection,
                                    }}
                                    rowClassName={ classes.Row } />
                            </div>
                        </>
                    : null
                }
            </>
        )
    }
}

export default ContactRequest

