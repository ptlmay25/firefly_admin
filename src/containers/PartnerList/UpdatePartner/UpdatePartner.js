import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import NavigationBar from '../../../components/Navigation/NavigationBar'
import { showErrorModal } from '../../../resources/Utilities'
import axios from 'axios'
import update from 'immutability-helper'
import { Modal} from 'antd'

import classes from './UpdatePartner.module.css'
import { apiContext } from '../../../resources/api-context'
import PartnerForm from '../PartnerForm'
import storage from '../../../resources/firebase-storage-context'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner/LoadingSpinner'
import Back from '../../../components/Shared/Back/Back'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const defaultBrandImage = 'https://firebasestorage.googleapis.com/v0/b/salersclub.appspot.com/o/brand%2FIMG-20210323-WA0011.jpg?alt=media&token=4ad64fa9-e003-417e-b6bc-e9910b63225d'

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
            totalArea: '',
            storeImg: null,
        },
        file: '',
        imageSaved: false,
        isLoading: true
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
        axios.get(apiContext.baseURL + `/retailer/view/${id}`)
            .then((response) => {
                this.setState({ retailerInfo: response.data.data[0], isLoading: false })
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                showErrorModal(error.message)
            })
    }

    updateImageHandler = async () => {
        const image = this.state.file
        const uploadTask = await storage.ref(`retailer/${this.props.location.state}`).put(image);
        return uploadTask.ref.getDownloadURL()
    }

    setImageURL = (event) => {
        event.preventDefault()
        this.updateImageHandler()
            .then((imageURL) => this.setState({ retailerInfo: update(this.state.retailerInfo, { storeImg: { $set: imageURL }}), imageSaved: true }))
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

    showModal = (event) => {
        event.preventDefault()
        this.showDeleteConfirm()
    }

    onDelete = () => {
        const id = this.props.location.state
        const image = this.state.retailerInfo.storeImg 
        this.setState({ isLoading: true })

        axios.delete(apiContext.baseURL + `/retailer/delete/${ id }`)
            .then(() => {
                if(image && image !== defaultBrandImage) {
                    storage.ref().child('retailer').child(id).delete('');
                }
                this.setState({ isLoading: false })
                this.props.history.push('/admin2050/partners')
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                showErrorModal(error.message)
            })
    }

    onChangeImage = (image) => {
        this.setState({ file: image })
    }

    onChange = (value, field) => {
        this.setState({ retailerInfo: update(this.state.retailerInfo, { [field]: { $set: value }}) })
    }

    onCancel = (event) => {
        event.preventDefault()
        this.props.history.push('/admin2050/partners')
    }

    render() {
        return (
            <>
                <NavigationBar />
                {
                    this.state.isLoading 
                        ?   <LoadingSpinner />
                        :   
                            <>
                                <Back link="/admin2050/partners" text="Back" />
                                <Container className={ classes.FormContainer }>
                                    <PartnerForm 
                                        data={ this.state.retailerInfo } 
                                        onChange={ this.onChange } 
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

export default UpdatePartner
