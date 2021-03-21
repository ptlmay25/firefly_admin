import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import NavigationBar from '../../../components/Navigation/NavigationBar'
import { showErrorModal } from '../../../resources/Utilities'
import axios from 'axios'
import update from 'immutability-helper'


import classes from './UpdatePartner.module.css'
import { apiContext } from '../../../resources/api-context'
import PartnerForm from '../PartnerForm'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner/LoadingSpinner'

class UpdatePartner extends Component {
    state = {
        retailerInfo: {
            name: '',
            email: '',
            mobileNo: '',
            aadharCardNo: '',
            panCardNo: '',
            city: '',
            state: '',
            zipcode: '',
            storeName: '',
            storeAddress: '',
            gstNumber: '',
            storeCategory: '',
            storeZipCode: '',
            totalArea: ''
        },
        isLoading: true
    }

    componentDidMount = () => {
        const id = this.props.location.state
        axios.get(apiContext.baseURL + `/retailer/view/${id}`)
            .then((response) => {
                this.setState({ retailerInfo: response.data.data[0], isLoading: false })
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                showErrorModal(error.message)
            })
    }

    onChange = (value, field) => {
        this.setState({ retailerInfo: update(this.state.retailerInfo, { [field]: { $set: value }}) })
    }

    onSubmitHandler = (event) => {
        event.preventDefault()
        this.setState({ isLoading: true })

        const id = this.props.location.state
        axios.put(apiContext.baseURL + `/retailer/update/${id}`, this.state.retailerInfo)
            .then(() => {
                this.setState({ isLoading: false })
                this.props.history.push('/admin2050/partners')
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                showErrorModal(error.message)
            })
    }

    render() {
        return (
            <>
                <NavigationBar />
                {
                    this.state.isLoading 
                        ?   <LoadingSpinner />
                        :   <Container className={ classes.FormContainer }>
                                <PartnerForm data={ this.state.retailerInfo } onChange={ this.onChange } onSubmit={ this.onSubmitHandler } />
                            </Container>   
                }
            </>
        )
    }
}

export default UpdatePartner
