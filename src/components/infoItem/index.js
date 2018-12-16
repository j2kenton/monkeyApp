import React from 'react';
import infoItem from './../../hocs/infoItem';

const ICONS_URI = "./icons/";

const InfoItem = ({ ...props }) => {

  const iconUri = ICONS_URI + props.infoIcon;
  return (
    <div className="infoItem">
      <i><img alt="icon" src={iconUri} /></i>
      <p>{props.infoMsg}</p>
    </div>
  );
};

export default infoItem(InfoItem);
