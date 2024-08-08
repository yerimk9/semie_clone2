import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { WowListItemProps } from "@/app/types";
import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import Image from "next/image";
import React from "react";
import il_wow from "@/../public/images/il_wow.png";
import Link from "next/link";

async function page({ params }: { params: { name: string } }) {
  let selectItem: WowListItemProps | undefined;
  try {
    const querySnapshot = await getDocs(query(collection(db, "wow")));
    const foodItems: WowListItemProps[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as WowListItemProps;
      foodItems.push(data);
    });

    selectItem = foodItems.find((item) => item.id == params.name);
  } catch (e) {
    console.error(e);
    return null;
  }

  return (
    <div>
      <Header />

      <main>
        <div className="eventView">
          <div className="subTitle mb_show">
            <h3>
              <Image src={il_wow} alt="" width={170} height={94} />
              이벤트
            </h3>
          </div>
          <div className="title">
            <div className="label_list">
              <span className="label default">이벤트</span>
              <span className="label gray">종료</span>
            </div>
            <h3>더! 즐거워진 즐요랩(LAB) 시즌2!</h3>
            <p className="date">2024.06.13 ~ 2024.06.23</p>
          </div>
          <div className="topBanner">
            <Image
              className="mb_hide"
              src={
                "https://semie.cooking/image/post/event/ie/ba/cafuczad/140455961tbuu.jpg"
              }
              alt=""
              width={1496}
              height={500}
            />
            <Image
              className="mb_show"
              src={
                "https://semie.cooking/image/post/event/ie/ba/cafuczad/140455965ques.jpg"
              }
              alt=""
              width={690}
              height={518}
            />
          </div>
          <div className="event_wrap">
            <div className="event_info_wrap">
              <h4>이벤트 참여 안내</h4>
              <div className="event_info">
                <div className="event_info_item">
                  <b>진행일자</b>
                  <p>2024.06.24 ~ 2024.07.04</p>
                </div>
              </div>
            </div>
            <div className="event_notice is-active"></div>
          </div>

          <div className="btn_box center m-mt">
            <Link href={"/"}>목록으로</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default page;
