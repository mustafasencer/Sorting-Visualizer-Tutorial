import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms.js';
import {getQuickSortAnimations} from '../sortingAlgorithms.js';
import './SortingVisualizer.css';
import Button from 'react-bootstrap/Button';
import {Form} from 'react-bootstrap';
import {getBubbleSortAnimations, getHeapSortAnimations} from '../sortingAlgorithms';

// This is the main color of the array bars.
const PRIMARY_COLOR = '#282c34';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'yellow';

export default class SortingVisualizer extends React.Component {

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
        }, i * this.props.animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.props.animationSpeed);
      }
    }
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.props.array.array);
    this.changeAnimations(animations);
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.props.array.array);
    this.changeAnimations(animations);
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.props.array.array);
    this.changeAnimations(animations);
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.props.array.array);
    this.changeAnimations(animations);
  }

  render() {
    const {array} = this.props.array;

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
                  width: `${this.props.width}px`,
                }}>
                {this.props.width > 20 ?
                  <span className="spanHeight">{height}</span>
                  : <span>

                  </span>
                }
              </div>
            ))}
          </div>
        </Form>
        <Form className="button-container">
          <Button className="newArray"
                  onClick={() => this.props.resetArray(document.getElementById('noOfBarValue').innerHTML)}>Generate
            New Array</Button>
          <Button className="sortingAlg" onClick={() => this.mergeSort()}>Merge Sort</Button>
          <Button className="sortingAlg" onClick={() => this.quickSort()}>Quick Sort</Button>
          <Button className="sortingAlg" onClick={() => this.heapSort()}>Heap Sort</Button>
          <Button className="sortingAlg" onClick={() => this.bubbleSort()}>Bubble Sort</Button>
        </Form>
      </div>
    );
  }
}

