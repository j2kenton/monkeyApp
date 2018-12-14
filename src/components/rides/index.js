import React from 'react';
import rides from './../../hocs/rides';

const Rides = ({ ...props }) => {

  const setId = (id) => {
    props.onChange(id);
  };

  const renderRideItems = (props) => {

    return props.data.map((value, arrayIndex) => {

      const isActive = value.id === props.selection;
      const activeClassname = (isActive) ? "active" : "inactive";
      const className = `col-sm-6 col-md-3 ${activeClassname}`;

      return (
        <div key={arrayIndex} className={className} onClick={() => setId(value.id)} >
          <ul>
            <li>{value.zone.color}</li>
            <li>{value.zone.name}</li>
            <li>{value.name}</li>
            <li>{value.return_time}</li>
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
    <div className="container">
      <div className="row">
        { renderRideItems(props) }
      </div>
    </div>
  );
};

Rides.contextTypes = {
};

export default rides(Rides);
