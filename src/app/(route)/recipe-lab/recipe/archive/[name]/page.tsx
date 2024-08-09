import React from "react";
import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import Header from "@/app/components/Header";
import Image from "next/image";
import profileImg from "@/../public/images/profile.png";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import parse from "html-react-parser";
import { FoodGuideItem, FoodGuideListItem } from "@/app/types";
import ReviewBox from "@/app/components/ReviewBox";

async function page({ params }: { params: { name: string } }) {
  let selectItem: FoodGuideItem | any;

  try {
    const querySnapshot = await getDocs(
      query(collection(db, "food_guide_list"))
    );
    const foodItems: FoodGuideListItem[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as FoodGuideListItem;
      foodItems.push(data);
    });

    foodItems.forEach((item) => {
      item.items.forEach((subItem: FoodGuideItem) => {
        if (subItem.name == decodeURI(params.name)) {
          selectItem = subItem;
        }
      });
    });
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

              <ReviewBox />
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
