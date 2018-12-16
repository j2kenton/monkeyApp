import React from 'react';
import rideItem from './../../hocs/rideItem';

const ICONS_URI = "./icons/";

const RideItem = ({ ...props }) => {

  const value = props.value;
  const arrayIndex = props.arrayIndex;

  const convertTime = (time) => {
    const dateTime = new Date(time);
    const hours = dateTime.getHours();
    let minutesString = dateTime.getMinutes() + "";
    minutesString = minutesString.padStart(2, "0"); // pad single digits with leading zero
    return `${hours}:${minutesString}`;
  };

  const setId = (id) => {
    props.onChange(id);
  };

  const isActive = value.id === props.selection;
  const activeClassname = (isActive) ? "active" : "inactive";
  const className = `ridePane col-sm-6 col-md-3 ${activeClassname}`;
  const styling =  (isActive) ? {"background-color": value.zone.color} : {};

  const iconUri = ICONS_URI + props.rideIcon;
  return (
    <div key={arrayIndex} className={className} style={styling} onClick={() => setId(value.id)} >
      <ul>
        <li style={{"backgroundColor": value.zone.color}}>&nbsp;</li>
        <li>{value.zone.name}</li>
        <li>{value.name}</li>
        <li>{convertTime(value.return_time)}</li>
        <li>{value.remaining_tickets}</li>
      </ul>
    </div>
  );
};

export default rideItem(RideItem);
