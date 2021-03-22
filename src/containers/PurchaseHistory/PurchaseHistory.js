import React, { Component } from 'react'
import NavigationBar from '../../components/Navigation/NavigationBar'

import classes from './PurchaseHistory.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'
import Search from '../../components/Shared/Search/Search'
import { convertToINR, convertToPhoneNumber, showErrorModal } from '../../resources/Utilities'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'

import axios from 'axios'
import { apiContext } from '../../resources/api-context'

class PurchaseHistory extends Component {

    state = {
        tokenCount: 0,
        tokenValue: 0,
        purchaseData: null,
        dataSource: null,
        isLoading: true
    }

    getPhoneNumber = id => {
        return axios.get(apiContext.baseURL + `/user/view/${id}`)
            .then((response) => {
                return response.data.data[0].mobileNo
            }) 
            .catch((error) => showErrorModal(error.message))
    }

    componentDidMount = async () => {
        try {
            let tempTokenCount = 0
            let totalTokenValue = 0
 
            const { data: { data: purchaseData } } = await axios.get(apiContext.baseURL + '/purchase')
            this.setState({ isLoading: false })

            const newData = await purchaseData.map(async (data) => {
                tempTokenCount += data.num_of_tokens
                totalTokenValue += data.num_of_tokens * data.token_price

                const transformedData = {
                    pur_id: data._id,
                    user_acc_num: data.user_id,
                    status: data.status,
                    token_price: data.token_price,
                    num_of_tokens: data.num_of_tokens,
                    total_price: data.total_price,
                    date: new Date(data.date).toLocaleDateString('en-IN'),
                    mobile: await this.getPhoneNumber(data.user_id),
                }

                return {
                    ...transformedData,
                    key: data._id,
                    searchString: Object.values(transformedData).join(''),
                    mobileNo: convertToPhoneNumber(transformedData.mobile),    
                    token_price: `₹ ${ convertToINR(data.token_price) }`,
                    total_price: `₹ ${ convertToINR(data.num_of_tokens * data.token_price) }`,
                }
            })

            const newData1 = await Promise.all(newData)

            this.setState({
                tokenCount: tempTokenCount,
                tokenValue: totalTokenValue,
                purchaseData: newData1,
                dataSource: newData1
            })
        } catch(error) {
            showErrorModal(error.message)
            this.setState({ isLoading: false })
        }
    }

    onSearch = e => {
        this.setState({ dataSource: this.state.purchaseData.filter( entry =>  entry.searchString.includes(e.target.value)) })
    }

    render() {
        return (
            <>
                <NavigationBar />
                { 
                    this.state.isLoading 
                    ? <LoadingSpinner/>
                    : null
                }
                {
                    !this.state.isLoading && this.state.purchaseData
                    ?   <>  
                            <div className={ classes.InfoContainer }>
                                <h6> Total Number of Tokens Purchased :- &nbsp; <span style={{ fontSize: '20px' }}>{ this.state.tokenCount }</span> </h6>
                                <h6> Total Token Value :- &nbsp; <span style={{ fontSize: '20px' }}>{ this.state.tokenValue }</span> </h6>
                            </div>
                            
                            <div className={ classes.TableContainer }>
                                <div className={classes.Header}>
                                    <h6>Token Purchase History</h6>
                                    <Search placeholder="Search Purchase History" onSearch={ this.onSearch } className={ classes.Search }/>
                                </div>
                                <CustomTable columns={ columns.PURCHASE_HISTORY } data={ this.state.dataSource } />
                            </div>
                        </>     
                    :   null
                }
            </>
        )
    }
}

export default PurchaseHistory
