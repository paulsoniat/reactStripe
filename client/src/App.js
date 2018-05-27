import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TwitterMap from './TwitterMap';
import NameForm from './NameForm';
import gold from './images/gold.jpg'
 
class App extends Component {
  state = {
    response: ''
  };

  sectionStyle = {
    height: "800px",
    width: "900px",

    backgroundImage: `url(${gold})`
  };
  render() {
    
    //this should have all the logic besides the tweets
    return (
      
      <div className="App" style={this.sectionStyle}>
        <TwitterMap></TwitterMap>
      </div>
    );
  }
  
}

export default App;
