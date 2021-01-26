import React from 'react'
import { Table, Button } from 'antd';

function itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <Button>Previous</Button>;
    }
    if (type === 'next') {
      return <Button>Next</Button>;
    }
    return originalElement;
}

const CustomTable = (props) => {
    return (
       <div style={{ padding: '20px 10px'}}>
           <Table 
                columns={ props.columns }
                dataSource={ props.data }
                pagination={{ defaultPageSize: 5, itemRender: itemRender, showSizeChanger: true, pageSizeOptions: [5,10,20] }} 
                bordered
                rowSelection={ {...props.rowSelection} } />
       </div>
    )
}

export default CustomTable
