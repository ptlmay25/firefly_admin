import React from 'react'
import { Radio } from 'antd'

const RadioGroup = (props) => {
    return (
        <Radio.Group as="div" value= { props.selectedTable } >
            <Radio.Button 
                value="withdraw" 
                onClick={ () => props.setSelectedTable('withdraw') } 
                style={{ marginRight: '15px' }}>
                    Withdraw History
            </Radio.Button>
            <Radio.Button 
                value="purchase" 
                onClick={ () => props.setSelectedTable('purchase') }
                style={{ marginRight: '15px' }}>
                    Purchase History
            </Radio.Button>
            <Radio.Button 
                value="selling" 
                onClick={ () => props.setSelectedTable('selling') }
                style={{ marginRight: '15px' }}>
                    Selling History
            </Radio.Button>
        </Radio.Group>
    )
}

export default RadioGroup
