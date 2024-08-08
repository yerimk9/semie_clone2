import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ic_right from "../../../public/images/right.png";
import il_samie_1 from "../../../public/svgs/il_samie_1-1.svg";
import { GuideModalProps } from "../types";
import parse from "html-react-parser";

function GuideModal({ list, isModal, setIsModal }: GuideModalProps) {
  return (
    <div className={`guideWrap ${isModal && "block"}`}>
      <div className="guide_modal">
        <div className="guide_modal_head">
          <div className="guide_modal_head_title">
            <h3>
              <Image src={il_samie_1} alt="" width={70} height={70} />
              요리초보가이드
            </h3>
            <Link href={"/guide/list/1"} className="btn_arrow_lg">
              전체보기
              <Image src={ic_right} alt="" width={40} height={40} />
            </Link>
          </div>
          <button type="button" className="close" onClick={setIsModal}>
            ×
          </button>
        </div>
        <div className="guide_modal_body">
          <div className="guide_modal_cont">
            <ul>
              {list.map((food, index) => (
                <li key={index}>
                  <Link href={`/guide/archive/${food.id}`}>
                    <div className="img">
                      <Image
                        src={food["main_img"]}
                        alt=""
                        width={1280}
                        height={1280}
                      />
                      <span className="morePic">{food["items"]?.length}</span>
                    </div>
                    <div className="text">
                      <p>{parse(food.title)}</p>
                      <span>{parse(food.subTitle)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={"/"} className="allMore">
              전체보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideModal;
