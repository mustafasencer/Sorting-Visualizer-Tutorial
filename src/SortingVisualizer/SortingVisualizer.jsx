import React from 'react';
import {getMergeSortAnimations} from '../Main/sortingAlgorithms.js';
import {getQuickSortAnimations} from '../Main/sortingAlgorithms.js';
import './SortingVisualizer.css';
import Button from 'react-bootstrap/Button';
import {Form, Nav, Navbar} from 'react-bootstrap';
import {getBubbleSortAnimations, getHeapSortAnimations} from '../Main/sortingAlgorithms';
import {randomIntFromInterval} from '../Main/helperFunctions.js'

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 2;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 50;

// This is the main color of the array bars.
const PRIMARY_COLOR = "#282c34";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'yellow';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.isSorted = false;
    this.width = 6;
    this.maxValue = 300;
    this.minValue = 5;
    this.state = {
      array: [],
    };
    this.executors = {
      'merge': this.mergeSort.bind(this),
      'quick': this.quickSort.bind(this),
      'heap': this.heapSort.bind(this),
      'bubble': this.bubbleSort.bind(this),
    };
  }

  componentDidMount() {
    this.resetArray(NUMBER_OF_ARRAY_BARS);
  }

  resetArray(noOfArrayBars) {
    const array = [];
    this.width = 500 / noOfArrayBars;
    for (let i = 0; i < noOfArrayBars; i++) {
      array.push(randomIntFromInterval(this.minValue, this.maxValue));
    }
    this.setState({array});
    this.isSorted = false;
  }

  changeAnimations(animations) {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    console.log(animations.length);
    this.isSorted = true;
  }

  sort(type) {
    if (!this.isSorted) {
      this.executors[type]();
    }
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    this.changeAnimations(animations);
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    this.changeAnimations(animations);
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    this.changeAnimations(animations);
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    this.changeAnimations(animations);
  }

  render() {
    const {array} = this.state;
    const isRunning = false;

    return (
      <div className="array-container">
        <Form className="array-form">
          <div className="array-bar-wrapper"
               style={{height: `${this.maxValue}px`}}>
            {array.map((height, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  opacity: 0.5,
                  height: `${height}px`,
                  width: `${this.width}px`
                }}>
                {this.width > 25 ?
                  <span className="spanHeight">{height}</span>
                  : <span></span>
                }
              </div>
            ))}
          </div>
        </Form>
        <Form className="button-container">
          <Button className="newArray" onClick={() => this.resetArray(document.getElementById("value").innerHTML)}>Generate New Array</Button>
          <Button className="sortingAlg" onClick={() => this.sort('merge')}>Merge Sort</Button>
          <Button className="sortingAlg"  onClick={() => this.sort('quick')}>Quick Sort</Button>
          <Button className="sortingAlg"  onClick={() => this.sort('heap')}>Heap Sort</Button>
          <Button className="sortingAlg"  onClick={() => this.sort('bubble')}>Bubble Sort</Button>
        </Form>
      </div>
    );
  }
}

