import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import classes from './NavigationBar.module.css'

const NavigationBar = (props) => {

    const logout = () => {
        props.onAuthEnd()
    }

    return (
        <div className={ classes.NavigationBar }>
            <NavLink to="/admin2050/dash" className={ classes.Link }>Home</NavLink>
            <NavLink to="/logout" className={ classes.Link } onClick={() => logout()}>Logout</NavLink>
        </div>
    )
}

const mapDispatchtoProps = dispatch => {
    return {
        onAuthEnd: () => dispatch(actions.authEnd()),
    }
}

export default connect(null, mapDispatchtoProps)(NavigationBar)
