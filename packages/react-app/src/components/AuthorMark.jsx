import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default class AuthorMark extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: 5,
      arrows: false,
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
        {this.props.marks.length > 0 ? (
          <div className="relative roadmap_container">
            <Slider ref={c => (this.slider = c)} {...settings}>
              {this.props.marks.map((item, index) => {
                return <img key={index} className="px-8" src={item} alt="rewards"></img>;
              })}
            </Slider>
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  }
}
