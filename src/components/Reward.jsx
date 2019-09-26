import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default function Reward(props) {
  function pickReward(index){
    props.pickReward(index);
  }
  console.log(props);
  return(
    <div className='Reward'>
    {props.cards.map((card, index) =>
      <div onClick={()=>pickReward(index)}className='card${index}'><Card cardInfo={card}></Card></div>
    )}
    <div onClick={()=>pickReward('none')}className='card${index}'>Pick None</div>
    </div>
  );
}

Reward.propTypes = {
  cards: PropTypes.array,
  pickReward: PropTypes.func
}
