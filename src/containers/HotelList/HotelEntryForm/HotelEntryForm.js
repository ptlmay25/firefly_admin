import React, { useState, useRef } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import CustomInput from '../../../components/HotelList/CustomInput/CustomInput'
import NavigationBar from '../../../components/Navigation/NavigationBar'
import { toBase64 } from '../../../resources/Utilities'

import classes from './HotelEntryForm.module.css'

const HotelEntryForm = (props) => {
    const [preview, setPreview] = useState(null)
    const inputButton = useRef()

    const onSelectFile = async e => {
        if (e.target.files || e.target.files.length !== 0) {
            const imagePreview = await toBase64(e.target.files[0])
            setPreview(imagePreview)
        }
    }

    return (
        <>
            <NavigationBar />
            <Container className={ classes.FormContainer }>
                <Form>
                    <Row>
                        <Col md={6} className={ classes.InfoContainer }>
                            <h5 style={{ marginBottom: '50px' }}>Hotel/Business Profile</h5>
                            <div style={{ paddingLeft: '15px' }}>
                                <CustomInput type="text" field="brand_name" label="Brand Name" />
                                <CustomInput type="number" field="year" label="Founding Year" />
                                <CustomInput type="number" field="no_of_rooms" label="No of Rooms/Stores" />
                                <CustomInput type="number" field="avg_revenue" label="Avg. Revenue" />
                                <CustomInput type="text" field="city" label="City" />
                                <CustomInput type="text" field="country" label="Country" />
                                <CustomInput inputType="textarea" field="about" label="About" />
                            </div>
                        </Col>
                        <Col md={2}></Col>
                        <Col md={4} className={ classes.ImageContainer }>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h5>Hotel Image</h5>
                                <input ref={inputButton} type="file" onChange={ async (e) => await onSelectFile(e) } accept="image/*" style={{ display: 'none' }} />
                                <Button variant="danger" size="sm" onClick={ () => inputButton.current.click() }>
                                    Upload
                                </Button>
                            </div>
                            <div className={ classes.PreviewImage }>
                                { preview ? <img src={ preview } alt="" width="400px" height="300px"/> : null }
                            </div>
                        </Col>
                    </Row>
                    <div className={ classes.ButtonContainer }>
                        <Button variant="success" style={{ width: '100px' }}>Save</Button>
                        <Button variant="danger" style={{ width: '100px' }} onClick={() => props.history.push('/hotels')}>Cancel</Button>
                    </div>
                </Form>
            </Container>
        </>
    )
}

export default HotelEntryForm
