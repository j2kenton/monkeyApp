import React from 'react';
import rides from './../../hocs/rides';
import RideItem from './../../components/rideItem';

const Rides = ({ ...props }) => {

  const renderRideItems = (props) => {

    return props.data.map((value, arrayIndex) => {
      return (
        <RideItem
          value={value}
          arrayIndex={arrayIndex}
          onChange={props.onChange}
          selection={props.selection}
        />
      )
    })
  };

  return (
    <div className="row" {...props} >
      { renderRideItems(props) }
    </div>
  );
};

export default rides(Rides);
