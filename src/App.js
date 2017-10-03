import React, { Component } from 'react';
import logo from './logo.svg';

import SearchPlacesInput from './SearchPlacesInput';
import Map from './Map';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { place: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ place: e.target.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    console.log('this.state', this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SearchPlacesInput handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        <Map place={this.state.place}/>
      </div>
    );
  }
}

export default App;
