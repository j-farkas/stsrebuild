import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export default function Card(props) {
  return(
    <div className= {props.cardInfo.type}>
      <h6>{props.cardInfo.name} - {props.cardInfo.cardText}</h6>
      <h6>Energy cost:{props.cardInfo.cost}</h6>

    </div>
  );
}

Card.propTypes = {
  cardInfo: PropTypes.object,
  playerbuffs: PropTypes.object,
  playerdebuffs: PropTypes.object,
  enemydebuffs: PropTypes.object
}
