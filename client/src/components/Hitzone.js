import React, { Component } from 'react';
import {array} from 'prop-types';
import { Table } from 'reactstrap';
import './Hitzone.css';

class Hitzone extends Component{
  state={
    monster: [],
    data: false
  };

  static propTypes = {
    monster: array
  };

  static defaultProps = {
  };

  componentDidMount(){
  }

  componentDidUpdate(prevProps){
    if(this.props.monster !== prevProps.monster){
      this.setState({ data: true })
    }
  }


  renderHitZones = ({ monster_part_id, name, part, sever, blunt, shot, fire, water, thunder, ice, dragon, stun}) =>
    <tr key={monster_part_id + '-tr'}> 
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

  renderMonsterIcon = _ => {
    const monsterName = (this.props.monster[0].name).split(' ').join('_');
    const monsterIcon = "../images/" + monsterName + ".png"

    return(
      <img src={monsterIcon} className='monster-hitzone-icon' alt="Target Monster Logo"></img>
    )
  }

  render(){
    if(!this.state.data){
      return <div />
    }

    const { monster } = this.props;
    return(
      <div className = "hitzone">
        {this.renderMonsterIcon()}
        <h3> Hitzones</h3>
        <Table className = "hitzone-table" size="sm" striped responsive>
          <tbody>
            <tr className = "hitzone-header">
              <th>Body Part</th>
              <th>Sever</th>
              <th>Blunt</th>
              <th>Shot</th>
              <th>Fire</th>
              <th>Water</th>
              <th>Thunder</th>
              <th>Ice</th>
              <th>Dragon</th>
              <th>Stun</th>
            </tr>
            {monster.map(this.renderHitZones)}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Hitzone;