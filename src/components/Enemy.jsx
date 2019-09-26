import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function Enemy(props) {
  function endTurn(effect, number){
    props.endTurn(effect, number, attacks[Math.floor((Math.random() * (attacks.length-1)+1))])
  }

  let attacks = props.enemy.attacks.split(',');
  let random = false;
  console.log(props.activeEnemy.nextAttack.split(' ')[2]);
  if(attacks[0] === 'random'){
    random = true;
  }
  console.log(parseInt(props.activeEnemy.nextAttack.split(' ')[1])+props.enemybuffs.str+ ' ' + props.activeEnemy.nextAttack.split(' ')[2]);
  let modifier = 1;
  if(props.enemydebuffs.weak > 0){
    modifier = modifier * .5;
  }
  if(props.playerdebuffs.vuln > 0){
    modifier = modifier * 1.5;
  }
  if(props.activeEnemy.nextAttack.split(' ')[2] === 'damage'){

      return(
        <div className='Enemy'>
          <h3>Enemy's Next Attack: {(parseInt(props.activeEnemy.nextAttack.split(' ')[1])+props.enemybuffs.str)*modifier} {props.activeEnemy.nextAttack.split(' ')[2]}<br></br> HP remaining: {props.activeEnemy.hp}<br></br>Vulnerability: {props.enemydebuffs.vuln} Weakness: {props.enemydebuffs.weak}</h3>
          <button onClick ={()=>endTurn(props.activeEnemy.nextAttack.split(' ')[1], props.activeEnemy.nextAttack.split(' ')[2])}>End Turn</button><br></br>
          <h4>Player status:<br></br>Strength: {props.playerbuffs.str}<br></br>Vulnerability: {props.playerdebuffs.vuln} Weakness: {props.playerdebuffs.weak} Frailty: {props.playerdebuffs.frail}</h4>
        </div>
      );
    }

  return(
    <div className='Enemy'>
      <h3>Enemy's Next Attack will apply: {props.activeEnemy.nextAttack.split(' ')[1]} {props.activeEnemy.nextAttack.split(' ')[2]} <br></br>HP remaining: {props.activeEnemy.hp}<br></br>Vulnerability: {props.enemydebuffs.vuln} Weakness: {props.enemydebuffs.weak}</h3>
      <button onClick ={()=>endTurn(props.activeEnemy.nextAttack.split(' ')[1], props.activeEnemy.nextAttack.split(' ')[2])}>End Turn</button><br></br>
      <h4>Player status:<br></br>Strength: {props.playerbuffs.str}<br></br>Vulnerability: {props.playerdebuffs.vuln} Weakness: {props.playerdebuffs.weak} Frailty: {props.playerdebuffs.frail}</h4>
    </div>
  );
}

Enemy.propTypes = {
  enemy: PropTypes.object,
  activeEnemy: PropTypes.object,
  endTurn: PropTypes.func,
  enemybuffs: PropTypes.object,
  enemydebuffs: PropTypes.object,
  playerbuffs: PropTypes.object,
  playerdebuffs: PropTypes.object,
}
