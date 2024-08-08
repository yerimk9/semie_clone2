import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FoodGuideDetailItem } from "../types";

function GuideDetailItem({ item }: FoodGuideDetailItem) {
  return (
    <li>
      <Link href={"/"}>
        <div className="img">
          <Image src={item?.main_img} alt="" width={1280} height={1280} />
        </div>
        <div className="text">
          <h4>{item?.name}</h4>
          <p>{item?.desc}</p>
        </div>
      </Link>
      <ul className="tagWrap">
        {item?.hashTag !== "null" ? (
          <>
            {item?.hashTag.map((item, idx) => (
              <li className="hash" key={idx}>
                #{item}
              </li>
            ))}
          </>
        ) : (
          <>
            <li>
              <span>준비시간</span>
              {item?.preparation_time}분
            </li>
            <li>
              <span>조리시간</span>
              {item?.cooking_time}분
            </li>
          </>
        )}
      </ul>
      <button type="button" className="scrap">
        스크랩
      </button>
    </li>
  );
}

export default GuideDetailItem;
