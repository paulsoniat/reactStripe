import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import gold from './images/gold.jpg'

class TweetCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeIndex: 0, 
      trumpGQShots: ['https://upload.wikimedia.org/wikipedia/commons/3/36/Donald_Trump_and_Mike_Pence_-_Caricature.jpg', 'https://www.askideas.com/media/48/Donald-Trump-Funny-Smiling-Picture.jpg', 'https://2.bp.blogspot.com/-ZeKxGK00VLA/WRucwYskFDI/AAAAAAAAGvg/AqK86wuy5p8-FUkiGOjlqAm-6EOaUaf_wCLcB/s1600/donald_trump_grinning.jpg'],
      brilliantTrumpQuotes: ["No one is as hot as my daughter, shes a real 10 - Trump", "I had some beautiful pictures taken in which I had a big smile on my face. I looked happy, I looked content, I looked like a very nice person, which in theory I am. - Trump", 'The beauty of me is that I’m very rich. - Trump', "(On the Duchess of Cambridge) Who wouldn’t take Kate’s picture and make lots of money if she does the nude sunbathing thing. Come on, Kate! - Trump", 'While Bette Midler is an extremely unattractive woman, I refuse to say that because I always insist on being politically correct. - Trump', 'While Bette Midler is an extremely unattractive woman, I refuse to say that because I always insist on being politically correct. - Trump', "(On Puerto Rico) This is an island surrounded by water, big water, ocean water. - Trump", 'My fingers are long and beautiful, as, it has been well documented, are various other parts of my body. - Trump', "I've said if Ivanka weren't my daughter, perhaps I'd be dating her. - Trump", "'It's freezing and snowing in New York – we need global warming!' - Trump", "The worst thing a man can do is go bald. Never let yourself go bald. - Trump"]
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  get_random = function (list) {
    return list[Math.floor((Math.random()*list.length))];
  } 

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.tweets.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.tweets.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const slides = this.props.tweets.map((tweetInfo, index) => {
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={index}
          onExiting={this.onExiting}
          onExited={this.onExited}
          style={`background-image:url(${tweetInfo.background})`}
        >
          <CarouselCaption className="text-danger" captionText={this.get_random(this.state.brilliantTrumpQuotes)} captionHeader={tweetInfo.tweet} />
        </CarouselItem>
      );
    });

    return (
      <div className={"centeredBackground"}>
        <style>
          {
            `.custom-tag {
                max-width: 100%;
                max-height: 100%;
                height: 900px;
                background-image: url(${this.get_random(this.state.trumpGQShots)});
              }`
          }
        </style>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={this.props.tweets} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}

export default TweetCarousel;