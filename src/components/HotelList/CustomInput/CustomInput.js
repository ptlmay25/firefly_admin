import React from 'react'
import { Form } from 'react-bootstrap'
import classes from './CustomInput.module.css'


const CustomInput = (props) => {
    return (
        <Form.Group controlId={ props.field } className={ classes.CustomInput }>
            <Form.Label style={{ fontWeight: '450' }}>{ props.label }</Form.Label>
            <Form.Control 
                as={ props.inputType } 
                type={ props.type } 
                size="sm" 
                style={{ width: '200px' }} 
                value={ props.value }
                onChange={ props.onChange }
                required={ props.required } />
        </Form.Group>
    )
}

export default CustomInput
