import React from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import './App.css';
import Toolbar from './Toolbar/Toolbar';

function App() {
  return (
    <div className="App">
      <div className="array-container">
        <Toolbar></Toolbar>
        <SortingVisualizer></SortingVisualizer>
      </div>
    </div>
  );
}

export default App;
