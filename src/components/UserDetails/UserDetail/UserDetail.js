import React from 'react'

const UserDetail = (props) => {
    return (
        <tr>
            <td> { props.field }: </td>
            <td> { props.value } </td>
        </tr>
    )
}

export default UserDetail
