"use client";
import React from "react";
import { FoodGuideProps } from "../types";
import Link from "next/link";
import Image from "next/image";
import ic_right from "@/../public/images/right.png";
import Filter from "./Filter";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import GuideDetailItem from "./GuideDetailItem";

function Section2({ list }: FoodGuideProps) {
  const selectedItem = list[4]?.items;
  console.log(selectedItem);
  // console.log(list);
  return (
    <>
      <div className="title">
        <h3>요리연구소</h3>
        <Link href={`/recipe-lab/recipe/1`} className="btn_arrow_lg">
          더보기
          <Image src={ic_right} alt="" width={40} height={40} />
        </Link>
      </div>

      <div className="tabMenu">
        <Filter list={["전체", "레시피", "솔루션"]} />
      </div>

      <ul className="swiper-list">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          slidesPerView={2}
          spaceBetween={40}
          slidesPerGroup={3}
          loop={true}
          speed={900}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {selectedItem?.map((item, idx) => (
            <SwiperSlide key={idx} className="swiper-list-item">
              <GuideDetailItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </ul>
    </>
  );
}

export default Section2;
