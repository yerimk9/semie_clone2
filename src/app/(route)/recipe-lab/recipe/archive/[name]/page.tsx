import { FoodGuideItemProps } from "@/app/types";
import React from "react";
import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import Header from "@/app/components/Header";
import Image from "next/image";
import profileImg from "@/../public/images/profile.png";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import parse from "html-react-parser";

async function page({ params }: { params: { name: string } }) {
  // let selectItem: FoodGuideItemProps | undefined;
  let selectItem;
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "food_guide_list"))
    );
    const foodItems: FoodGuideItemProps[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as FoodGuideItemProps;
      foodItems.push(data);
    });

    // foodItems 배열을 순회
    foodItems.forEach((item) => {
      // 각 foodItem의 items 배열을 순회
      item.items.forEach((subItem) => {
        if (subItem.name == decodeURI(params.name)) {
          selectItem = subItem;
        }
      });
    });

    console.log(selectItem);
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

          <div className="recipe_view_wrap">
            <div className="view_title">
              <div className="inner">
                <span className="label">레시피 / 솔루션</span>
                <h3>{selectItem?.name}</h3>
                <p className="date">{selectItem?.date}</p>
              </div>
            </div>

            <div className="worry_view_cont">
              <div className="view_cont_tit">
                <h4>{selectItem?.desc}</h4>
                <p>{parse(selectItem?.subDesc || "")}</p>
              </div>

              {(selectItem?.mainH || selectItem?.mainT) && (
                <>
                  <div className="scrap_line"></div>

                  <div className="view_cont_tit">
                    <h4>{parse(selectItem?.mainH || "")}</h4>
                    <p>{parse(selectItem?.mainT || "")}</p>
                  </div>
                </>
              )}
              <div className="worry_intro">
                {selectItem?.main_img && (
                  <Image
                    src={selectItem?.main_img}
                    alt=""
                    width={1080}
                    height={1440}
                  />
                )}
              </div>

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
              <Link href={"/recipe-lab/recipe/1"} className="btn">
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
