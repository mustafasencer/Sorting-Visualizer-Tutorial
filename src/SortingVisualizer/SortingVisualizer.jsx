import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getQuickSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
import Button from 'react-bootstrap/Button';
import {Form, FormControl, Nav, Navbar} from 'react-bootstrap';
import {getBubbleSortAnimations, getHeapSortAnimations} from '../sortingAlgorithms/sortingAlgorithms';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 2;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 50;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'blue';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.isSorted = false;
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
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
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

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Sorting Algorithms Visualizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Form className="array-form">
          <div className="array-bar-wrapper" style={{height: `${this.maxValue}px`}}>
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                }}></div>
            ))}
          </div>
        </Form>
        <Form className="button-container">
          <Button variant={'primary'} onClick={() => this.resetArray()}>Generate New Array</Button>
          <Button variant={'success'} onClick={() => this.sort('merge')}>Merge Sort</Button>
          <Button variant={'success'} onClick={() => this.sort('quick')}>Quick Sort</Button>
          <Button variant={'success'} onClick={() => this.sort('heap')}>Heap Sort</Button>
          <Button variant={'success'} onClick={() => this.sort('bubble')}>Bubble Sort</Button>
          <Button variant={'danger'} onClick={() => this.testSortingAlgorithms()}>
            Test Sorting Algorithms (BROKEN)
          </Button>
        </Form>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
