import React from 'react'
import { Table } from 'react-bootstrap'

import TableHeader from '../../Shared/TableHeader'


const CustomTable = (props) => {
    return (
        <React.Fragment>
        <h5 style={{ marginBottom: '30px', paddingLeft: '20px' }}><u> { props.heading } </u></h5> 
            <Table responsive="sm" bordered>
                <TableHeader headers={ props.headers } />
                <tbody>
                    <tr>
                        
                    </tr>
                </tbody>
            </Table>
        </React.Fragment>
    )
}

export default CustomTable
