import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import classes from './NavigationBar.module.css'

const NavigationBar = (props) => {
    return (
        <div className={ classes.NavigationBar }>
            <NavLink to="/dash" className={ classes.Link }>Home</NavLink>
            <NavLink to="/logout" className={ classes.Link } onClick={() => props.onAuthEnd()}>Logout</NavLink>
        </div>
    )
}

const mapDispatchtoProps = dispatch => {
    return {
        onAuthEnd: () => dispatch(actions.authEnd()),
    }
}

export default connect(null, mapDispatchtoProps)(NavigationBar)
