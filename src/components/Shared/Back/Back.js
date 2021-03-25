import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

import classes from './Back.module.css'

const Back = (props) => {
    return (
        <div className={ classes.LinkContainer } style={{ paddingLeft: props.padding || '100px' }}>
            <ArrowLeftOutlined style={{ fontSize: '12px', marginRight: '5px', verticalAlign: 'middle' }}/> 
            <Link to={ props.link } className={ classes.Link } >
                { props.text }
            </Link>
        </div>
    )
}

export default Back
