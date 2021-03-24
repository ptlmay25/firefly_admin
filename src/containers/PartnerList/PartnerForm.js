import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

import { Input, Select } from 'antd'
import PhoneInput from 'react-phone-input-2'

import classes from './PartnerForm.module.css'  
import ImageUpload from '../../components/Shared/ImageUpload/ImageUpload'
import ImageUpdate from '../../components/Shared/ImageUpdate/ImageUpdate'

const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Andaman and Nicobar Islands', 'Assam', 'Bihar', 'Chandigarh','Chhattisgarh',	
    'Dadra & Nagar Haveli', 'Daman & Diu', 'Delhi',	'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',	
    'Jharkhand', 'Karnataka', 'Kerala',	'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',	
    'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim',	'Tamil Nadu', 'Telangana', 'Tripura',	
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'	
]

class PartnerForm extends Component {
    
    render() {
        const { name, email, mobileNo, aadharCardNo, panCardNo, city, state, zipcode, storeImg } = this.props.data
        const { storeName, storeAddress, storeCategory, gstNumber, storeZipCode, totalArea, numberOfStores } = this.props.data

        return (
            <Form onSubmit={(e) => this.props.onSubmit(e)}>
                <Row style={{ paddingTop: '10px' }}>
                    <Col md={5} className={ classes.InfoContainer }>
                        <h5 style={{ marginBottom: '40px' }}>Retailer's Registration</h5>
                        <div style={{ padding: '0px 30px' }}>
                            <Row className={ classes.Form }>
                                <span>Full Name *</span>
                                <Input 
                                    value={ name } 
                                    placeholder="Enter your Name"
                                    onChange={(event) => this.props.onChange(event.target.value, 'name')}
                                    required />
                            </Row>

                            <Row style={{ marginTop: '20px' }}>
                                <span>Email Address *</span>
                                <Input 
                                    value = { email }
                                    required 
                                    placeholder="Enter your Email Address"
                                    type="email"
                                    onChange={(event) => this.props.onChange(event.target.value, 'email')} />
                            </Row>

                            <Row style={{ marginTop: '20px', display: 'flex', flexFlow: 'column' }}>
                                <span>Phone Number *</span>
                                <PhoneInput
                                    value={ mobileNo }
                                    required
                                    onChange={ (value) => this.props.onChange(value, 'mobileNo') }
                                    country='in'
                                    placeholder="Enter Your Phone Number" />
                                
                            </Row>

                            <Row style={{ marginTop: '20px' }}>
                                <span>Aadhar Card Number *</span>
                                <Input
                                    type="number"
                                    value = { aadharCardNo } 
                                    placeholder="Enter your Aadhar Card Number"
                                    required
                                    onChange={(event) => this.props.onChange(event.target.value, 'aadharCardNo')} />
                            </Row>

                            <Row style={{ marginTop: '20px' }}>
                                <span>PAN Card Number *</span>
                                <Input
                                    value = { panCardNo } 
                                    placeholder="Enter your PAN Number"
                                    required
                                    onChange={(event) => this.props.onChange(event.target.value, 'panCardNo')} />
                            </Row>

                            <Row style={{ marginTop: '20px' }}>
                                <div className={ classes.CityDiv }>
                                    <span>City *</span>
                                    <Input 
                                        value = { city } 
                                        placeholder="Enter your city"
                                        required
                                        onChange={(event) => this.props.onChange(event.target.value, 'city')} />
                                </div>

                                <div className={ classes.StateDiv }>
                                    <span>State *</span>
                                    <Select 
                                        value={ state || undefined }
                                        onChange={(value) => this.props.onChange(value, 'state')}
                                        placeholder="Enter your state"
                                        required
                                        className={ classes.State } >
                                            {
                                                    states.map(element => (
                                                        <Select.Option key={ element } value={ element }> { element } </Select.Option>
                                                    ))
                                            }
                                    </Select>
                                </div>
                            </Row>

                            <Row style={{ marginTop: '20px', marginBottom: '50px' }}>
                                <span>Zip Code *</span>
                                <Input
                                    type="number"
                                    value = { zipcode } 
                                    placeholder="Enter your Zip Code"
                                    required
                                    onChange={(event) => this.props.onChange(event.target.value, 'zipcode')} />
                            </Row>
    
                            {
                            ! this.props.updateMode
                                ?   <ImageUpload 
                                        onChange={ this.props.onImageChange }
                                        title="Store Image"  />
                                :   <ImageUpdate
                                        onChange={ this.props.onImageChange }
                                        uploadImage={ this.props.uploadImage }
                                        imageSaved={ this.props.imageSaved }
                                        imageURL={ storeImg }
                                        title="Store Image" />
                        }
                        
                            <div className={ classes.ButtonContainer }>
                                <Button id="save" style={{ width: '150px' }} type="submit">Save</Button>
                                <Button variant="danger" style={{ width: '150px' }} onClick={(e) => this.props.onCancel(e)}>Cancel</Button>
                            </div>

                            {
                                this.props.updateMode 
                                    ? <p 
                                        style={{ color:' red', fontSize: '20px', marginTop: '20px', textAlign: 'left', textDecoration: 'underline', cursor: 'pointer' }}
                                        onClick={ (e) => this.props.onClickDelete(e) }>
                                            Delete Retailer
                                        </p> 
                                    : null
                            }
                        </div>
                    </Col>
                    <Col md={2}></Col>
                    <Col md={5} className={ classes.ImageContainer }>
                        <h5 style={{ marginBottom: '40px' }}>Store Details</h5>
                        <div style={{ padding: '0px 30px' }}>
                            <Row className={ classes.Form }>
                                <span>Store Name *</span>
                                <Input 
                                    value={ storeName } 
                                    placeholder="Enter your store's name"
                                    onChange={(event) => this.props.onChange(event.target.value, 'storeName')}
                                    required />
                            </Row>

                            <Row style={{ marginTop: '30px' }}>
                                <span>Store Address *</span>
                                <Input 
                                    value = { storeAddress } 
                                    placeholder="Enter your store's Address"
                                    onChange={(event) => this.props.onChange(event.target.value, 'storeAddress')}
                                    required />
                            </Row>

                            <Row style={{ marginTop: '30px' }}>
                                <span>GST Number * </span>
                                <Input
                                    value = { gstNumber } 
                                    placeholder="Enter your GST Number"
                                    required
                                    onChange={(event) => this.props.onChange(event.target.value, 'gstNumber')} />
                            </Row>

                            <Row style={{ marginTop: '30px' }}>
                                <span>Store Category *</span>
                                <Input
                                    value = { storeCategory } 
                                    placeholder="Enter your Store Category (eg. Electronics, Clothing)"
                                    required
                                    onChange={(event) => this.props.onChange(event.target.value, 'storeCategory')} />
                            </Row>

                            <Row style={{ marginTop: '30px' }}>
                                <span>Number of Stores *</span>
                                <Input
                                    type="number"
                                    value = { numberOfStores } 
                                    placeholder="Enter Number of stores"
                                    required
                                    onChange={(event) => this.props.onChange(event.target.value, 'numberOfStores')} />
                            </Row>

                            <Row style={{ marginTop: '30px', marginBottom: '100px'}}>
                                <div className={ classes.CityDiv }>
                                    <span>ZipCode *</span>
                                    <Input 
                                        value = { storeZipCode } 
                                        type="number"
                                        placeholder="Enter your Zip Code"
                                        required
                                        maxLength={ 6 }
                                        onChange={(event) => this.props.onChange(event.target.value, 'storeZipCode')} />
                                </div>

                                <div className={ classes.StateDiv }>
                                    <span>Total Area <span style={{ fontSize: '12px', color: 'slategray' }}>(optional)</span></span>
                                    <Input 
                                        type="number"
                                        value = { totalArea } 
                                        placeholder="Enter total Area (In Square Foot)"
                                        onChange={(event) => this.props.onChange(event.target.value, 'totalArea')} />
                                </div>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default PartnerForm



