import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import favImage from "../assets/favourite.png";
import nextImage from "../assets/next.png";
import prevImage from "../assets/prev.png";
import { ArticleCard } from "../components";

class LatestArticles extends Component {
  constructor(props) {
    super(props);
    this.goNext = this.goNext.bind(this);
    this.goPrevious = this.goPrevious.bind(this);
  }

  goNext() {
    this.slider.slickNext();
  }

  goPrevious() {
    this.slider.slickPrev();
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: 5,
      arrows: false,
      draggable: false,
      accessibility: false,
      responsive: [
        {
          breakpoint: 1576,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

    return (
      <>
        <div className="mx-4 flex justify-between pt-16 mb-4">
          <div className="flex flex-row items-center">
            <div className="font-bold text-lg sm:text-4xl pr-4">Latest Articles</div>
            <div
              className="rounded-md flex flex-row items-center py-1 px-2 mt-2 mr-4 cursor-pointer"
              style={{ background: "rgba(180, 28, 46, 0.06)" }}
            >
              <img alt="favorite" src={favImage} className="pr-1"></img>
              <div className="text-primary text-xs sm:text-base">Favourites</div>
            </div>
            <div
              className="rounded-md flex flex-row items-center py-1 px-2 mt-2 cursor-pointer"
              style={{ background: "#EDEDED" }}
            >
              <div className="text-xs sm:text-base">Following</div>
            </div>
          </div>
          <div className="hidden md:flex justify-center space-x-2 sm:space-x-5 sm:mt-2">
            <img alt="previous" className="w-12" src={prevImage} onClick={this.goPrevious}></img>
            <img alt="next" className="w-12" src={nextImage} onClick={this.goNext}></img>
          </div>
        </div>
        <div className="relative roadmap_container">
          <Slider ref={c => (this.slider = c)} {...settings}>
            {this.props.articles.map((article_id, index) => (
              <ArticleCard key={index} id={article_id}></ArticleCard>
            ))}
          </Slider>
          <div className="md:hidden absolute top-1/2 left-4">
            <img alt="previous" className="w-12" src={prevImage} onClick={this.goPrevious}></img>
          </div>
          <div className="md:hidden absolute top-1/2 right-4">
            <img alt="next" className="w-12" src={nextImage} onClick={this.goNext}></img>
          </div>
        </div>
      </>
    );
  }
}

export default LatestArticles;
