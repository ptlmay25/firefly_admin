import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = props => {
    const content = (
        <div className="backdrop" onClick={props.onClick} />
    )
    return ReactDOM.createPortal(content, document.getElementById('backdrop'));
};

export default Backdrop;
