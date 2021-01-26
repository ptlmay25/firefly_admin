import { Input, DatePicker, InputNumber } from 'antd'
import React from 'react'

import classes from './InputDiv.module.css'

const InputDiv = (props) => {
    return (
        <div className={ classes.InputDiv }>
            <p style={{ fontWeight: '500' }}> { props.label }: </p>
            {   props.type === 'input' ? <Input placeholder={ props.placeholder } disabled={ props.disabled } style={{ width: '300px' }} /> : null  }
            {   props.type === "number" ? <InputNumber placeholder={ props.placeholder } disabled={ props.disabled } style={{ width: '300px' }}/> : null  }
            {   props.type === "month" ? <DatePicker picker="month" format="MM/YYYY" style={{ width: '300px' }}/> : null  }
            {   props.type === "date" ? <DatePicker format="DD/MM/YYYY" style={{ width: '300px' }}/> : null  }
        </div>
    )
}

export default InputDiv
