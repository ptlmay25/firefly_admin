import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import NavigationBar from '../../../components/Navigation/NavigationBar'
import { showErrorModal } from '../../../resources/Utilities'
import axios from 'axios'
import update from 'immutability-helper'


import classes from './NewPartner.module.css'
import { apiContext } from '../../../resources/api-context'
import PartnerForm from '../PartnerForm'

class NewPartner extends Component {
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
        isLoading: false
    }

    onChange = (value, field) => {
        this.setState({ retailerInfo: update(this.state.retailerInfo, { [field]: { $set: value }}) })
    }

    onSubmitHandler = (event) => {
        event.preventDefault()
        this.setState({ isLoading: true })

        axios.post(apiContext.baseURL + '/retailer/create', this.state.retailerInfo)
            .then(() => {
                this.setState({ isLoading: false })
                this.props.history.push('/admin2050/partners')
            })
            .catch((error) => showErrorModal(error.message))
    }

    render() {
        return (
            <>
                <NavigationBar />
                <Container className={ classes.FormContainer }>
                    <PartnerForm 
                        data={ this.state.retailerInfo } 
                        onChange={ this.onChange } 
                        onSubmit={ this.onSubmitHandler }
                        onCancel={ () => this.props.history.push('/admin2050/partners')} />
                </Container>
            </>
        )
    }
}

export default NewPartner
