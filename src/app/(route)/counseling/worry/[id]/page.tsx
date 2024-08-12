import React from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";
import Image from "next/image";
import Link from "next/link";
import { CounselingListItemProps } from "@/app/types";
import ReviewBox from "@/app/components/ReviewBox";

async function page({ params }: { params: { id: string } }) {
  let selectItem: CounselingListItemProps | undefined;

  try {
    const querySnapshot = await getDocs(
      query(collection(db, "counseling_list"))
    );
    const foodItems: CounselingListItemProps[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as CounselingListItemProps;
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

              <ReviewBox />
            </div>
            <div className="btn_box center m-mt">
              <Link href={"/counseling/list/1"} className="btn">
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
