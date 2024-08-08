import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CookingListItemProps } from "../types";

function CookingListItem({ item }: CookingListItemProps) {
  return (
    <>
      <Link href={"/"}>
        <div className="img">
          <Image src={item?.imgUrl} alt="" width={2268} height={3080} />
        </div>
        <div className="info">
          <span className="name">{item?.author}</span>
          <span className="date">{item?.date}</span>
        </div>
        <div className="text">
          <h4>{item?.title}</h4>
        </div>
      </Link>
      <Link href={"/"} className="scrap">
        스크랩
      </Link>
    </>
  );
}

export default CookingListItem;
