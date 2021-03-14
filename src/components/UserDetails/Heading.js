import React from 'react'

const Heading = (props) => {
    return (
        <>
            <hr></hr>
                <h5 style={{ paddingLeft: '10px'}}>{ props.title } Details</h5>
            <hr></hr>
        </>
    )
}

export default Heading
