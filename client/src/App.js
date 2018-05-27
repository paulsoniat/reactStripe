import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TwitterMap from './TwitterMap';
import NameForm from './NameForm';

 
class App extends Component {
  state = {
    response: ''
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">PeepAD</h1>
        </header>
        <TwitterMap></TwitterMap>
      </div>
    );
  }
}

export default App;
