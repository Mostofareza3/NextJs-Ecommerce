import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import styles from "./styles.module.scss";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import { offersArray } from "data/home";
import Link from "next/link";

export default function Offers() {
  return (
    <div className={styles.offers}>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="offers_swiper"
      >
        {offersArray.map((offer, index) => (
          <SwiperSlide key={index} className={styles.offers__slide}>
            <Link href="">
              <img src={offer.image} alt="" />
              <span>{offer.price}</span>
              <span>{offer.discount}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
