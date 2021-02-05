import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingSpinner = props => {
  return (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} style={{ marginTop: '150px' }}>
      { props.children }
    </Spin>
  ); 
};

export default LoadingSpinner;