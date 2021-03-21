import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import NavigationBar from '../../../components/Navigation/NavigationBar'
import { showErrorModal } from '../../../resources/Utilities'
import update from 'immutability-helper'
import axios from 'axios'

import classes from './NewBusiness.module.css'
import { apiContext } from '../../../resources/api-context'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner/LoadingSpinner'
import BusinessForm from '../BusinessForm'

class NewBusiness extends Component {
    
    state = {
        formData: {
            brandName: '',
            year: 0,
            noOfProduct: 0,
            avgRevenue: 0,
            city: '',
            country: '',
            about: '',
            file: '',
        },
        isLoading: false
    }

    onChangeImage = (image) => {
        this.setState({ formData: update(this.state.formData, { file: { $set: image }}) })
    }

    onSubmitHandler = (event) => {
        event.preventDefault()
        
        this.setState({ isLoading: true })

        const { brandName, year, noOfProduct, avgRevenue, city, country, about, file } = this.state.formData

        let formData = new FormData()
        formData.append('brandName', brandName)
        formData.append('year', year)
        formData.append('noOfProduct', noOfProduct)
        formData.append('avgRevenue', avgRevenue)
        formData.append('city', city)
        formData.append('country', country)
        formData.append('about', about)
        formData.append('file', file)
                
        axios.post(apiContext.baseURL + '/brand/create', formData, {
            'Content-Type': 'false',
            'Process-Data': 'false'
        })
            .then((response) => {
                console.log(response)
                this.setState({ isLoading: false })
                this.props.history.push('/admin2050/business')
            })
            .catch((error) => showErrorModal(error.message))
    } 

    onChangeHandler = (event, field) => {
        this.setState({ formData: update(this.state.formData, { [field]: { $set: event.target.value }}) })
    }

    onCancel = (event) => {
        event.preventDefault()
        this.props.history.push('/admin2050/business')
    }
    
    render() {
        return (
            <>
                <NavigationBar />
                {
                    this.state.isLoading 
                        ?   <LoadingSpinner />
                        :   <Container className={ classes.FormContainer }>
                                <BusinessForm 
                                    data={ this.state.formData } 
                                    onChange={ this.onChangeHandler } 
                                    onSubmit={ this.onSubmitHandler }
                                    onImageChange = { this.onChangeImage }
                                    onCancel={ this.onCancel } />
                            </Container>
                }
                
            </>
        )
    }
}

export default NewBusiness