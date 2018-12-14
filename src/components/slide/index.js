import React from 'react';
import slide from './../../hocs/slide';

import DetailsSection from '../reservation';
import Arrow from './../arrow';

const FULL_SHIFT_LEFT = -100;

const Slide = ({ ...props }) => {

  const incrementIndex = (increment) => {
    props.onChange(increment);
  };

  const translateValue = (props.overallIndex) * FULL_SHIFT_LEFT;

  const styles = {
    backgroundImage: `url(${props.properties.imageUrl})`,
    transform: `translateX(${translateValue}%)`
  };

  return (
    <div className="slide" style={styles} onMouseEnter={props.mouseEnterHandler} onMouseLeave={props.mouseLeaveHandler} >
      <DetailsSection properties={props.properties} />
      <Arrow direction="left" onChange={incrementIndex} />
      <Arrow direction="right" onChange={incrementIndex} />
    </div>
  );
};

Slide.contextTypes = {
};

export default slide(Slide);
