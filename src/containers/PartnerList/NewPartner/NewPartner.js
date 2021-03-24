import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import NavigationBar from '../../../components/Navigation/NavigationBar'
import { showErrorModal } from '../../../resources/Utilities'
import axios from 'axios'
import update from 'immutability-helper'


import classes from './NewPartner.module.css'
import { apiContext } from '../../../resources/api-context'
import PartnerForm from '../PartnerForm'
import storage from '../../../resources/firebase-storage-context'
import Back from '../../../components/Shared/Back/Back'

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
            numberOfStores: '',
            storeZipCode: '',
            totalArea: '',
            storeImg: ''
        },
        file: null,
        isLoading: false
    }

    uploadImage = async (brandID) => {
        const image = this.state.file
        const uploadTask = await storage.ref(`retailer/${brandID}`).put(image);
        return uploadTask.ref.getDownloadURL()
    }

    addImageURLToData = (brandID, imageURL) => {
        const stateCopy = this.state.retailerInfo
        stateCopy.storeImg = imageURL

        axios.put(apiContext.baseURL + `/retailer/update/${brandID}`, stateCopy)
            .then((res) => console.log('Res', res))
            .catch((err) => showErrorModal(err.message))
    }

    onChange = (value, field) => {
        this.setState({ retailerInfo: update(this.state.retailerInfo, { [field]: { $set: value }}) })
    }
    
    onChangeImage = (image) => {
        this.setState({ file: image })
    }

    onSubmitHandler = (event) => {
        event.preventDefault()        
        this.setState({ isLoading: true })
                
        axios.post(apiContext.baseURL + '/retailer/create', this.state.retailerInfo)
            .then((response) => {
                console.log(response)
                if(this.state.file) {
                    this.uploadImage(response.data.savedDoc._id)
                        .then((imageURL) => {
                            this.addImageURLToData(response.data.savedDoc._id, imageURL)
                            this.setState({ isLoading: false })
                            this.props.history.push('/admin2050/partners')
                        })
                }
                else {
                    this.setState({ isLoading: false })
                    this.props.history.push('/admin2050/partners')
                }
            })
            .catch((error) => {
                showErrorModal(error.message)
                this.setState({ isLoading: false })            
            })
    }

    render() {
        return (
            <>
                <NavigationBar />
                <Back link="/admin2050/partners" text="Back" />
                <Container className={ classes.FormContainer }>
                    <PartnerForm 
                        data={ this.state.retailerInfo } 
                        onChange={ this.onChange } 
                        onSubmit={ this.onSubmitHandler }
                        onImageChange = { this.onChangeImage }
                        onCancel={ () => this.props.history.push('/admin2050/partners')} />
                </Container>
            </>
        )
    }
}

export default NewPartner
