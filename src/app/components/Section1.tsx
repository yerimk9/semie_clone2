"use client";
import React, { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { FoodGuideProps } from "../types";
import Link from "next/link";
import GuideModal from "./GuideModal";
import parse from "html-react-parser";

function Section1({ list }: FoodGuideProps) {
  // function Section1() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [isModal, setIsModal] = useState(false);

  const modalOpen = () => {
    setIsModal((prev) => !prev);
  };

  return (
    <>
      <div className="swiper-container">
        <div className="title">
          <p>
            <Image src={logo} alt="logo" width={42} height={58} />
            추천드려요!
          </p>
          <h3>
            요리초보
            <br />
            가이드
          </h3>
          <button type="button" onClick={modalOpen}>
            <span>가이드 더보기</span>
          </button>
        </div>
        <GuideModal list={list} isModal={isModal} setIsModal={modalOpen} />
        <div className="swiper-control">
          <div className="count">
            <span className="current-num">0{slideIndex}</span>
            <span className="mb_dott"> · </span>
            <div className="progressbar-container">
              <progress max={list.length} value={slideIndex}></progress>
            </div>

            <button type="button" className="pause">
              <span className="stop">
                <em className="hidden">play/stop</em>
              </span>
            </button>
            <span className="all-num">{list.length}</span>
          </div>
          <div className="swiper-button swiper-button-prev"></div>
          <div className="swiper-button swiper-button-next"></div>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={5}
          centeredSlides={true}
          slidesPerView={1}
          loop={true}
          speed={900}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          initialSlide={0} // 첫 번째 슬라이드로 시작
          onSlideChangeTransitionEnd={(swiperCore) => {
            setSlideIndex(+swiperCore.realIndex + 1); // onSlideChange로 변경
          }}
          breakpoints={{
            800: {
              centeredSlides: true,
              // slidesPerView: 1,
            },
          }}
          className="swiper mySwiper1"
        >
          {list.map((food, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <Link href={"/"}>
                <Image src={food["main_img"]} alt="img" fill />

                <p className="swiper-title">{parse(food.title)}</p>
                <div className="totalPic">
                  <div className="num">{food.items?.length}</div>
                  <div className="arrow"></div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          initialSlide={1} // 첫 번째 슬라이드로 시작
          speed={900}
          className="swiper mySwiper2"
        >
          {list.map((food, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <Link href={"/"}>
                <div className="picture">
                  <Image src={food["main_img"]} alt="img" fill />

                  <p className="swiper-title">{parse(food.title)}</p>
                  <div className="totalPic">
                    <div className="num">{food.items?.length}</div>
                    <div className="arrow"></div>
                  </div>
                </div>
                <ul className="thumb">
                  <li>
                    <Image
                      src={food["main_img"]}
                      alt="img"
                      width={125}
                      height={125}
                    />
                  </li>
                  <li>
                    <Image
                      src={food["main_img"]}
                      alt="img"
                      width={125}
                      height={125}
                    />
                  </li>
                  <li>
                    <Image
                      src={food["main_img"]}
                      alt="img"
                      width={125}
                      height={125}
                    />
                    <p className="more_detail">자세히 보기</p>
                  </li>
                </ul>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          speed={900}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          initialSlide={2} // 첫 번째 슬라이드로 시작
          className="swiper mySwiper3"
        >
          {list.map((food, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <Link href={"/"}>
                <Image src={food["main_img"]} alt="img" fill />

                <p className="swiper-title">{parse(food.title)}</p>

                <div className="totalPic">
                  <div className="num">{food.items?.length}</div>
                  <div className="arrow"></div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default Section1;
