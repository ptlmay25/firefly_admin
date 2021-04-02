import React from 'react'
import { Table } from 'antd';
import classes from './CustomTable.module.css';
import { itemRender } from '../../../resources/Utilities'


const CustomTable = (props) => {
    return (
       <div style={{ padding: '10px 10px'}}>
           <Table 
              columns={ props.columns }
              dataSource={ props.data }
              pagination={{ defaultPageSize: 5, itemRender: itemRender, showSizeChanger: true, pageSizeOptions: [5,10,20] }} 
              scroll={ props.scroll }
              bordered
              rowClassName={ classes.Row } />
       </div>
    )
}

export default CustomTable
