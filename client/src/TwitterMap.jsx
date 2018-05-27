import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class TwitterMap extends Component {
  state = {
    response: ''
  };
  componentDidMount() {
    this.callApi()
      /*.then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));*/
  }

  callApi () {
    axios.get('/tweetMe')
    .then((res) => {
        console.log(res, "this is user res");
    })   
  };

  handleTweets(event) {
    event.preventDefault();
    axios.post('/tweetme')
    .then((res) => {
        console.log(res, "this is user res");
    })   
}


  render() {
    return (
      <div className="TwitterMap">
        <header className="TwitterMap-header">
          <img src={logo} className="TwitterMap-logo" alt="logo" />
          <h1 className="TwitterMap-title">PeepAD</h1>
        </header>
        <button onClick={this.handleTweets}> Create tweets </button>
      </div>
    );
  }
}

export default TwitterMap;
