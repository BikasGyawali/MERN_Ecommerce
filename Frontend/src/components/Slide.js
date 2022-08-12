import React, { useState, useEffect, useRef } from "react";
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from "react-icons/ai";
import Img from "../images/7.jpg";
import Imgacc from "../images/8.jpg";
import Imgset from "../images/9.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Slide = () => {
  const imgs = [Img, Imgacc, Imgset];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    pauseonhover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "slider",
    arrows: false,
  };

  return (
    <>
      <div className="w-full">
        <Slider {...settings}>
          {imgs.map((values, index) => {
            return (
              <img
                key={index}
                src={values}
                className="aspect-video"
                alt="/hello"
              />
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default Slide;
