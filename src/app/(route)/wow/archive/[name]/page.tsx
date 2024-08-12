import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import Image from "next/image";
import React from "react";
import il_wow from "@/../public/images/il_wow.png";
import Link from "next/link";
import EventNotice from "@/app/components/EventNotice";
import addOneDayToDate from "@/app/utils/addOneDayToDate";
import { WowListItem } from "@/app/types";

async function page({ params }: { params: { name: string } }) {
  let selectItem: WowListItem | undefined;

  try {
    const querySnapshot = await getDocs(query(collection(db, "wow")));
    const foodItems: WowListItem[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as WowListItem;
      foodItems.push(data);
    });

    selectItem = foodItems.find((item) => item.id == params.name);
  } catch (e) {
    console.error(e);
    return null;
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "진행중":
        return "green";
      case "종료":
        return "gray";
      case "당첨자 발표":
        return "orange";
      default:
        return "";
    }
  };

  if (!selectItem) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div>
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
              <span className={`label ${getStatusClass(selectItem["status"])}`}>
                {selectItem?.status}
              </span>
            </div>
            <h3>{selectItem?.title}</h3>
            <p className="date">{selectItem?.date}</p>
          </div>
          <div className="topBanner">
            <Image
              className="mb_hide"
              src={selectItem?.images[0]}
              alt=""
              width={1496}
              height={500}
            />
            <Image
              className="mb_show"
              src={selectItem?.images[1]}
              alt=""
              width={690}
              height={518}
            />
          </div>
          <div className="event_wrap">
            <div className="event_info_wrap">
              <h4>이벤트 참여 안내</h4>
              <dl className="event_info">
                <div className="event_info_item">
                  <dt className="event_info_dt">진행일자</dt>
                  <dd className="event_info_dd">{selectItem?.date}</dd>
                </div>

                <div className="event_info_item">
                  <dt className="event_info_dt">당첨자 발표</dt>
                  <dd className="event_info_dd">
                    <p>(선정자 발표) {addOneDayToDate(selectItem["date"])}</p>
                    <span className="event_info_noti">
                      {" "}
                      진행일자 내, 아래 신청하기 url을 통해 접수한 인원 대상,
                      선정자들에게 개별 연락 예정 (LMS){" "}
                    </span>
                  </dd>
                </div>

                <div className="event_info_item">
                  <dt className="event_info_dt">이벤트 경품</dt>
                  <dd className="event_info_dd">
                    <p>
                      ✅ &nbsp;<b>기본 리워드</b>
                      <br />
                      어글리어스 채소박스 - 스탠다드 이용권{" "}
                    </p>
                    <p>
                      ✅ &nbsp;<b>1차 미션 후 리워드</b>
                      <br />
                      어글리어스 채소박스 - 스탠다드 이용권{" "}
                    </p>
                    <p>
                      ✅ &nbsp;<b>2차 미션 후 리워드</b>
                      <br />
                      어글리어스 채소박스 - 스탠다드 이용권{" "}
                    </p>
                    <p>
                      ✅ &nbsp;<b>3차 미션 후 리워드</b>
                      <br />
                      어글리어스 채소박스 - 스탠다드 이용권{" "}
                    </p>
                    <p>
                      ✅ &nbsp;<b>최종 수료 완료 시</b>
                      <br />
                      어글리어스 채소박스 - 스탠다드 이용권{" "}
                    </p>
                  </dd>
                </div>

                <div className="event_info_item">
                  <dt className="event_info_dt">참여 방법</dt>
                  <dd className="event_info_dd">
                    <p>
                      &lt;<Link href={"/"}>신청하기 url</Link>&gt;을 통해 접수 &{" "}
                      <br />
                      선정 후, 미션 가이드에 맞게 요리해요 내 활동 업로드
                      <br />
                    </p>
                    <span className="event_info_noti">
                      미션 총 4건 및 설문조사 진행 예정
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <EventNotice />
          </div>

          <div className="btn_box center m-mt">
            <Link href={"/wow/1"} className="btn">
              목록으로
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
