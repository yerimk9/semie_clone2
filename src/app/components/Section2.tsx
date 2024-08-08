import React from "react";
import { FoodGuideProps } from "../types";
import Link from "next/link";
import Image from "next/image";
import ic_right from "@/../public/images/right.png";

function Section2({ list }: FoodGuideProps) {
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
        <ul>
          <li className="on">
            <button type="button">전체</button>
          </li>
          <li>
            <button type="button">레시피</button>
          </li>
          <li>
            <button type="button">솔루션</button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Section2;
