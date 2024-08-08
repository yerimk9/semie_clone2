import Filter from "@/app/components/Filter";
import FoodGuideItem from "@/app/components/FoodGuideItem";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { FoodGuide } from "@/app/types";
import getMaxPageNumber from "@/app/utils/getMaxPageNumber";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import Link from "next/link";
import React from "react";

const pageClick = async (
  page: number,
  collectionName: string,
  size: number
): Promise<{ wowList: FoodGuide[] }> => {
  let wowList: FoodGuide[] = [];
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
    const data = doc.data() as FoodGuide;
    wowList.push(data);
  });

  return {
    wowList,
  };
};

export default async function page({ params }: { params: { page: string } }) {
  let foodItems: FoodGuide[] = [];
  let currentPage = parseInt(params.page, 10);
  let maxPageNumber = 1;

  /*  try {
    // Firestore에서 데이터 가져오기
    const querySnapshot = await getDocs(
      query(collection(db, "food_guide_list"))
    );

    querySnapshot.forEach((doc) => {
      const data = doc.data() as FoodGuide;
      foodItems.push(data);
    });
  } catch (e) {
    console.log(e);
  } */
  try {
    const { wowList } = await pageClick(currentPage, "food_guide_list", 12);
    maxPageNumber = await getMaxPageNumber("food_guide_list", 12);
    foodItems = wowList;
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

          <Filter list={["최신순", "조회순", "스크랩순"]} />
          <ul>
            {foodItems.map((item, idx) => (
              <FoodGuideItem key={idx} item={item} />
            ))}
          </ul>
          {/*   <div className="pagination">
            <Link href={"/"} className="prev">
              <i className="icon_prev">이전페이지</i>
            </Link>
            <span className="page_p">
              <Link href={"/"}>1</Link>
              <Link href={"/"}>2</Link>
              <Link href={"/"} className="act">
                3
              </Link>
              <Link href={"/"}>4</Link>
            </span>
            <Link href={"/"} className="next">
              <i className="icon_next">다음페이지</i>
            </Link>
          </div> */}

          <div className="pagination">
            {currentPage > 1 && (
              <Link href={`/guide/list/${currentPage - 1}`} className="prev">
                <i className="icon_prev">이전페이지</i>
              </Link>
            )}
            <span className="page_p">
              {Array.from({ length: maxPageNumber }, (_, i) => (
                <Link
                  key={i + 1}
                  href={`/guide/list/${i + 1}`}
                  className={i + 1 === currentPage ? "act" : ""}
                >
                  {i + 1}
                </Link>
              ))}
            </span>
            {currentPage < maxPageNumber && (
              <Link href={`/guide/list/${currentPage + 1}`} className="next">
                <i className="icon_next">다음페이지</i>
              </Link>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
