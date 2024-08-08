import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import il_smile4 from "@/../public/images/il_samie_4.png";
import il_write from "@/../public/images/ic_write.png";
import CounselingListItem from "@/app/components/CounselingListItem";
import Filter from "@/app/components/Filter";
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "@/firebase";
import { CounselingItemsProps } from "@/app/types";
import getMaxPageNumber from "@/app/utils/getMaxPageNumber";

const pageClick = async (
  page: number,
  collectionName: string,
  size: number
): Promise<{ dataList: CounselingItemsProps[] }> => {
  let dataList: CounselingItemsProps[] = [];
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
    const data = doc.data() as CounselingItemsProps;
    dataList.push(data);
  });

  return {
    dataList,
  };
};

async function page({ params }: { params: { page: string } }) {
  let counselingItems: CounselingItemsProps[] = [];
  let currentPage = parseInt(params.page, 10);
  let maxPageNumber = 1;
  try {
    const { dataList } = await pageClick(currentPage, "counseling_list", 16);
    maxPageNumber = await getMaxPageNumber("counseling_list", 16);
    counselingItems = dataList;
  } catch (e) {
    console.log(e);
  }

  const firstHalf = counselingItems.slice(0, 8);
  const secondHalf = counselingItems.slice(8, 16);

  return (
    <div>
      <Header />

      <main>
        <div className="labList">
          <div className="subTitle">
            <h3>요리해요</h3>
          </div>

          <div className="tab">
            <ul>
              <li>
                <Link href={`/cooking/list/${params.page}`}>요리해요</Link>
              </li>
              <li className="on">
                <Link href={`/counseling/list/${params.page}`}>고민있어요</Link>
              </li>
            </ul>
          </div>

          <div className="myfood v2">
            <Image src={il_smile4} alt="" width={161} height={134} />
            <div className="myfoodBtnWrap">
              <p>
                요리에 대한 모든 고민
                <br />
                <span>
                  고민이 있으세요? 지금 고민을 남기고 함께 해결방안을 찾아봐요!
                </span>
              </p>
              <Link href={"/"}>
                작성하기
                <Image src={il_write} alt="" width={24} height={24} />
              </Link>
            </div>
          </div>

          <div className="detail_wrap">
            <div className="detail_con">
              <Filter list={["최신순", "조회순", "스크랩순"]} />

              <ul className="cardList">
                {firstHalf.map((item, idx) => (
                  <li key={idx}>
                    <CounselingListItem item={item} />
                  </li>
                ))}
              </ul>
              <div className="middle_bn">
                <Link href={"/"}>
                  <Image
                    src={
                      "https://semie.cooking/image/index/2024/07/143462772kabf.png"
                    }
                    alt=""
                    className="pc-show"
                    width={1496}
                    height={160}
                  />
                  <Image
                    src={
                      "https://semie.cooking/image/index/2024/07/143462775lvhq.png"
                    }
                    alt=""
                    className="mb-show"
                    width={690}
                    height={200}
                  />
                </Link>
              </div>
              <ul className="cardList">
                {secondHalf.map((item, idx) => (
                  <li key={idx}>
                    <CounselingListItem item={item} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="pagination">
              {currentPage > 1 && (
                <Link
                  href={`/counseling/list/${currentPage - 1}`}
                  className="prev"
                >
                  <i className="icon_prev">이전페이지</i>
                </Link>
              )}
              <span className="page_p">
                {Array.from({ length: maxPageNumber }, (_, i) => (
                  <Link
                    key={i + 1}
                    href={`/counseling/list/${i + 1}`}
                    className={i + 1 === currentPage ? "act" : ""}
                  >
                    {i + 1}
                  </Link>
                ))}
              </span>
              {currentPage < maxPageNumber && (
                <Link
                  href={`/counseling/list/${currentPage + 1}`}
                  className="next"
                >
                  <i className="icon_next">다음페이지</i>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default page;
