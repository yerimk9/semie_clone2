import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import React from "react";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";
import { CounselingItemsProps } from "@/app/types";
import Image from "next/image";
import ic_kakao2 from "@/../public/images/ic_kakao2.png";
import ic_url from "@/../public/images/ic_url.png";
import profileImg from "@/../public/images/profile.png";
import Link from "next/link";

async function page({ params }: { params: { id: string } }) {
  let selectItem: CounselingItemsProps | undefined;

  try {
    const querySnapshot = await getDocs(
      query(collection(db, "counseling_list"))
    );
    const foodItems: CounselingItemsProps[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as CounselingItemsProps;
      foodItems.push(data);
    });

    selectItem = foodItems.find((item) => item.id == params.id);
  } catch (e) {
    console.error(e);
    return null;
  }

  return (
    <div>
      <Header />

      <main>
        <div className="labView">
          <div className="subTitle mb_show">
            <h3>요리해요</h3>
          </div>

          <div className="worry_view_wrap">
            <div className="view_title">
              <div className="inner">
                <span className="label">고민있어요</span>
                <h3>{selectItem?.title}</h3>
                <p className="date">{selectItem?.date}</p>
              </div>
            </div>
            <div className="worry_view_cont">
              <div className="worry_intro">
                <p>{selectItem?.text}</p>
                {selectItem?.imgUrl && (
                  <Image
                    src={selectItem?.imgUrl}
                    alt=""
                    width={1080}
                    height={1440}
                  />
                )}
              </div>
              <div className="view_tag_wrap"></div>

              <div className="comment_wrap">
                <div className="total">
                  댓글<span>1</span>
                </div>
                <div className="cmt_login">
                  <div className="profile">
                    <Image
                      src={profileImg}
                      alt="profile"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="loginFirst">
                    <Link href={"/"}>로그인</Link>하시고 댓글을 남겨보세요.
                  </div>
                </div>
                <div className="cmt_box"></div>
              </div>
            </div>
            <div className="btn_box center lg-mb m-mt"></div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default page;
