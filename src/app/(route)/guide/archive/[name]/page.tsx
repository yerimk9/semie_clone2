import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ic_kakao2 from "@/../public/images/ic_kakao2.png";
import ic_url from "@/../public/images/ic_url.png";
import GuideDetailItem from "@/app/components/GuideDetailItem";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";
import { FoodGuide } from "@/app/types";
import parse from "html-react-parser";

async function page({ params }: { params: number }) {
  let selectItem: FoodGuide | undefined;
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "food_guide_list"))
    );
    const foodItems: FoodGuide[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as FoodGuide;
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
        <div className="guideDetail">
          <div className="detail_bg">
            <Image
              src={selectItem?.main_img || ""}
              alt=""
              width={1280}
              height={1280}
            />
          </div>
          <div className="detail_control">
            <div className="left">
              <Link href={"/guide/list/1"} className="list_btn">
                목록으로
              </Link>
            </div>
            <div className="right">
              <button type="button" className="scrap">
                스크랩
              </button>
              <div className="share_wrap">
                <button type="button" className="share">
                  공유하기
                </button>
                <ul className="share_btn">
                  <li className="close">
                    <span>공유</span>
                    <button type="button">×</button>
                  </li>
                  <li>
                    <button type="button">
                      <Image src={ic_kakao2} alt="" width={36} height={36} />
                      <span>카카오톡</span>
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <Image src={ic_url} alt="" width={36} height={36} />
                      <span>URL복사</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="detail_wrap">
            <div className="detail_con">
              <div className="detail_title">
                <h3>{parse(selectItem?.title || "")}</h3>
                <p>{parse(selectItem?.subTitle || "")}</p>
                <div className="title_tag">
                  {selectItem?.hashTag?.map((item, idx) => (
                    <span key={idx} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="tagList hashList">
                {selectItem?.items?.map((item, idx) => (
                  <GuideDetailItem key={idx} item={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default page;
