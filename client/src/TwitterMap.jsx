import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ScrollArea from 'react-scrollbar';
import Flexbox from 'flexbox-react';
import { Button } from 'reactstrap';
import TweetCarousel from './TweetCarousel'
import DonnyAndPence from './images/DonnyAndPence.jpg'

class TwitterMap extends Component {
    constructor(props){
        super(props)
        this.state = {
          response: '',
          modifiedTweetsArray: [],
          carouselTweets: "",
          loaded: false
        }
     
        this.handleTweets = this.handleTweets.bind(this)
    }

    objOfOpposites = {
        dems: "Gods",
        Democrats: "better politicians than me",
        Rigger: "Legit!",
        Fantastic: "Terrible",
        Russia: "Country that owns me (Russia)",
        Russian: "Country that owns me (Russia)",
        Kim: "Rocket Man",
        young: "Stupid",
        beautiful: "UGLY AF",
        spies: "Made up people",
        "Informants": "people doing their job",
        Crooked: "not as crooked as I am",
        failing: "Doing pretty well if i keep insulting them",
        Obama: "Big Man Barack"
    }

    brilliantTrumpQuotes = ["No one is as hot as my daughter, shes a real 10 - Trump"];

    truthisizeTweets (tweets) {
        let modifiedTweets = [];
        let modifiedTweet = [];

        tweets.forEach((tweet) => {
            tweet = tweet.split(' ')
            for (let i = 0; i < tweet.length -1; i++) {
                let modifiedWord;
                if (Object.keys(this.objOfOpposites).indexOf(tweet[i])>-1) {
                    modifiedWord = this.objOfOpposites[tweet[i]];
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
    this.setState({modifiedTweetsArray: modifiedTweets})

    this.setState({carouselTweets: this.state.modifiedTweetsArray.reduce((seed, currentItem, currentIndex, array) => {
        let carouselTweetObj = {};
            carouselTweetObj.tweet = currentItem;
            carouselTweetObj.index = currentIndex;
            carouselTweetObj.quote = this.brilliantTrumpQuotes[0];
            seed.push(carouselTweetObj)
            carouselTweetObj = {};

            return seed;
      }, []), loaded: true})
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
                <Button onClick={this.handleTweets} color="danger"> See Donny's Real Thoughts </Button>
            </div>
        );
    } else {
        return (
            <TweetCarousel tweets={this.state.carouselTweets} backgrounds={this.trumpGQShots} />
        );
      }
    }
}

export default TwitterMap;
