import React from 'react';
import pinSection from './../../hocs/pinSection';
// import Slide from './../slide';

const PinSection = ({ ...props }) => {

  this.submitHandler = (e) => {
    e.preventDefault();
    props.submissionHandler();
  };

  this.pinChangeHandler = (e) => {
    const newPin = e.target.value;
    props.onChange(newPin);
  };

  return (
    <div className="row" id="pinSection">
      <form className="form-inline">
        <div className="form-group">
          <input
            type="text"
            value={props.pin}
            onChange={this.pinChangeHandler}
            className="form-control"
            id="inputPin"
            placeholder="#PIN"
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn"
            onClick={this.submitHandler}
            disabled={!props.isInputValid}
          >SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

PinSection.contextTypes = {
};

export default pinSection(PinSection);
