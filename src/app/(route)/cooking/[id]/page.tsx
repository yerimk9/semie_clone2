import React from "react";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";
import { CookingListItemsProps } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import profileImg from "@/../public/images/profile.png";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

async function page({ params }: { params: { id: string } }) {
  let selectItem: CookingListItemsProps | undefined;

  try {
    const querySnapshot = await getDocs(query(collection(db, "cooking_list")));
    const foodItems: CookingListItemsProps[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as CookingListItemsProps;
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

          <div className="cooking_view_wrap">
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
                <div className="cmt_box">
                  <div className="profile">
                    <Image
                      src={profileImg}
                      alt="profile"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="cmt">
                    <div className="name">
                      샘표 연구원
                      <span className="date">2024-08-05 08:37</span>
                    </div>

                    <div className="text">
                      안녕하세요? 샘표 우리맛 연구원입니다!
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_box center m-mt">
              <Link href={"/cooking/list/1"} className="btn">
                목록으로
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default page;