import React from 'react';
import reservation from '../../hocs/reservation';
import InfoItem from "../infoItem";

const Reservation = ({ ...props }) => {

  return (
    <div className="reservation">
      <h1>The Jungle Fast Rider Service</h1>
      <InfoItem
        infoMsg="Thank you for using The Jungle&trade; FastRider ticket system - your access code is now ready!"
        infoIcon="ico-04.png"
      />
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
