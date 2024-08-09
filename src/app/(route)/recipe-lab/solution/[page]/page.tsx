import Filter from "@/app/components/Filter";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Link from "next/link";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import getMaxPageNumber from "@/app/utils/getMaxPageNumber";
import GuideDetailItem from "@/app/components/GuideDetailItem";
import { FoodGuideItem } from "@/app/types";
import Pagination from "@/app/components/Pagination";

const pageClick = async (
  page: number,
  collectionName: string,
  size: number
): Promise<{ dataList: FoodGuideItem[] }> => {
  let dataList: FoodGuideItem[] = [];
  let querySnapshot;

  const pageSize = size;

  const baseQuery = query(collection(db, collectionName), limit(pageSize));

  if (page === 1) {
    querySnapshot = await getDocs(baseQuery);
  } else {
    const prevPageSnapshot = await getDocs(baseQuery);
    const lastDoc = prevPageSnapshot.docs[prevPageSnapshot.docs.length - 1];

    querySnapshot = await getDocs(query(baseQuery, startAfter(lastDoc)));
  }

  querySnapshot.forEach((doc) => {
    const data = doc.data() as FoodGuideItem;
    dataList.push(data);
  });

  return {
    dataList,
  };
};

async function page({ params }: { params: { page: string } }) {
  let foodItems: FoodGuideItem[] = [];
  let currentPage = parseInt(params.page, 10);
  let maxPageNumber = 1;

  try {
    const { dataList } = await pageClick(currentPage, "food_guide_list", 8);
    maxPageNumber = await getMaxPageNumber("food_guide_list", 8);
    foodItems = (dataList[2] as any)?.items;
  } catch (e) {
    console.log(e);
  }

  return (
    <div>
      <Header />

      <main>
        <div className="labList">
          <div className="subTitle">
            <h3>요리연구소</h3>
          </div>

          <div className="tab">
            <ul>
              <li>
                <Link href={`/recipe-lab/recipe/1`}>레시피</Link>
              </li>
              <li className="on">
                <Link href={`/recipe-lab/solution/1`}>솔루션</Link>
              </li>
            </ul>
          </div>

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
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default page;
