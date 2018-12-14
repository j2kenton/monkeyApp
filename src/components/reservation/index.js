import React from 'react';
import reservation from '../../hocs/reservation';

const Reservation = ({ ...props }) => {

  return (
    <div className="reservation">
      <h1>The Jungle Fast Rider Service</h1>
      <div>Instructions</div>
      <ul>
        <li>{props.reservation.ride.name}</li>
        <li>{props.reservation.ride.zone.name}</li>
        <li>{props.reservation.return_time}</li>
        <li>{props.reservation.access_code}</li>
      </ul>
    </div>
  );
};

export default reservation(Reservation);
