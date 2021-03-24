import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

import ImageUpload from '../../components/Shared/ImageUpload/ImageUpload'
import CustomInput from '../../components/HotelList/CustomInput/CustomInput'

import classes from './BusinessForm.module.css'
import ImageUpdate from '../../components/Shared/ImageUpdate/ImageUpdate'

class BusinessForm extends Component {

    render() {
        const { brandName, year, noOfProduct, avgRevenue, city, country, about, brandImg } = this.props.data

        return (
            <Form onSubmit={(e) => this.props.onSubmit(e)}>
                <Row style={{ paddingTop: '10px' }}>
                    <Col md={6} className={ classes.InfoContainer }>
                        <h5 style={{ marginBottom: '50px' }}>Brand Profile</h5>
                        <div style={{ paddingLeft: '15px' }}>
                            <CustomInput 
                                type="text" 
                                field="brand_name" 
                                label="Brand Name" 
                                value={ brandName } 
                                onChange={(event) => this.props.onChange(event, 'brandName')}
                                required />
                            
                            <CustomInput 
                                type="number" 
                                field="year" 
                                label="Founding Year" 
                                value={ year === 0 ? '' : year }
                                onChange={(event) => this.props.onChange(event, 'year')}
                                required />
                            
                            <CustomInput 
                                type="number" 
                                field="noOfProducts" 
                                label="No of Products" 
                                value={ noOfProduct === 0 ? '' : noOfProduct } 
                                onChange={(event) => this.props.onChange(event, 'noOfProduct')} 
                                required/>
                            
                            <CustomInput 
                                type="number" 
                                field="avg_revenue" 
                                label="Avg. Revenue" 
                                value={ avgRevenue === 0 ? '' : avgRevenue }
                                onChange={(event) => this.props.onChange(event, 'avgRevenue')} 
                                required/>

                            <CustomInput 
                                type="text" 
                                field="city" 
                                label="City" 
                                value={ city } 
                                onChange={(event) => this.props.onChange(event, 'city')} 
                                required />

                            <CustomInput 
                                type="text" 
                                field="country" 
                                label="Country" 
                                value={ country } 
                                onChange={(event) => this.props.onChange(event, 'country')} 
                                required />

                            <CustomInput 
                                inputType="textarea" 
                                field="about" 
                                label="About" 
                                value={ about }
                                onChange={(event) => this.props.onChange(event, 'about')}
                                required />

                        </div>
                    </Col>
                    <Col md={2}></Col>
                    <Col md={4} className={ classes.ImageContainer }>
                        {
                            ! this.props.updateMode
                                ?   <ImageUpload 
                                        onChange={ this.props.onImageChange }
                                        title="Business Image"  />
                                :   <ImageUpdate 
                                        onChange={ this.props.onImageChange }
                                        uploadImage={ this.props.uploadImage }
                                        imageSaved={ this.props.imageSaved }
                                        imageURL={ brandImg }
                                        title="Business Image" />
                        }
                    </Col>
                </Row>
                <div className={ classes.ButtonContainer }>
                    <Button id="save" style={{ width: '150px' }} type="submit">Save</Button>
                    <Button variant="danger" style={{ width: '150px' }} onClick={ (e) => this.props.onCancel(e) }>Cancel</Button>
                </div>
                {
                    this.props.updateMode 
                        ? <p 
                            style={{ color:' red', fontSize: '20px', marginTop: '-70px', textAlign: 'right', textDecoration: 'underline', cursor: 'pointer' }}
                            onClick={ (e) => this.props.onClickDelete(e) }>
                                Delete Brand
                            </p> 
                        : null
                }
            </Form>
        )
    }
}

export default BusinessForm
