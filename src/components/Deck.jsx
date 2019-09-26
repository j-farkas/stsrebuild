import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default function Hand(props) {


  return(
    <div className='Deck'>
      {props.cards.map((card, index) =>
        <div className='card${index}'><Card cardInfo={card}></Card></div>
      )}
    </div>
  );
}

Hand.propTypes = {
  cards: PropTypes.array
}
