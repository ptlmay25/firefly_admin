import React from 'react'
import { Form } from 'react-bootstrap'
import classes from './CustomInput.module.css'


const CustomInput = (props) => {
    return (
        <Form.Group controlId={ props.field } className={ classes.CustomInput }>
            <Form.Label>{ props.label }</Form.Label>
            <Form.Control as={ props.inputType } type={ props.type } size="sm" style={{ width: '200px' }}/>
        </Form.Group>
    )
}

export default CustomInput
