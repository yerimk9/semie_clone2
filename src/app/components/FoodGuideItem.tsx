"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FoodGuideItemProps } from "../types";
import parse from "html-react-parser";

function FoodGuideItem({ item }: FoodGuideItemProps) {
  return (
    <li>
      <Link href={`/guide/archive/${item.id}`}>
        <ul className="thumb">
          <li>
            <Image src={item["main_img"]} alt="" width={1280} height={1280} />
          </li>
          <li>
            <Image src={item["main_img"]} alt="" width={1280} height={1280} />
          </li>
          <li>
            <Image src={item["main_img"]} alt="" width={1280} height={1280} />
            <p className="more_detail">자세히 보기</p>
          </li>
        </ul>
        <div className="picture">
          <Image src={item["main_img"]} alt="" width={1280} height={1280} />
          <p>
            {parse(item?.title || "")}
            <span className="num">{item?.items?.length}</span>
          </p>
          <div className="text">{parse(item?.subTitle || "")}</div>
        </div>
      </Link>
      <button type="button" className="scrap">
        스크랩
      </button>
    </li>
  );
}

export default FoodGuideItem;
