import React from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";
import Link from "next/link";
import Image from "next/image";
import { CookingListItemProps } from "@/app/types";
import ReviewBox from "@/app/components/ReviewBox";

async function page({ params }: { params: { id: string } }) {
  let selectItem: CookingListItemProps | undefined;

  try {
    const querySnapshot = await getDocs(query(collection(db, "cooking_list")));
    const foodItems: CookingListItemProps[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as CookingListItemProps;
      foodItems.push(data);
    });

    selectItem = foodItems.find((item) => item.id == params.id);
  } catch (e) {
    console.error(e);
    return null;
  }
  return (
    <div>
      <main>
        <div className="labView">
          <div className="subTitle mb_show">
            <h3>요리해요</h3>
          </div>

          <div className="cooking_view_wrap">
            <div className="view_title">
              <div className="inner">
                <span className="label">요리해요</span>
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

              <ReviewBox />
            </div>
            <div className="btn_box center m-mt">
              <Link href={"/cooking/list/1"} className="btn">
                목록으로
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
