import React from 'react';
import rides from './../../hocs/rides';

const NUMBER_OF_ITEMS = 5;

const Rides = ({ ...props }) => {

  const setIndex = (index) => {
    props.onChange(index);
  };

  const renderRideItems = (props) => {

    let list = props.data;
    list.forEach(function(item, index){
      item.index = index;
    });

    let listWithDuplicates = list.concat(list, list);

    return listWithDuplicates.map((value, arrayIndex) => {

      const isActive = value.index === props.index;
      let className = (isActive) ? "active" : "inactive";
      className += " rideItem";

      return (
        <div key={arrayIndex} className={className} onClick={() => setIndex(value.index)} >
          <span className="rideText">{value.name}</span>
        </div>
      )

    })
  };

  // need to shift to central set of elements (so we have plenty of items on each side of us at all times)
  const windowWidth = window.innerWidth;
  const itemWidth = windowWidth / NUMBER_OF_ITEMS;
  // center by accounting for width of the (active and centered) item
  const shiftHalfItemWidth = (itemWidth / 2);
  // shift to correct position, so that active item is centered
  const shiftForEachItem = itemWidth * props.index;
  const rideShift = shiftForEachItem + windowWidth + shiftHalfItemWidth;

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
