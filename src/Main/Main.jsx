import React from 'react';
import Toolbar from './Toolbar/Toolbar';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import {randomIntFromInterval} from './helperFunctions';

// Change this value for the number of bars (value) in the array.
export const NUMBER_OF_ARRAY_BARS = 50;

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.width = 7;
    this.maxValue = 300;
    this.minValue = 5;
    this.animationSpeed = 2.0;
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray(NUMBER_OF_ARRAY_BARS);
  }

  resetArray(noOfArrayBars) {
    const array = [];
    this.width = 700 / noOfArrayBars;
    for (let i = 0; i < noOfArrayBars; i++) {
      array.push(randomIntFromInterval(this.minValue, this.maxValue));
    }
    this.setState({array});
  }

  handleAnimationSpeedChange(evt) {
    document.getElementById('animationSpeedValue').innerHTML = evt.target.value;
    this.animationSpeed = parseInt(evt.target.value);
  }


  render() {

    return (
      <div className="array-container">
        <Toolbar resetArray={this.resetArray.bind(this)}
                 handleAnimationSpeedChange={this.handleAnimationSpeedChange.bind(this)}/>
        <SortingVisualizer resetArray={this.resetArray.bind(this)}
                           array={this.state}
                           width={this.width}
                           animationSpeed={this.animationSpeed}
                           minValue={this.minValue}
                           maxValue={this.maxValue}/>
      </div>
    );
  }
}
