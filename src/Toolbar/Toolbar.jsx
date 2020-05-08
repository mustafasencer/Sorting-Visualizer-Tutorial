import React from 'react';
import {Form, Nav, Navbar} from 'react-bootstrap';
import "./Toolbar.css"


export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // this.resetArray = this.resetArray.bind(this);
  }

  componentDidMount() {
    document.getElementsByClassName("slider").value = 50;
    document.getElementById("value").innerHTML = "50";
  }

  handleChange(evt) {
    document.getElementById("value").innerHTML = evt.target.value;
    // this.resetArray(evt.target.value);
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
                className="slider"
                type="range"
                min="5"
                max="200"
                disabled={isRunning ? 'disabled' : null}
                onChange={this.handleChange}
              />
              <p>Value: <span id="value">

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
