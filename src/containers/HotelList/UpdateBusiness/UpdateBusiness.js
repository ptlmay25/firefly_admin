import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import NavigationBar from '../../../components/Navigation/NavigationBar'
import { showErrorModal } from '../../../resources/Utilities'
import update from 'immutability-helper'
import axios from 'axios'
import { Modal} from 'antd'

import classes from './UpdateBusiness.module.css'
import { apiContext } from '../../../resources/api-context'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner/LoadingSpinner'
import BusinessForm from '../BusinessForm'
import storage from '../../../resources/firebase-storage-context'
import Back from '../../../components/Shared/Back/Back'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const defaultBrandImage = 'https://firebasestorage.googleapis.com/v0/b/salersclub.appspot.com/o/brand%2FIMG-20210323-WA0011.jpg?alt=media&token=4ad64fa9-e003-417e-b6bc-e9910b63225d'

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
            brandImg: null,
        },
        file: '',
        imageSaved: false,
        isLoading: true,
        deleteRequest: false,
    }

    showDeleteConfirm =  () => {
        confirm({
          title: 'Are you sure you want to delete this brand?',
          icon: <ExclamationCircleOutlined />,
          content: 'All data will be lost permanantly.',
          okText: 'Yes, delete',
          okType: 'danger',
          cancelText: 'Cancel',
          onOk: () => {
            this.onDelete()
          }
        });
    }

    componentDidMount = () => {
        const id = this.props.location.state
        axios.get(apiContext.baseURL + `/brand/view/${id}`)
            .then((response) => {
                const data = response.data.data[0]
                data.year = (new Date(data.year)).getFullYear()
                this.setState({ formData: data, isLoading: false })
            })
            .catch((error) => {
                showErrorModal(error.message)
                this.setState({ isLoading: false })
            })
    }

    onChangeImage = (image) => {
        this.setState({ file: image })
    }

    updateImageHandler = async () => {
        const image = this.state.file
        const uploadTask = await storage.ref(`brand/${this.props.location.state}`).put(image);
        return uploadTask.ref.getDownloadURL()
    }

    setImageURL = (event) => {
        event.preventDefault()
        this.updateImageHandler()
            .then((imageURL) => this.setState({ formData: update(this.state.formData, { brandImg: { $set: imageURL }}), imageSaved: true }))
    }

    onSubmitHandler = (event) => {
        event.preventDefault()
        
        this.setState({ isLoading: true })

        const id = this.props.location.state
        axios.put(apiContext.baseURL + `/brand/update/${id}`, this.state.formData)
            .then((response) => {
                this.setState({ isLoading: false })
                this.props.history.push('/admin2050/business')
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                showErrorModal(error.message)
            })
    } 

    showModal = (event) => {
        event.preventDefault()
        this.showDeleteConfirm()
    }

    onDelete = () => {
        const id = this.props.location.state
        const image = this.state.formData.brandImg 
        this.setState({ isLoading: true })

        axios.delete(apiContext.baseURL + `/brand/delete/${ id }`)
            .then(() => {
                if(image && image !== defaultBrandImage) {
                    storage.ref().child('brand').child(id).delete('');
                }
                this.setState({ isLoading: false })
                this.props.history.push('/admin2050/business')
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                showErrorModal(error.message)
            })
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
                                        onCancel={ this.onCancel }
                                        imageSaved={ this.state.imageSaved }
                                        uploadImage = { this.setImageURL }
                                        onClickDelete = { this.showModal }
                                        updateMode />
                                </Container>
                            </>
                    }
                
            </>
        )
    }
}

export default NewBusiness