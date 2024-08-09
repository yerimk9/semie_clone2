"use client";
import Image from "next/image";
import React, { useState } from "react";
import ic_down from "@/../public/images/ic_down.png";

function EventNotice() {
  const [onOpen, setOnOpen] = useState(false);

  const onToggle = () => {
    setOnOpen((prev) => !prev);
  };

  return (
    <div className={`event_notice ${onOpen && "is-active"}`}>
      <h4 className="event_notice_title">주의사항</h4>
      <ul className="event_notice_content">
        <li>
          새미즈는 요리를 하고 싶지만 어떻게 할 지 막막한 요리초보를 대상으로
          운영되는 챌린지형 프로그램으로, 신청하기 폼에 응답해주신 항목에 따라
          내부 기준에 맞춰 선별될 예정입니다.
        </li>
        <li>
          신청하기 진행 시, 본인에게 해당되는 답변으로 진실성 있게 답해주시기
          바랍니다.
        </li>
        <li>
          선발된 &lt;새미즈&gt;는 별도 LMS 등을 통해 선정 안내 드릴 예정이며,
          미션, 주의사항, 리워드 등 모든 안내는 LMS 등으로 진행될 예정입니다.
        </li>
        <li>
          활동기간에 맞춰 전달되는 미션을 모두 수행해야 하며, 별도의 사유 없이
          미션 불 이행 혹은 미 참석 시, 참여혜택에 대한 반환 요청 및 비용 처리를
          요구할 수 있습니다.
        </li>
        <li>
          잘못된 개인정보 입력으로 인해 선정자에게 연락이 불가능하거나, 리워드가
          미수신 되는 경우, 제품이 반송/분실될 경우, 재발송되지 않으며 당사에서
          책임지지 않습니다.
        </li>
        <li>
          모든 리워드는 환불, 현금 지급되지 않으며, 타인에게 양도 및 드림,
          판매가 불가능합니다.
        </li>
        <li>
          부정한 방법 또는 비정상적인 접근을 통한 미션 참여의 경우 선정 및
          리워드 제공이 취소될 수 있습니다.
        </li>
        <li>
          활동을 통해 진행된 내용 및 콘텐츠 등에 대한 저작권 등 일체의
          권리(2차적 저작물 및 온/오프라인 편집 저작물 작성권 포함)는 샘표로
          귀속됩니다.
        </li>
        <li>
          이벤트 진행 일정과 내용, 경품 등은 당사 사정에 의해 예고 없이 중단
          또는 변경될 수 있으며, 발표일과 배송일정은 당사 사정에 의해 지연될 수
          있습니다.{" "}
        </li>
      </ul>
      <div className="event_notice_func">
        <button
          type="button"
          className="btn_arrow_lg show-text"
          onClick={onToggle}
        >
          더보기
          <Image src={ic_down} alt="" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}

export default EventNotice;
