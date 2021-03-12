import React, { Component, createRef } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import CustomInput from '../../../components/HotelList/CustomInput/CustomInput'
import NavigationBar from '../../../components/Navigation/NavigationBar'
import { showErrorModal } from '../../../resources/Utilities'
import update from 'immutability-helper'
import axios from 'axios'

import classes from './BusinessEntryForm.module.css'
import { apiContext } from '../../../resources/api-context'
import ImageUpload from './ImageUpload'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner/LoadingSpinner'

class HotelEntryForm extends Component {
    
    state = {
        inputButton: createRef(),
        formData: {
            brandName: '',
            year: 0,
            noOfProducts: 0,
            avgRevenue: 0,
            city: '',
            country: '',
            about: '',
            file: '',
        },
        isLoading: false
    }

    // onSelectFile = async e => {
    //     if (e.target.files || e.target.files.length !== 0) {
    //         const imagePreview = await toBase64(e.target.files[0])
    //         this.setState({ formData: update(this.state.formData, { file: { $set: imagePreview }}) })
    //     }
    // }

    onChangeImage = (image) => {
        this.setState({ formData: update(this.state.formData, { file: { $set: image }}) })
    }

    onSubmitHandler = (event) => {
        event.preventDefault()
        
        this.setState({ isLoading: true })

        const { brandName, year, noOfProducts, avgRevenue, city, country, about, file } = this.state.formData

        let formData = new FormData()
        formData.append('brandName', brandName)
        formData.append('year', year)
        formData.append('noOfProduct', noOfProducts)
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
                this.setState({ isLoading: false })
                this.props.history.push('/business')
            })
            .catch((error) => showErrorModal(error.message))
    } 

    onChangeHandler = (event, field) => {
        this.setState({ formData: update(this.state.formData, { [field]: { $set: event.target.value }}) })
    }
    
    render() {
        const { brandName, year, noOfProducts, avgRevenue, city, country, about } = this.state.formData

        return (
            <>
                <NavigationBar />
                {
                    this.state.isLoading 
                        ?   <div className={ classes.Center }>
                                <LoadingSpinner />
                            </div>
                        :   <Container className={ classes.FormContainer }>
                                <Form onSubmit={(e) => this.onSubmitHandler(e)}>
                                    <Row style={{ paddingTop: '10px' }}>
                                        <Col md={6} className={ classes.InfoContainer }>
                                            <h5 style={{ marginBottom: '50px' }}>Brand Profile</h5>
                                            <div style={{ paddingLeft: '15px' }}>
                                                <CustomInput 
                                                    type="text" 
                                                    field="brand_name" 
                                                    label="Brand Name" 
                                                    value={ brandName } 
                                                    onChange={(event) => this.onChangeHandler(event, 'brandName')}
                                                    required />
                                                
                                                <CustomInput 
                                                    type="number" 
                                                    field="year" 
                                                    label="Founding Year" 
                                                    value={ year === 0 ? '' : year }
                                                    onChange={(event) => this.onChangeHandler(event, 'year')}
                                                    required />
                                                
                                                <CustomInput 
                                                    type="number" 
                                                    field="noOfProducts" 
                                                    label="No of Products" 
                                                    value={ noOfProducts === 0 ? '' : noOfProducts } 
                                                    onChange={(event) => this.onChangeHandler(event, 'noOfProducts')} 
                                                    required/>
                                                
                                                <CustomInput 
                                                    type="number" 
                                                    field="avg_revenue" 
                                                    label="Avg. Revenue" 
                                                    value={ avgRevenue === 0 ? '' : avgRevenue }
                                                    onChange={(event) => this.onChangeHandler(event, 'avgRevenue')} 
                                                    required/>
            
                                                <CustomInput 
                                                    type="text" 
                                                    field="city" 
                                                    label="City" 
                                                    value={ city } 
                                                    onChange={(event) => this.onChangeHandler(event, 'city')} 
                                                    required />
            
                                                <CustomInput 
                                                    type="text" 
                                                    field="country" 
                                                    label="Country" 
                                                    value={ country } 
                                                    onChange={(event) => this.onChangeHandler(event, 'country')} 
                                                    required />
            
                                                <CustomInput 
                                                    inputType="textarea" 
                                                    field="about" 
                                                    label="About" 
                                                    value={ about }
                                                    onChange={(event) => this.onChangeHandler(event, 'about')}
                                                    required />
            
                                            </div>
                                        </Col>
                                        <Col md={2}></Col>
                                        <Col md={4} className={ classes.ImageContainer }>
                                            <ImageUpload onChange={ this.onChangeImage } />
                                        </Col>
                                    </Row>
                                    <div className={ classes.ButtonContainer }>
                                        <Button id="save" style={{ width: '150px' }} type="submit">Save</Button>
                                        <Button variant="danger" style={{ width: '150px' }} onClick={() => this.props.history.push('/hotels')}>Cancel</Button>
                                    </div>
                                </Form>
                            </Container>
                }
                
            </>
        )
    }
}

export default HotelEntryForm