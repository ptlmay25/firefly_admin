import React from 'react'

const UserDetail = (props) => {
    return (
        <tr>
            <td style={{ fontWeight: '400' }}> { props.field }: </td>
            <td style={{ fontWeight: '400' }}> { props.value } </td>
        </tr>
    )
}

export default UserDetail
