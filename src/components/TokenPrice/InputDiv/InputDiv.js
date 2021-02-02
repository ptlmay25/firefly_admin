import { DatePicker, InputNumber } from 'antd'
import React from 'react'

import classes from './InputDiv.module.css'

const InputDiv = (props) => {
    return (
        <div className={ classes.InputDiv }>
            <p style={{ fontWeight: '500' }}> { props.label }: </p>
            {   props.type === "number" 
                ? <InputNumber placeholder={ props.placeholder } disabled={ props.disabled } required={ props.required } style={{ width: '300px' }} value={props.value} onChange={ props.onChange } /> 
                : null  
            }
            {   props.type === "month" 
                ? <DatePicker picker="month" format="MM/YYYY" style={{ width: '300px' }} required={ props.required } selected={ props.value } onChange={ props.onChange }/> 
                : null  
            }
            {   props.type === "date" 
                ? <DatePicker format="DD/MM/YYYY" style={{ width: '300px' }} required={ props.required } selected={ props.value } onChange={ props.onChange }/> 
                : null  
            }
        </div>
    )
}

export default InputDiv
