import React, { Component } from 'react';
import Home from './Home';
import Hand from './Hand';
import Enemy from './Enemy';
import Reward from './Reward';
import Header from './NavMenu';
import GameStart from './GameStart';
import Deck from './Deck';


export class GameController extends React.Component {

  constructor(props) {
    super(props);
    fetch('api/SampleData/Enemies/1')
      .then(response => response.json())
      .then(data => {
         console.log(data);
         this.setState({ nextEnemy: data});
         console.log(this.state);
         let deck = [];
         for(let i = 0; i < 5; i++){
           deck.push({id:1, name: "Strike", cost: 1, type: "Attack", effects: "6 damage", color: this.state.class, upgraded: 0, cardText: "Deal 6 damage"});
           deck.push({id:1, name: "Defend", cost: 1, type: "Skill", effects: "6 block", color: this.state.class, upgraded: 0, cardText: "Block 6 damage"});
         }
         this.setState ({ deck: this.shuffle(deck)});
         this.setState({hand: this.state.deck.slice(0,5)})
         this.setState({deck: this.state.deck.slice(5)});
         console.log(this.state);
        this.setState({loading: false});
        console.log(this.state);

      });

    this.state = {
      home: true,
      start: false,
      loading: true,
      nextEnemy: {},
      map: false,
      battle: false,
      reward: false,
      viewdeck: false,
      difficulty: 1,
      class: "Red",
      exhaust: [],
      playerdebuffs: {weak: 0, vuln: 0, frail: 0, demonform: 0},
      playerbuffs: {str: 0, dex: 0},
      enemybuffs: {str: 0, dex: 0},
      enemydebuffs: {weak: 0, vuln: 0, frail: 0, demonform: 0},
      deck: [],
      hand: [],
      discard: [],
      activeEnemy: {hp:12, nextAttack: ""},
      player: {hp:100, maxHP: 100, energy: 3, block: 0},
      rewards: []
      }

        this.handleSetHomeFalse = this.handleSetHomeFalse.bind(this);
        this.handleGameStart = this.handleGameStart.bind(this);
        this.endTurn = this.endTurn.bind(this);
        this.pickReward = this.pickReward.bind(this);
        this.useCard = this.useCard.bind(this);
        this.viewDeck = this.viewDeck.bind(this);
}

  handleSetHomeFalse() {
    this.setState({home: false, start: true});
  }

  handleGameStart(color) {
    this.setState({start: false, map: true});
  }

  viewDeck(){
    this.setState({viewdeck: !this.state.viewdeck});
  }

