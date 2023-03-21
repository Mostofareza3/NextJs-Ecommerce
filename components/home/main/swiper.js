import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import Image from "next/image";

export default function MainSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mainSwiper"
      >
        {[...Array(10).keys()].map((i) => {
          return (
            <SwiperSlide key={i}>
              <img src={`../../../images/swiper/${i + 1}.jpg`} alt="1" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
