import React from 'react';
import errorSection from './../../hocs/errorSection';

const ErrorSection = ({ ...props }) => {

  return (
    <div className="row" id="errorSection">
      <p>{props.errorMsg}</p>
    </div>
  );
};

export default errorSection(ErrorSection);
