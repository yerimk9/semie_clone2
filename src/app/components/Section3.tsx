"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ic_right from "@/../public/images/right.png";
import il_smile2 from "@/../public/images/il_samie_2.png";
import il_write from "@/../public/images/ic_write.png";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { CookingListItemsProps, CounselingItemsProps } from "../types";
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "@/firebase";
import parse from "html-react-parser";

const pageClick = async (
  page: number,
  collectionName: string,
  size: number
): Promise<{ dataList: CookingListItemsProps[] }> => {
  let dataList: CookingListItemsProps[] = [];
  let querySnapshot;

  const pageSize = size;

  const baseQuery = query(
    collection(db, collectionName),
    // orderBy("date"),
    limit(pageSize)
  );

  if (page === 1) {
    querySnapshot = await getDocs(baseQuery);
  } else {
    const prevPageSnapshot = await getDocs(baseQuery);
    const lastDoc = prevPageSnapshot.docs[prevPageSnapshot.docs.length - 1];

    querySnapshot = await getDocs(query(baseQuery, startAfter(lastDoc)));
  }

  querySnapshot.forEach((doc) => {
    const data = doc.data() as CookingListItemsProps;
    dataList.push(data);
  });

  return {
    dataList,
  };
};

function Section3() {
  const [counselingItems, setCounselingItems] = useState<
    CookingListItemsProps[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { dataList } = await pageClick(1, "cooking_list", 16);
        setCounselingItems(dataList);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg_wrap">
      <div className="title">
        <h3>요리해요</h3>
        <Link href={"/cooking/list/1"} className="btn_arrow_lg">
          더보기
          <Image src={ic_right} alt="" width={40} height={40} />
        </Link>
      </div>
      <div className="swiper-container-bg">
        <Image
          src={"https://semie.cooking/assets/images/common/bg_frame.png"}
          alt=""
          width={1000}
          height={500}
          className="bg-img"
        />

        <div className="swiper-container-box">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={100}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            initialSlide={0}
            speed={700}
            className="swiper mySwiper1"
          >
            {counselingItems.map((food, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <Link href={"/"}>
                  <div className="img">
                    <Image
                      src={food?.imgUrl}
                      alt="img"
                      width={204}
                      height={204}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={-135}
            centeredSlides={true}
            loop={true}
            slidesPerView={2}
            breakpoints={{
              800: {
                slidesPerView: 1,
                spaceBetween: 100,
              },
              560: {
                spaceBetween: 20,
              },
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            initialSlide={1}
            speed={700}
            className="swiper mySwiper2"
          >
            {counselingItems.map((food, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <Link href={"/"}>
                  <div className="top_text">
                    <h4>{food?.title}</h4>
                    <p>
                      <span>{food?.author}</span>
                      {food?.date}
                    </p>
                  </div>
                  <div className="img">
                    <Image
                      src={food?.imgUrl}
                      alt="img"
                      width={204}
                      height={204}
                    />
                  </div>
                  <div className="bottom_text">{parse(food?.text)}</div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={100}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            initialSlide={2}
            speed={700}
            className="swiper mySwiper3"
          >
            {counselingItems.map((food, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <Link href={"/"}>
                  <div className="img">
                    <Image
                      src={food?.imgUrl}
                      alt="img"
                      width={204}
                      height={204}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="myfood">
        <Image src={il_smile2} alt="" width={161} height={134} />
        <div className="myfoodBtnWrap">
          <p>나만의 요리를 올려주세요!</p>
          <Link href={"/"}>
            작성하기
            <Image src={il_write} alt="" width={24} height={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Section3;
