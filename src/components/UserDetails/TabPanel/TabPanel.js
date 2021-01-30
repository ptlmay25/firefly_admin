import React from 'react'
import CustomTable from '../../Shared/CustomTable/CustomTable'
import Search from '../../Shared/Search/Search'
import classes from './TabPanel.module.css'

const TabPanel = (props) => {
    return (
        <div>
            <div className={classes.Header}>
                <h6>{ props.title } History</h6>
                <Search placeholder={ props.placeholder } onSearch={ props.onSearch } className={ classes.Search }/>
            </div>
            <CustomTable columns={ props.columns } data={ props.data }/>
        </div>
    )
}

export default TabPanel
