import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { register } from "swiper/element/bundle";

register();

import "swiper/css";

import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonster from "../../../assets/brands/moonstar.png";
import ranbstad from "../../../assets/brands/randstad.png";
import startPepole from "../../../assets/brands/start-people.png";
import start from "../../../assets/brands/start.png";

const brandsLogo = [amazon, casio, moonster, ranbstad, startPepole, start];

const Brands = () => {
  return (
    <div className="py-24">
      <h2 className="text-center mb-10 text-3xl font-bold text-[#03373D]">
        We've helped thousands of sales teams
      </h2>
      <Swiper
        loop={true}
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {brandsLogo.map((brand, index) => (
          <SwiperSlide key={index}>
            <img src={brand} alt="brand" className="w-auto h-8" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
