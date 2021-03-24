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
import storage from '../../../resources/firebase-storage-context'
import Back from '../../../components/Shared/Back/Back'

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
            brandImg: '',
        },
        file: '',
        isLoading: false
    }

    uploadImage = async (brandID) => {
        const image = this.state.file
        const uploadTask = await storage.ref(`brand/${brandID}`).put(image);
        return uploadTask.ref.getDownloadURL()
    }

    addImageURLToData = (brandID, imageURL) => {
        const stateCopy = this.state.formData
        stateCopy.brandImg = imageURL

        axios.put(apiContext.baseURL + `/brand/update/${brandID}`, stateCopy)
            .then((res) => console.log('Res', res))
            .catch((err) => showErrorModal(err.message))
    }

    onSubmitHandler = (event) => {
        event.preventDefault()        
        this.setState({ isLoading: true })
                
        axios.post(apiContext.baseURL + '/brand/create', this.state.formData)
            .then((response) => {
                if(this.state.file) {
                    this.uploadImage(response.data.savedDoc._id)
                        .then((imageURL) => {
                            this.addImageURLToData(response.data.savedDoc._id, imageURL)
                            window.setTimeout(() => {                                
                                this.setState({ isLoading: false })
                                this.props.history.push('/admin2050/business')
                            }, 100)
                        })
                }
                else {
                    this.setState({ isLoading: false })
                    this.props.history.push('/admin2050/business')
                }
            })
            .catch((error) => showErrorModal(error.message))
    } 

    
    onChangeImage = (image) => {
        this.setState({ file: image })
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
                        :   <>
                                <Back link="/admin2050/business" text="Back" />
                                <Container className={ classes.FormContainer }>
                                    <BusinessForm 
                                        data={ this.state.formData }
                                        onChange={ this.onChangeHandler } 
                                        onSubmit={ this.onSubmitHandler }
                                        onImageChange = { this.onChangeImage }
                                        onCancel={ this.onCancel } />
                                </Container>
                            </>
                }
                
            </>
        )
    }
}

export default NewBusiness