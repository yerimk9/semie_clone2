"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import il_wow from "@/../public/images/il_wow.png";
import ic_right from "@/../public/images/right.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules

function Section4() {
  return (
    <>
      <div className="title">
        <h3>
          <Image src={il_wow} alt="" width={170} height={94} />
          <span>이벤트</span>
        </h3>
        <Link href={"/wow/1"} className="btn_arrow_lg">
          더보기
          <Image src={ic_right} alt="" width={40} height={40} />
        </Link>
      </div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        //   type: "fraction",
        // }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src={"https://semie.cooking/image/index/2024/07/143462637rmoz.png"}
            alt=""
            width={1240}
            height={160}
            className="pc-show"
          />
          <Image
            src={"https://semie.cooking/image/index/2024/07/143462645stwr.png"}
            alt=""
            width={1240}
            height={160}
            className="mb-show"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"https://semie.cooking/image/index/2024/07/143462637rmoz.png"}
            alt=""
            width={1240}
            height={160}
            className="pc-show"
          />
          <Image
            src={"https://semie.cooking/image/index/2024/07/143462645stwr.png"}
            alt=""
            width={1240}
            height={160}
            className="mb-show"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"https://semie.cooking/image/index/2024/07/143462637rmoz.png"}
            alt=""
            width={1240}
            height={160}
            className="pc-show"
          />
          <Image
            src={"https://semie.cooking/image/index/2024/07/143462645stwr.png"}
            alt=""
            width={1240}
            height={160}
            className="mb-show"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Section4;
