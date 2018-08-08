import React, {Component} from 'react';
import { object, array } from 'prop-types';
import { Container, Row, Col, Table, Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import { calcRawModifier, calcAffinityModifier, calcElementDamage, calcRawDamage } from '../helper/calculatorHelpers'

class Calculator extends Component{
  constructor(props){
    super(props);
    this.handleCardDelete = this.handleCardDelete.bind(this);
  }

  state={
    rawDamage: 0,
    elementDamage: 0,
    totalDamage: 0,
    sharpness: 1,
    savedState: []
  };

  static propTypes = {  
    weapon: object,
    monster: array,
    skills: object
  }

  static defaultProps = {
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.savedState !== prevProps.savedState){
      let tempSavedState = [...this.state.savedState];
      tempSavedState.push(this.props.savedState);
      tempSavedState.map((tempSavedState, index) =>
        tempSavedState.index = index
      )
      this.setState({ savedState: tempSavedState })

      // this.setState({ savedState: [...this.state.savedState, this.props.savedState]})
    }

    // if(this.state.savedState !== prevState.savedState && this.state.savedState !== prevProps.savedState){
    //   let tempSavedState = [...this.props.savedState];
    //   tempSavedState.map((test, index) => 
    //     test.index = index + 1
    //   );
    //   this.setState({ savedState: tempSavedState });
    //   console.log(tempSavedState);
    //   console.log(this.state.savedState); 
    // }
  }

  renderCalculations = (monster) => {
    let rawModifier = calcRawModifier(this.props.skills);
    let affinityModifier = calcAffinityModifier(this.props.skills);

    let element = calcElementDamage(this.props.weapon, this.props.skills, monster, this.props.sharpness);
    let raw = calcRawDamage(this.props.weapon, this.props.skills, monster, this.props.sharpness, rawModifier, affinityModifier);

    return(
      <tr>
        <td>{monster.part}</td>
        <td>{raw}</td>
        <td>{element}</td>
      </tr>
    )
  }


  handleCardDelete = (event) => {
    // let tempArray = this.state.savedState.map((e, index) => {
    //   let elementCopy = Object.assign({}, e);
    //   e.index = index;
    //   return elementCopy;
    // })

    let tempArray = [...this.state.savedState];

    let index = tempArray.findIndex(i => i.index == event.target.value);

    // console.log(event.target.value);
    // console.log(index);
    // console.log(tempArray);
    tempArray.splice(index, 1);
    this.setState({ savedState: tempArray });
    // console.log(index);
  }

  renderSavedState = (savedState) => {
    return(
      <td>
        <Card>
          <CardTitle className="saved-state-card-title">
            {savedState.index}
            {savedState.weaponValue.weapon_name} vs. {savedState.monsterValue[0].name}
          </CardTitle>
          <Button color="danger" onClick={this.handleCardDelete} value={savedState.index}>X</Button>
          <CardBody>
            <Table>
              <tbody>
                <tr>
                  <th>Part</th>
                  <th>Raw</th>
                  <th>Element</th>
                  <th>Total</th>
                </tr>
                {savedState.monsterValue.map(this.renderSavedStateCalculations.bind(this, savedState))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </td>
    )
  }

  renderSavedStateCalculations = (savedState, monsterValue) => {
    // console.log(savedState);
    let rawModifier = calcRawModifier(savedState.skills);
    let affinityModifier = calcAffinityModifier(savedState.skills);

    let element = calcElementDamage(savedState.weaponValue, savedState.skills, monsterValue, savedState.weaponSharpness);
    let raw = calcRawDamage(savedState.weaponValue, savedState.skills, monsterValue, savedState.weaponSharpness, rawModifier, affinityModifier);
    return(
      <tr>
        <td>{monsterValue.part}</td>
        <td>{raw}</td>
        <td>{element}</td>
      </tr>
    );

    // return(<td>test</td>);
  }

  render(){
    const { savedState } = this.state;

    return(
      <Container>
        <Row>
          <Col>
            <Table className="calculator-table" size="sm">
              <tbody className="calculator-tbody">
                <tr className="calculator-header">
                  <th>Part</th>
                  <th>Raw</th>
                  <th>Element</th>
                  <th>Total</th>
                </tr>
                {this.props.monster.map(this.renderCalculations)}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table className="saved-table">
              <tr>
                {savedState.map(this.renderSavedState)}
              </tr>
            </Table>
          </Col>
        </Row>
      </Container>
      
    );
  }
}

export default Calculator;