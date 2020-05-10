import React from 'react';
import {Form, Nav, Navbar} from 'react-bootstrap';
import './Toolbar.css';


export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);
    this.handleNoOfBarChange = this.handleNoOfBarChange.bind(this);
  }

  componentDidMount() {
    document.getElementById('sliderAnimationSpeed').value = 10;
    document.getElementById('sliderNoOfBars').value = 50;
    document.getElementById('noOfBarValue').innerHTML = '50';
    document.getElementById('animationSpeedValue').innerHTML = '10';
  }

  handleNoOfBarChange(evt) {
    document.getElementById('noOfBarValue').innerHTML = evt.target.value;
    this.props.resetArray(evt.target.value);
  }

  render() {
    const isRunning = false;

    return (
      <Navbar className="color-nav" variant="light">
        <Navbar.Brand href="#home">Sorting Algorithms Visualizer</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <div className="separator">

            </div>
            <div className="sliderContainer">
              <input
                id="sliderNoOfBars"
                type="range"
                min="5"
                max="200"
                step="1"
                disabled={isRunning ? 'disabled' : null}
                onChange={this.handleNoOfBarChange}
              />
              <p>Number of Bars: <span id="noOfBarValue">

              </span>
              </p>
            </div>
            <div className="separator">

            </div>
            <div className="sliderContainer">
              <input
                id="sliderAnimationSpeed"
                type="range"
                min="0"
                max="50"
                step="1"
                disabled={isRunning ? 'disabled' : null}
                onChange={this.props.handleAnimationSpeedChange}
              />
              <p>Animation Speed: <span id="animationSpeedValue">

              </span>
              </p>
            </div>
          </Nav>
          <Form inline>
              <span>Updated by&nbsp;
                <a href="https://github.com/mustafasencer"
                   target="_blank" rel="noopener noreferrer">mustafasencer</a>
              </span>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
