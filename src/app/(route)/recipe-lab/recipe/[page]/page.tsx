import Image from "next/image";
import Link from "next/link";
import React from "react";
import il_samie_key from "@/../public/images/il_samie_key.png";
import Filter from "@/app/components/Filter";
import GuideDetailItem from "@/app/components/GuideDetailItem";
import getMaxPageNumber from "@/app/utils/getMaxPageNumber";
import { FoodGuideItem } from "@/app/types";
import Pagination from "@/app/components/Pagination";
import pageClick from "@/app/utils/pageClick";

async function page({ params }: { params: { page: string } }) {
  let foodItems: FoodGuideItem[] = [];
  let currentPage = parseInt(params.page, 10);
  let maxPageNumber = 1;

  try {
    const { dataList } = await pageClick<FoodGuideItem>(
      currentPage,
      "food_guide_list",
      8
    );
    maxPageNumber = await getMaxPageNumber("food_guide_list", 8);
    foodItems = (dataList[4] as any)?.items;
  } catch (e) {
    console.log(e);
  }

  return (
    <div>
      <main>
        <div className="labList">
          <div className="subTitle">
            <h3>요리연구소</h3>
          </div>

          <div className="tab">
            <ul>
              <li className="on">
                <Link href={`/recipe-lab/recipe/1`}>레시피</Link>
              </li>
              <li>
                <Link href={`/recipe-lab/solution/1`}>솔루션</Link>
              </li>
            </ul>
          </div>

          <div className="keyword_wrap">
            <div className="key_title">
              <h4>
                <Image src={il_samie_key} alt="" width={43} height={43} />
                <span>새미의 추천 키워드</span>
              </h4>
            </div>
            <div className="key_list">
              <ul>
                <li className="on">
                  <button type="button">전체</button>
                </li>
                <li>
                  <button type="button">면 요리</button>
                </li>
                <li>
                  <button type="button">두부</button>
                </li>
                <li>
                  <button type="button">다이어트</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="hr_line"></div>

          <div className="detail_wrap">
            <div className="detail_con">
              <div className="filter">
                <Filter list={["최신순", "조회순", "스크랩순"]} />
              </div>

              <ul className="tagList">
                {foodItems?.map((item, idx) => (
                  <GuideDetailItem key={idx} item={item} />
                ))}
              </ul>
            </div>

            <Pagination
              currentPage={currentPage}
              maxPageNumber={maxPageNumber}
              path={"/recipe-lab/recipe/"}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
