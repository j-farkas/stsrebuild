import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './Hand.css';

export default function Hand(props) {
  function playCard(cardText, index){
    props.playCard(cardText, index);
  }


  return(
    <div className='Hand'>
      {props.cards.map((card, index) =>
        <div className={card.cost <=  props.player.energy ? 'available' : 'not'}
            onClick={()=>playCard(card.effects, index)}><Card enemybuffs = {props.enemybuffs} enemydebuffs = {props.enemydebuffs} playerbuffs = {props.playerbuffs} playerdebuffs = {props.playerdebuffs}cardInfo={card}></Card></div>
      )}
    </div>
  );
}

Hand.propTypes = {
  cards: PropTypes.array,
  playCard: PropTypes.func,
  player: PropTypes.object,
  playerbuffs: PropTypes.object,
  playerdebuffs: PropTypes.object,
  enemydebuffs: PropTypes.object
}
