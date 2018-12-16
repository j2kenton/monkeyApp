import React from 'react';
import reservation from '../../hocs/reservation';
import InfoItem from "../infoItem";
import RideItem from "../rideItem";

const Reservation = ({ ...props }) => {

  return (
    <div className="reservation">
      <h1>The Jungle Fast Rider Service</h1>
      <InfoItem
        infoMsg="Thank you for using The Jungle&trade; FastRider ticket system - your access code is now ready!"
        infoIcon="ico-04.png"
      />

      <RideItem
        value={props.reservation.ride}
        arrayIndex={-1}
        onChange={()=>{}}
        selection={-1}
      />

    </div>
  );
};

export default reservation(Reservation);
