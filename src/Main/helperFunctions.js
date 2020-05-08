export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}

export function resetArray(numberOfArrayBars) {
  const array = [];
  for (let i = 0; i < numberOfArrayBars; i++) {
    array.push(randomIntFromInterval(this.minValue, this.maxValue));
  }
  this.setState({array});
  this.isSorted = false;
}
