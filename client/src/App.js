import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    weapons: [],
    weaponType: [],
    monsters: [],
    weaponValue: [],
    monsterValue: 'None'
  };

  componentDidMount() {
    this.getWeapons();
    this.getMonsters();
    this.getWeaponType();
  }

  getWeapons = _ => {
    fetch('http://localhost:3000/weapon')
      .then(response => response.json())
      .then(response => this.setState({ weapons: response.data }))
      .catch(err => console.error(err))
  }

  getWeaponType = _ => {
    fetch('http://localhost:3000/weapon-type')
      .then(response => response.json())
      .then(response => this.setState({ weaponType: response.data }))
      .catch(err => console.error(err))
  }

  getMonsters = _ => {
    fetch('http://localhost:3000/monster')
      .then(response => response.json())
      .then(response => this.setState({ monsters: response.data }))
      .catch(err => console.error(err))
  }

  renderWeapons = ({ weapon_id, weapon_name }) => <option key={weapon_id} id={weapon_id} value={weapon_id}>{weapon_name}</option>

  renderMonsters = ({ monster_id, name }) => <option key={monster_id} id ={monster_id} value={monster_id}>{name}</option>

  renderWeaponType = ({ weapon_list_id, name }) => <option key={weapon_list_id} id={weapon_list_id}>{name}</option>

  weaponTypeSelect = (event) => {
  	fetch('http://localhost:3000/weapon', {
  		method: 'POST',
  		headers: {
  			'Content-Type': 'application/json'
  		},
  		body: JSON.stringify({
  			class: event.target.value,
  		})
  	})
  	  .then(response => response.json())
  	  .then(response => this.setState({ weapons: response.data }))
  	  .catch(err => console.error(err))
  }

  weaponSelect = (event) => {
  	this.setState({
  		weaponValue: event.target.value
  	})
    fetch(`http://localhost:3000/weapon-select?id=` + event.target.value)
      .then(response => response.json())
      .then(response => this.setState({ weaponValue: response.data }))
      .catch(err => console.error(err))
  }

  monsterSelect = (event) => {
    this.setState({
      monsterValue: event.target.value
    })
  }

  render() {
    const { weapons } = this.state;
    const { monsters } = this.state;
    const { weaponValue } = this.state;
    const { monsterValue } = this.state;
    const { weaponType } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <select onChange={this.weaponTypeSelect}>
          	<option value="0">All</option>
          	{weaponType.map(this.renderWeaponType)}
          </select>
          <select onChange={this.weaponSelect}>
            <option value="None">None</option>
          	{weapons.map(this.renderWeapons)}
          </select>
          <select onChange={this.monsterSelect}>
            <option value="None">None</option>
            {monsters.map(this.renderMonsters)}
          </select>
        </p>
        <MonsterData wep={weaponValue[0]} mon={monsterValue}/>
      </div>
    );
  }
}


class MonsterData extends Component {
  state={
    hitzone: []
  }

  componentDidUpdate(prevProps){
    if(this.props.wep !== prevProps.wep || this.props.mon !== prevProps.mon){
      this.getHitZones(this.props.mon)
    }
  }

  getHitZones = (prop) => {
    fetch(`http://localhost:3000/hitzone?name=` + prop)
      .then(response => response.json())
      .then(response => this.setState({ hitzone: response.data }))
      .catch(err => console.error(err))
  }

  calcDamage = (sever, blunt, shot, fire, water, thunder, ice, dragon, stun) => {
    console.log(sever)
    if(this.props.wep == undefined){console.log("props fail!")}
    return <td>{sever}</td>
  }
  


  renderHitZones = ({ monster_part_id, name, part, sever, blunt, shot, fire, water, thunder, ice, dragon, stun}) =>
    <tbody>
    <tr key={monster_part_id}> 
      <td key={monster_part_id + 'part'}>{part}</td>
      <td key={monster_part_id + 'sever'}>{sever}</td>
      <td key={monster_part_id + 'blunt'}>{blunt}</td>
      <td key={monster_part_id + 'shot'}>{shot}</td>
      <td key={monster_part_id + 'fire'}>{fire}</td>
      <td key={monster_part_id + 'water'}>{water}</td>
      <td key={monster_part_id + 'thunder'}>{thunder}</td>
      <td key={monster_part_id + 'ice'}>{ice}</td>
      <td key={monster_part_id + 'dragon'}>{dragon}</td>
      <td key={monster_part_id + 'stun'}>{stun}</td>
    </tr>
    <tr>
      {this.calcDamage(sever, blunt, shot, fire, water, thunder,  ice, dragon, stun)}
    </tr>
    </tbody>
  

  render(){
    const { hitzone } = this.state;
    return(
	  <div>
      <p>{this.state.wep}</p>
	    <p>{this.props.mon}</p>
      <table>
        {hitzone.map(this.renderHitZones)}
      </table>
      
	  </div>
    );
  }
}

export default App;
