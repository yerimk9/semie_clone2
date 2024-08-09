import Image from "next/image";
import Link from "next/link";
import React from "react";
import profileImg from "@/../public/images/profile.png";

function ReviewBox() {
  return (
    <div className="comment_wrap">
      <div className="total">
        댓글<span>1</span>
      </div>
      <div className="cmt_login">
        <div className="profile">
          <Image src={profileImg} alt="profile" width={30} height={30} />
        </div>
        <div className="loginFirst">
          <Link href={"/"}>로그인</Link>하시고 댓글을 남겨보세요.
        </div>
      </div>
      <div className="cmt_box">
        <div className="profile">
          <Image src={profileImg} alt="profile" width={30} height={30} />
        </div>
        <div className="cmt">
          <div className="name">
            샘표 연구원
            <span className="date">2024-08-05 08:37</span>
          </div>

          <div className="text">안녕하세요? 샘표 우리맛 연구원입니다!</div>
        </div>
      </div>
    </div>
  );
}

export default ReviewBox;
