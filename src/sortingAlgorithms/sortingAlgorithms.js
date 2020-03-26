export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function quickSortHelper(mainArray, startIdx, endIdx, animations) {
  if (startIdx < endIdx) {
    let pi = doPartition(mainArray, startIdx, endIdx, animations);
    quickSortHelper(mainArray, startIdx, pi - 1, animations);
    quickSortHelper(mainArray, pi + 1, endIdx, animations);
  }
}

function heapSortHelper(mainArray, startIdx, endIdx, animations) {
  let length = mainArray.length;
  for (let i = length / 2 - 1; i >= 0; i--) {
    heapify(mainArray, length, i, animations);
  }
  for (let i = length - 1; i >= 0; i--) {
    animations.push([i, 0]);
    animations.push([i, 0]);
    animations.push([i, mainArray[0]]);
    animations.push([0, i]);
    animations.push([0, i]);
    animations.push([0, mainArray[i]]);
    let temp = mainArray[i];
    mainArray[i] = mainArray[0];
    mainArray[0] = temp;

    heapify(mainArray, i, 0, animations);
  }
}

function bubbleSortHelper(mainArray, startIdx, endIdx, animations) {
  let length = mainArray.length;
  for (let i = length / 2 - 1; i >= 0; i--) {
    heapify(mainArray, length, i, animations);
  }
  for (let i = length - 1; i >= 0; i--) {
    animations.push([i, 0]);
    animations.push([i, 0]);
    animations.push([i, mainArray[0]]);
    animations.push([0, i]);
    animations.push([0, i]);
    animations.push([0, mainArray[i]]);
    let temp = mainArray[i];
    mainArray[i] = mainArray[0];
    mainArray[0] = temp;

    heapify(mainArray, i, 0, animations);
  }
}

function doPartition(mainArray, startIdx, endIdx, animations) {
  let i = startIdx - 1;
  let pivot = mainArray[endIdx];
  for (let j = startIdx; j < endIdx; j++) {
    if (mainArray[j] < pivot) {
      i++;
      animations.push([i, j]);
      animations.push([i, j]);
      animations.push([i, mainArray[j]]);
      animations.push([j, i]);
      animations.push([j, i]);
      animations.push([j, mainArray[i]]);
      let temp = mainArray[i];
      mainArray[i] = mainArray[j];
      mainArray[j] = temp;
    }
  }
  i++;
  animations.push([i, endIdx]);
  animations.push([i, endIdx]);
  animations.push([i, mainArray[endIdx]]);
  animations.push([endIdx, i]);
  animations.push([endIdx, i]);
  animations.push([endIdx, mainArray[i]]);
  let temp = mainArray[i];
  mainArray[i] = mainArray[endIdx];
  mainArray[endIdx] = temp;
  return i;
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

function heapify(mainArray, length, i, animations) {
  let largest = i; // root
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < length && mainArray[largest] < mainArray[left]) {
    largest = left;
  }
  if (right < length && mainArray[largest] < mainArray[right]) {
    largest = right;
  }

  if (largest !== i) {
    animations.push([i, largest]);
    animations.push([i, largest]);
    animations.push([i, mainArray[largest]]);
    animations.push([largest, i]);
    animations.push([largest, i]);
    animations.push([largest, mainArray[i]]);
    let temp = mainArray[i];
    mainArray[i] = mainArray[largest];
    mainArray[largest] = temp;

    heapify(mainArray, length, largest, animations);
  }

}