import React from 'react';
import pinSection from './../../hocs/pinSection';
// import Slide from './../slide';

// const SCROLL_INTERVAL = 10000;
// const SCROLL_INCREMENT = 1;

const PinSection = ({ ...props }) => {

  const setIndex = (index) => {
    props.onChange(index);
  };

  const state = {
    pin: "JN-0000-1111-AG"
  };

  this.submitHandler = (e) => {
    e.preventDefault();
    props.onChange(state.pin);
  };

  this.pinChangeHandler = (pin) => {
    state.pin = pin;
  };

  return (
    <div {...props} className="pinSection" >
      <form className="form-inline">
        <div className="form-group mx-sm-3 mb-2">
          <input
            type="text"
            value={state.pin}
            onChange={e => this.pinChangeHandler(e.target.value)}
            className="form-control"
            id="inputPin"
            placeholder="Pin"
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2" onClick={this.submitHandler}>SUBMIT</button>
      </form>
    </div>
  );
};

PinSection.contextTypes = {
};

export default pinSection(PinSection);
