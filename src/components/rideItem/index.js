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
  const isPartOfGroup = arrayIndex > -1;
  const colClasses = (isPartOfGroup) ? "col-sm-6 col-md-3" : "col-sm-6 col-md-4 offset-sm-3 offset-sm-4";
  const className = `ridePane ${colClasses} ${activeClassname}`;
  const styling =  (isActive) ? {"background-color": value.zone.color} : {};

  const timeIcon = ICONS_URI + "ico-03.png";
  const ticketIcon = ICONS_URI + "ico-01.png";

  return (
    <div key={arrayIndex} className={className} style={styling} onClick={() => setId(value.id)} >
      <div style={{"backgroundColor": value.zone.color}}>&nbsp;</div>
      <div>{value.zone.name}</div>
      <div>{value.name}</div>
      <div>
        <div>
          <i><img alt="icon" src={timeIcon} /></i>
          {convertTime(value.return_time)}
          </div>
        <div>
          <i><img alt="icon" src={ticketIcon} /></i>
          {value.remaining_tickets}
          </div>
      </div>
    </div>
  );
};

export default rideItem(RideItem);
