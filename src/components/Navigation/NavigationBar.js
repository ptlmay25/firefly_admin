import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavigationBar.module.css'

const NavigationBar = () => {
    return (
        <div className={ classes.NavigationBar }>
            <NavLink to="/" className={ classes.Link }>Home</NavLink>
            <NavLink to="/logout" className={ classes.Link }>Logout</NavLink>
        </div>
    )
}

export default NavigationBar
