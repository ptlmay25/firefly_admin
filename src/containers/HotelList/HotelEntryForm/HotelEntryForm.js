import React, { Component, createRef } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import CustomInput from '../../../components/HotelList/CustomInput/CustomInput'
import NavigationBar from '../../../components/Navigation/NavigationBar'
import { showErrorModal, toBase64 } from '../../../resources/Utilities'
import update from 'immutability-helper'
import axios from 'axios'

import classes from './HotelEntryForm.module.css'
import { apiContext } from '../../../resources/api-context'

class HotelEntryForm extends Component {
    
    state = {
        inputButton: createRef(),
        formData: {
            brand_name: '',
            year: 0,
            num_of_rooms: 0,
            avg_revenue: 0,
            city: '',
            country: '',
            about: '',
            image: ''
        }
    }

    onSelectFile = async e => {
        if (e.target.files || e.target.files.length !== 0) {
            const imagePreview = await toBase64(e.target.files[0])
            this.setState({ formData: update(this.state.formData, { image: { $set: imagePreview }}) })
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault()
        axios.post(apiContext.baseURL + '/add', this.state.formData)
            .then(() => this.props.history.push('/hotels'))
            .catch((error) => showErrorModal(error.message))
    } 

    onChangeHandler = (event, field) => {
        this.setState({ formData: update(this.state.formData, { [field]: { $set: event.target.value }}) })
    }
    
    render() {
        const { brand_name, year, num_of_rooms, avg_revenue, city, country, about, image } = this.state.formData

        return (
            <>
                <NavigationBar />
                <Container className={ classes.FormContainer }>
                    <Form onSubmit={(e) => this.onSubmitHandler(e)}>
                        <Row style={{ paddingTop: '10px' }}>
                            <Col md={6} className={ classes.InfoContainer }>
                                <h5 style={{ marginBottom: '50px' }}>Hotel/Business Profile</h5>
                                <div style={{ paddingLeft: '15px' }}>
                                    <CustomInput 
                                        type="text" 
                                        field="brand_name" 
                                        label="Brand Name" 
                                        value={ brand_name } 
                                        onChange={(event) => this.onChangeHandler(event, 'brand_name')}
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
                                        field="num_of_rooms" 
                                        label="No of Rooms/Stores" 
                                        value={ num_of_rooms === 0 ? '' : num_of_rooms } 
                                        onChange={(event) => this.onChangeHandler(event, 'num_of_rooms')} 
                                        required/>
                                    
                                    <CustomInput 
                                        type="number" 
                                        field="avg_revenue" 
                                        label="Avg. Revenue" 
                                        value={ avg_revenue === 0 ? '' : avg_revenue }
                                        onChange={(event) => this.onChangeHandler(event, 'avg_revenue')} 
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
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h5>Hotel Image</h5>
                                    <input ref={this.state.inputButton} type="file" onChange={ async (e) => await this.onSelectFile(e) } accept="image/*" style={{ display: 'none' }} />
                                    <Button style={{ width: '150px', marginTop: '-10px' }} onClick={ () => this.state.inputButton.current.click() }>
                                        Upload
                                    </Button>
                                </div>
                                <div className={ classes.PreviewImage }>
                                    { image ? <img src={ image } alt="" width="395px" height="295px"/> : null }
                                </div>
                            </Col>
                        </Row>
                        <div className={ classes.ButtonContainer }>
                            <Button id="save" style={{ width: '150px' }} type="submit">Save</Button>
                            <Button variant="danger" style={{ width: '150px' }} onClick={() => this.props.history.push('/hotels')}>Cancel</Button>
                        </div>
                    </Form>
                </Container>
            </>
        )
    }
}

export default HotelEntryForm