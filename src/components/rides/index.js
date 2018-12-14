import React from 'react';
import rides from './../../hocs/rides';

const Rides = ({ ...props }) => {

  const setId = (id) => {
    props.onChange(id);
  };

  const convertTime = (time) => {
    const dateTime = new Date(time);
    return `${dateTime.getHours()}:${dateTime.getMinutes()}`;
  };

  const renderRideItems = (props) => {

    return props.data.map((value, arrayIndex) => {

      const isActive = value.id === props.selection;
      const activeClassname = (isActive) ? "active" : "inactive";
      const className = `ridePane col-sm-6 col-md-3 ${activeClassname}`;
      const styling =  (isActive) ? {"background-color": value.zone.color} : {};

      return (
        <div key={arrayIndex} className={className} style={styling} onClick={() => setId(value.id)} >
          <ul>
            <li style={{"background-color": value.zone.color}}>&nbsp;</li>
            <li>{value.zone.name}</li>
            <li>{value.name}</li>
            <li>{convertTime(value.return_time)}</li>
            <li>{value.remaining_tickets}</li>
          </ul>
        </div>
      )

    })
  };

  const rideStyles = {
    // transform: `translateX(-${rideShift}px)`,
  };

  return (
    <div className="row" style={rideStyles} {...props} >
      { renderRideItems(props) }
    </div>
  );
};

Rides.contextTypes = {
};

export default rides(Rides);
