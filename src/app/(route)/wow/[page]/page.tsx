import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Image from "next/image";
import React from "react";
import il_wow from "../../../../../public/images/il_wow.png";
import EventItem from "@/app/components/EventItem";
import { WowListItemProps } from "@/app/types";
import Filter from "@/app/components/Filter";
import Link from "next/link";
import getMaxPageNumber from "@/app/utils/getMaxPageNumber";
import pageClick from "@/app/utils/pageClick";

async function page({ params }: { params: { page: string } }) {
  let wowList: WowListItemProps["item"][] = [];
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
            <Filter list={["전체", "진행중", "종료", "당첨자발표"]} />
            <ul className="event_list">
              {wowList.map((item, idx) => (
                <li key={idx}>
                  <EventItem item={item} />
                </li>
              ))}
            </ul>

            <div className="pagination">
              {currentPage > 1 && (
                <Link href={`/wow/${currentPage - 1}`} className="prev">
                  <i className="icon_prev">이전페이지</i>
                </Link>
              )}
              <span className="page_p">
                {Array.from({ length: maxPageNumber }, (_, i) => (
                  <Link
                    key={i + 1}
                    href={`/wow/${i + 1}`}
                    className={i + 1 === currentPage ? "act" : ""}
                  >
                    {i + 1}
                  </Link>
                ))}
              </span>
              {currentPage < maxPageNumber && (
                <Link href={`/wow/${currentPage + 1}`} className="next">
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
