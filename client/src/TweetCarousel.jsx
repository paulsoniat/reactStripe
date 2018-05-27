import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

class TweetCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeIndex: 0, 
      trumpGQShots: ['https://upload.wikimedia.org/wikipedia/commons/3/36/Donald_Trump_and_Mike_Pence_-_Caricature.jpg', 'https://www.askideas.com/media/48/Donald-Trump-Funny-Smiling-Picture.jpg']
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
          <CarouselCaption className="text-danger" captionText={tweetInfo.quote} captionHeader={tweetInfo.tweet} />
        </CarouselItem>
      );
    });

    return (
      <div>
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