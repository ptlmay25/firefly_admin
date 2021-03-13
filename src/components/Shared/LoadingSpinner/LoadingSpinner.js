import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingSpinner = props => {
  const SpinnerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      verticalAlign: 'middle',
  }

  return (
    <div style={ SpinnerStyle }>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} style={{ marginTop: '50px' }} tip="Loading...">
        { props.children }
      </Spin>
    </div>
  ); 
};

export default LoadingSpinner;