import React from 'react'
import { Input } from 'antd'

const Search = (props) => {
    const divStyle = {
        display: 'flex',
        justifyContent: 'start'
    }

    const inputStyle = { 
        width: '250px', 
        height: '35px', 
        marginLeft: '20px', 
        marginTop: '-10px'
    }

    return (
        <div style={ divStyle }>
            <p>Search: </p>
            <Input placeholder={props.placeholder} style={ inputStyle } onChange={ props.onSearch } size="small" />
        </div>
    )
}

export default Search
