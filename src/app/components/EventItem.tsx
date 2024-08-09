import Image from "next/image";
import Link from "next/link";
import React from "react";
import { WowList } from "../types";

function EventItem({ item }: WowList) {
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

  return (
    <Link href={`/wow/archive/${item?.id}`}>
      <div className="img">
        <Image src={item["imgUrl"]} alt="" width={476} height={268} />
      </div>
      <p className="tit">{item["title"]}</p>
      <p className="date">
        <span className={getStatusClass(item["status"])}>{item["status"]}</span>
        {item["date"]}
      </p>
    </Link>
  );
}

export default EventItem;
