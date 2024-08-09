import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Image from "next/image";
import React from "react";
import il_wow from "../../../../../public/images/il_wow.png";
import EventItem from "@/app/components/EventItem";
import Filter from "@/app/components/Filter";
import Link from "next/link";
import getMaxPageNumber from "@/app/utils/getMaxPageNumber";
import { WowListItem } from "@/app/types";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import Pagination from "@/app/components/Pagination";

const pageClick = async (
  page: number,
  collectionName: string,
  size: number
) => {
  let wowList: any["item"][] = [];
  let querySnapshot;

  const pageSize = size;

  const baseQuery = query(
    collection(db, collectionName),
    orderBy("date"),
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
    const data = doc.data();
    wowList.push(data);
  });

  return {
    wowList,
  };
};

async function page({ params }: { params: { page: string } }) {
  let wowList: WowListItem[] = [];
  let currentPage = parseInt(params.page, 10);
  let maxPageNumber = 1;

  try {
    const { wowList: newWowList } = await pageClick(currentPage, "wow", 9);
    maxPageNumber = await getMaxPageNumber("wow", 9);
    wowList = newWowList;
  } catch (e) {
    console.log(e);
  }
  return (
    <div>
      <Header />

      <main>
        <div className="eventList">
          <div className="subTitle">
            <h3>
              <Image src={il_wow} alt="il_wow" width={170} height={94} />
              이벤트
            </h3>
          </div>
          <div className="eventList_wrap">
            <div className="filter">
              <Filter list={["전체", "진행중", "종료", "당첨자발표"]} />
            </div>
            <ul className="event_list">
              {wowList.map((item, idx) => (
                <li key={idx}>
                  <EventItem item={item} />
                </li>
              ))}
            </ul>

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
