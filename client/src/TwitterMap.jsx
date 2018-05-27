import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class TwitterMap extends Component {
    constructor(props){
        super(props)
        this.state = {
          response: '',
          modifiedTweetsArray: [],
          loaded: false
        }
     
        this.handleTweets = this.handleTweets.bind(this)
      }

  truthisizeTweets (tweets) {
      const objOfOpposites = {
          dems: "Gods",
          Why: "poop",
          butt: "muncher"
      }
      let modifiedTweets = [];
      let modifiedTweet = [];

    tweets.forEach((tweet) => {
        tweet = tweet.split(' ')
        for (let i = 0; i < tweet.length -1; i++) {
            let modifiedWord;
            if (Object.keys(objOfOpposites).indexOf(tweet[i])>-1) {
                modifiedWord = objOfOpposites[tweet[i]];
                modifiedTweet.push(modifiedWord);
                modifiedWord = '';
            }
            else {
                modifiedTweet.push(tweet[i])
            }
        }
        modifiedTweets.push(modifiedTweet.join(" "))
        modifiedTweet = [];
    })
    this.setState({modifiedTweetsArray: modifiedTweets, loaded: true})
    console.log(this.state.modifiedTweetsArray, "Stateful modified tweets")
  }

  handleTweets(event) {
    event.preventDefault();
    axios.post('/tweetme')
    .then((res) => {
        this.setState({response: res.data})
    })
    .then(() => {
        this.truthisizeTweets(this.state.response)
    })
}


  render() {
    if(!this.state.loaded) {
        return (
            <div className="TwitterMap">
                <header className="TwitterMap-header">
                <img src={logo} className="TwitterMap-logo" alt="logo" />
                <h1 className="TwitterMap-title">PeepAD</h1>
                </header>
                <button onClick={this.handleTweets}> Create tweets </button>
            </div>
        );
    } else {
        return (
            <div className="TwitterMap">
                Poop
            </div>
        );
      }
    }
}

export default TwitterMap;
