import React from 'react';
import errorSection from './../../hocs/errorSection';

const ErrorSection = ({ ...props }) => {

  const alertClass = (props.errorMsg) ? "alert-danger" : "alert-success";
  const classes = `alert ${alertClass}`;

  return (
    <div className="row" id="errorSection">
      <div className={classes} >
        <span>{props.errorMsg}</span>
      </div>
    </div>
  );
};

export default errorSection(ErrorSection);
