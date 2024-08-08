import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CounselingItemProps } from "../types";

function CounselingListItem({ item }: CounselingItemProps) {
  return (
    <>
      <Link href={`/counseling/worry/${item?.id}`}>
        {item?.imgUrl && (
          <div className="img">
            <Image
              src={item?.imgUrl}
              alt="Counseling Image"
              width={274}
              height={152}
            />
          </div>
        )}

        <div className="info">
          <span className="name">{item?.name}</span>
          <span className="date">{item?.date}</span>
        </div>
        <div className="text">
          <h4>{item?.title}</h4>
          <p>{item?.text}</p>
        </div>
        <ol className="hashWrap"></ol>
        <div className="foot">
          <div className="cmtNum">1</div>
          <Link href={"/"} className="scrap">
            스크랩
          </Link>
        </div>
      </Link>
    </>
  );
}

export default CounselingListItem;
