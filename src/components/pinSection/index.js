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

  const renderSlides = (props) => {
    let list = props.data.slice();
    list.forEach(function(item, index){
      item.index = index;
    });
    return list.map((value) => {
      return (
        <Slide 
          key={value.index} 
          properties={value} 
          overallIndex={props.index} 
          onChange={incrementIndex}
          mouseEnterHandler={clearTimer}
          mouseLeaveHandler={triggerTimedIncrement}
        />
      )
    })
  };

  return (
    <div {...props} className="pinSection" >
      <form className="form-inline">
        <div className="form-group mx-sm-3 mb-2">
          <input type="text" className="form-control" id="inputPin" placeholder="Pin" />
        </div>
        <button type="submit" className="btn btn-primary mb-2">SUBMIT</button>
      </form>
    </div>
  );
};

PinSection.contextTypes = {
};

export default pinSection(PinSection);
