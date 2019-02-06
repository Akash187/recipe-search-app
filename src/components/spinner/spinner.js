import React from 'react';
import { Spin } from 'antd';

const Spinner = ({cssClass}) => {
  return(
    <div className={cssClass}>
      <Spin size="large" tip="Loading..." />
    </div>
  )
};

export default Spinner;