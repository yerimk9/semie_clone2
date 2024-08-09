import Filter from "@/app/components/Filter";
import FoodGuideItem from "@/app/components/FoodGuideItem";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Pagination from "@/app/components/Pagination";
import { FoodGuideListItem } from "@/app/types";
import getMaxPageNumber from "@/app/utils/getMaxPageNumber";
import pageClick from "@/app/utils/pageClick";
import React from "react";

export default async function page({ params }: { params: { page: string } }) {
  let foodItems: FoodGuideListItem[] = [];
  let currentPage = parseInt(params.page, 10);
  let maxPageNumber = 1;

  try {
    // const { wowList } = await pageClick(currentPage, "food_guide_list", 12);
    const { dataList } = await pageClick<FoodGuideListItem>(
      currentPage,
      "food_guide_list",
      8
    );

    maxPageNumber = await getMaxPageNumber("food_guide_list", 12);
    foodItems = dataList;
  } catch (e) {
    console.log(e);
  }

  return (
    <div>
      <Header />

      <main>
        <div className="guideList">
          <div className="subTitle">
            <h3>요리초보가이드</h3>
          </div>
          <div className="filter">
            <Filter list={["최신순", "조회순", "스크랩순"]} />
          </div>

          <ul>
            {foodItems.map((item, idx) => (
              <FoodGuideItem key={idx} item={item} />
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            maxPageNumber={maxPageNumber}
            path={"/guide/list/"}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