  pickReward(index){
    console.log(index);
    if(isNaN(index) === false){
      this.state.deck.push(this.state.rewards[index]);
    }
    this.state.player.energy = 3;
    this.setState({player: this.state.player})
    this.state.deck = this.shuffle( this.state.deck.concat(this.state.hand).concat(this.state.discard));
    this.setState({deck: this.state.deck.slice(5), hand: this.state.deck.slice(0,5), discard: [], rewards: []});
    this.setState({reward:false, map: true});
    console.log(this.state);
    fetch('api/SampleData/Enemies/'+this.state.difficulty)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({nextEnemy: data, difficulty: this.state.difficulty+1})

      })
      this.setState({playerdebuffs: {weak: 0, vuln: 0, frail: 0, demonform: 0},
      playerbuffs: {str: 0, dex: 0},
      enemybuffs: {str: 0, dex: 0},
      enemydebuffs: {weak: 0, vuln: 0, frail: 0, demonform: 0}})
  }

  restart(){
    this.setState({
      home: true,
      start: false,
      loading: true,
      nextEnemy: {},
      map: false,
      battle: false,
      reward: false,
      viewdeck: false,
      difficulty: 1,
      class: "Red",
      playerdebuffs: {weak: 0, vuln: 0, frail: 0, poison: 0},
      playerbuffs: {str: 0, dex: 0},
      enemybuffs: {str: 0, dex: 0},
      enemydebuffs: {weak: 0, vuln: 0, frail: 0, poison: 0},
      deck: [],
      hand: [],
      exhaust: [],
      discard: [],
      activeEnemy: {hp:12, nextAttack: ""},
      player: {hp:100, maxHP: 100, energy: 3, block: 0},
      rewards: [],
      gameOver: false
      })
      fetch('api/SampleData/Enemies/1')
        .then(response => response.json())
        .then(data => {
           console.log(data);
           this.setState({ nextEnemy: data});
           console.log(this.state);
           let deck = [];
           for(let i = 0; i < 5; i++){
             deck.push({id:1, name: "Strike", cost: 1, type: "Attack", effects: "6 damage", color: this.state.class, upgraded: 0, cardText: "Deal 6 damage"});
             deck.push({id:1, name: "Defend", cost: 1, type: "Skill", effects: "6 block", color: this.state.class, upgraded: 0, cardText: "Block 6 damage"});
           }
           this.setState ({ deck: this.shuffle(deck)});
           this.setState({hand: this.state.deck.slice(0,5)})
           this.setState({deck: this.state.deck.slice(5)});
          this.setState({loading: false});

        });
  }


  handleStartBattle(){
    this.setState({map:false, battle: true});
    fetch('api/SampleData/Rewards/'+this.state.difficulty)
      .then(response => response.json())
      .then(data => {
        data.forEach((el)=>{
          this.state.rewards.push(el)
        })
        this.state.rewards = this.shuffle(this.state.rewards);
        while(this.state.rewards.length > 3){
          this.state.rewards.pop();
        }
        this.setState({rewards: this.state.rewards});
        console.log(this.state);
        this.render();
      })
      this.state.activeEnemy.hp = this.state.nextEnemy.hp;
      this.state.activeEnemy.nextAttack = this.state.nextEnemy.attacks.split(',')[this.state.nextEnemy.attacks.split(',').length-1];
  }

  endTurn(number, effect, nextAttack){
    console.log(effect);
    console.log(number);
    this.state.player.energy = 3;
    if(effect === 'damage'){
      number = parseInt(number) + this.state.enemybuffs.str;
      if(this.state.playerdebuffs.vuln > 0){
        number = parseInt(number*1.5);
      }
      if(this.state.enemydebuffs.weak > 0){
        number = parseInt(number*.5);
      }
      if(this.state.player.block > number){
        this.state.player.block -= number;
      }else{
        this.state.player.hp -= (number-this.state.player.block);
      }
      this.setState({player: this.state.player})
    }else if(effect === 'demonform'){
      if(Object.keys(this.state.enemybuffs).includes('demonform') === true){
        this.state.enemybuffs.demonform += parseInt(number);
      }else{
        this.state.enemybuffs.demonform = parseInt(number);
      }
        this.setState({enemydebuffs: this.state.enemydebuffs});
    }else{
      console.log(effect);
      this.state.playerdebuffs[effect] += parseInt(number);
      this.setState({playerdebuffs: this.state.playerdebuffs});
      }
      //end of turn effects

      Object.keys(this.state.playerdebuffs).forEach((el)=>{
      if(this.state.playerdebuffs[el] > 0){
      this.state.playerdebuffs[el]--;
      }
      if(this.state.enemydebuffs[el] > 0){
      this.state.enemydebuffs[el]--;
      }
    })
      // if(this.state.playerdebuffs.vuln > 0){
      //   this.state.playerdebuffs.vuln--;
      // }
      // if(this.state.playerdebuffs.weak > 0){
      //   this.state.playerdebuffs.weak--;
      // }
      // if(this.state.enemydebuffs.vuln > 0){
      //   this.state.enemydebuffs.vuln--;
      // }
      // if(this.state.enemydebuffs.weak > 0){
      //   this.state.enemydebuffs.weak--;
      // }
      // if(this.state.playerdebuffs.frail > 0){
      //   this.state.playerdebuffs.frail--;
      // }
      if(this.state.playerbuffs.demonform > 0){
        this.state.playerbuffs.str+=this.state.playerbuffs.demonform;
      }
      if(this.state.enemybuffs.demonform > 0){
        this.state.enemybuffs.str+=this.state.enemybuffs.demonform;
      }
      this.setState({playerdebuffs: this.state.playerdebuffs, playerbuffs: this.state.playerbuffs, enemybuffs: this.state.enemybuffs, enemydebuffs: this.state.enemydebuffs})


    let activeEnemy = this.state.activeEnemy;
    activeEnemy.nextAttack = nextAttack;
    this.setState({activeEnemy: activeEnemy})
    while(this.state.hand.length > 0){
      this.state.discard.push(this.state.hand.pop());
    }
    this.setState({discard: this.state.discard});
    while(this.state.discard.length > 0){
        this.state.deck.push(this.state.discard.pop())
    }
    console.log(this.state);
    while(this.state.hand.length < 5){
      this.state.hand.push(this.state.deck.shift());
      console.log(this.state.deck);
      this.setState({hand: this.state.hand, deck: this.state.deck });
      console.log(this.state.deck);
    }
    // this.render();
    this.setState({discard: []});
    this.state.player.block = 0;
    this.setState({player: this.state.player})
    if(this.state.player.hp <= 0){
      //You died
      this.setState({gameOver: true});
    }
  }

  useCard(cardText, index){
    if(this.state.player.energy >= this.state.hand[index].cost){
      let effects = cardText.split(',');
      effects.forEach((el)=>{
        let value = parseInt(el.split(' ')[0]);
        let type = el.split(' ')[1];
        console.log(el);
        switch(type){
          case 'damage':
          if(this.state.enemydebuffs.vuln > 0){
            value = parseInt(value * 1.5);
          }
          if(this.state.playerdebuffs.weak > 0){
            value = parseInt(value * .5);
            console.log(value);
          }

            this.state.activeEnemy.hp -= value+this.state.playerbuffs.str;
            this.setState({activeEnemy: this.state.activeEnemy});
            if(this.state.activeEnemy.hp <= 0){
              this.setState({battle: false, reward: true})
            }
          break;
          case 'block':
          if(this.state.playerdebuffs.frail > 0){
            value = parseInt(value * .5);
          }
            this.state.player.block += value;
            this.setState({player: this.state.player})
          break;
          case 'draw':
          for(let i = 0; i < value; i++){
            this.state.hand.push(this.state.deck.shift());
            this.setState({hand: this.state.hand, deck: this.state.deck})
          }
          break;
          case 'demonform':
          if(this.state.playerbuffs.demonform > 0){
            this.state.playerbuffs.demonform+=value;
          }else{
            this.state.playerbuffs.demonform=value;
          }
            this.setState({playerbuffs: this.state.playerbuffs});
          break;
          case 'energy':
            this.state.player.energy += value;
            this.setState({player: this.state.player});
          break;
          case 'selfdamage':
              this.state.player.hp -= value;
              this.setState({player: this.state.player});
          break;
          default:
          if(this.state.enemydebuffs > 0){
            this.state.enemydebuffs[type] += value;
          }else{
            this.state.enemydebuffs[type] = value;
          }

        }
      }
    )
      console.log(effects);
      this.state.player.energy -= this.state.hand[index].cost;
      this.setState({player: this.state.player});
      this.state.discard.push(this.state.hand[index]);
      this.setState({discard: this.state.discard})
      this.setState({hand: this.state.hand.slice(0,index).concat(this.state.hand.slice(index+1))})
    }
  }

  shuffle(deck) {
    var i = 0;
    var j = 0;
    var temp = null;
    for (i = deck.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
    return deck;
  }


  render(){
    console.log(this.state);
    console.log(window.location.href.split('/'))
    if(this.state.home === true) {
      return(
        <div>
          <Home setHome={this.handleSetHomeFalse} />
        </div>
      )
    }if(this.state.gameOver === true){
      return(
        <div className="page">You Died<button onClick={()=>this.restart()}>Start over</button>
        </div>
      );
    }
    if(this.state.viewdeck === true){
      return(
        <div className="page"><Header player={this.state.player} viewDeck ={this.viewDeck}></Header>
          <Deck cards={this.state.deck.concat(this.state.hand).concat(this.state.discard)}></Deck>
        </div>
      );
    }
    if(this.state.start === true){
      return(
        <div>
          <GameStart GameStart={this.handleGameStart} />
        </div>
      )
    }
    if(this.state.loading === true){
      return(
        <div>Loading..</div>

      )
    }if(this.state.map === true){
      return(
        <div><h1>The Map!</h1><h1 onClick={()=>this.handleStartBattle()}>🦑</h1></div>
      )
    }if(this.state.battle === true){
      return(
        <div className="page"><Header player={this.state.player} viewDeck = {this.viewDeck}></Header>
          <Enemy enemy={this.state.nextEnemy} enemybuffs = {this.state.enemybuffs} enemydebuffs = {this.state.enemydebuffs} playerbuffs = {this.state.playerbuffs} playerdebuffs = {this.state.playerdebuffs} endTurn = {this.endTurn} activeEnemy={this.state.activeEnemy}></Enemy>
          <Hand  enemybuffs = {this.state.enemybuffs} enemydebuffs = {this.state.enemydebuffs} playerbuffs = {this.state.playerbuffs} playerdebuffs = {this.state.playerdebuffs} cards={this.state.hand} useCard = {this.useCard} player = {this.state.player}></Hand>
        </div>
      );
    }if(this.state.reward === true){
      return(
        <div className="page"><Header player={this.state.player} viewDeck = {this.viewDeck}></Header>
          <Reward cards={this.state.rewards} pickReward = {this.pickReward}></Reward>
        </div>
      );
    }

  }
}
