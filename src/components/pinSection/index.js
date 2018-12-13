import React from 'react';
import pinSection from './../../hocs/pinSection';
import Slide from './../slide';

const SCROLL_INTERVAL = 10000;
const SCROLL_INCREMENT = 1;

const PinSection = ({ ...props }) => {

  const setIndex = (index) => {
    props.onChange(index);
  };

  let incrementTimer;

  this.state = {
    pin: "JN-0000-1111-AG"
  };

  const clearTimer = () => {
    clearTimeout(incrementTimer);
  };

  const incrementIndex = (increment) => {
    const shiftForNegativeValues = props.data.length; // e.g. shift `-1` to `props.data.length - 1`
    const currentIndex = props.index;
    const newIndex = (currentIndex + increment + shiftForNegativeValues) % props.data.length;
    setIndex(newIndex);
    clearTimer();
  };

  const triggerTimedIncrement = () => {
    clearTimer();
    incrementTimer = setTimeout(()=> incrementIndex(SCROLL_INCREMENT), SCROLL_INTERVAL);
  };
  triggerTimedIncrement();

  const submitHandler = (e) => {
    e.preventDefault();
    props.onChange(this.state.pin);
  };

  const pinChangeHandler = (e) => {
    e.preventDefault();
    // this.state.pin = e.target.value;
  };

  return (
    <div {...props} className="pinSection" >
      <form className="form-inline">
        <div className="form-group mx-sm-3 mb-2">
          <input type="text" value={this.state.pin} onChange={pinChangeHandler} className="form-control" id="inputPin" placeholder="Pin" />
        </div>
        <button type="submit" className="btn btn-primary mb-2" onClick={submitHandler}>SUBMIT</button>
      </form>
    </div>
  );
};

PinSection.contextTypes = {
};

export default pinSection(PinSection);
