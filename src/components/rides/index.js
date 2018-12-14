import React from 'react';
import rides from './../../hocs/rides';

const Rides = ({ ...props }) => {

  const setIndex = (index) => {
    props.onChange(index);
  };

  let state = {
    selection: 11
  };

  const renderRideItems = (props) => {

    return props.data.map((value, arrayIndex) => {

      const isActive = value.id === state.selection;
      const activeClassname = (isActive) ? "active" : "inactive";
      const className = `rideItem ${activeClassname}`;

      return (
        <div key={arrayIndex} className={className} onClick={() => setIndex(value.index)} >
          <span className="rideText">{value.name}</span>
        </div>
      )

    })
  };

  const rideStyles = {
    // transform: `translateX(-${rideShift}px)`,
  };

  return (
    <div style={rideStyles} {...props} >
      { renderRideItems(props) }
    </div>
  );
};

Rides.contextTypes = {
};

export default rides(Rides);
