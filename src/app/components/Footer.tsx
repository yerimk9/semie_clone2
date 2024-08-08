"use client";

import Image from "next/image";
import Link from "next/link";
import React, { MouseEvent, useEffect, useState } from "react";
import downArrow from "../../../public/images/down.png";
import logoAward from "../../../public/images/logo_award.png";
import ic_insta from "../../../public/images/ic_insta.png";
import ic_kakao from "../../../public/images/ic_kakao.png";
import ic_plus_b from "../../../public/images/ic_plus_b.png";
import createScrollHandler from "../utils/scrollUtils";

function Footer() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [siteListVisible, setSiteListVisible] = useState(false);
  const [bizInfoVisible, setBizInfoVisible] = useState(false);
  const handleScroll = createScrollHandler(
    lastScrollY,
    setLastScrollY,
    scrollTimeout,
    setScrollTimeout,
    {
      elementSelector: ".ft_top",
      hideOffset: 100, // 원하는 값으로 조정
      showOffset: 0, // 원하는 값으로 조정
      duration: 0.5,
      ease: "power2.out",
    }
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [handleScroll, scrollTimeout]);
  /*   const handleScroll = useCallback(() => {
    const topBtn = document.querySelector(".ft_top") as HTMLElement;
    const currentScrollY = window.scrollY;

    if (topBtn) {
      if (currentScrollY > lastScrollY) {
        // 스크롤이 아래로 내려가는 경우
        gsap.to(topBtn, {
          y: 100, // 버튼을 화면 아래로 숨김
          duration: 0.5,
          ease: "power2.out",
        });

        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        // 일정 시간 후에 버튼 다시 표시
        setScrollTimeout(
          setTimeout(() => {
            gsap.to(topBtn, {
              y: 0, // 버튼을 원래 위치로 복원
              duration: 0.5,
              ease: "power2.out",
            });
          }, 100) // 1.5초 후에 다시 나타나게 함
        );
      } else {
        // 스크롤이 위로 올라가는 경우
        gsap.to(topBtn, {
          y: 0, // 버튼을 즉시 표시
          duration: 0.5,
          ease: "power2.out",
        });

        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      }

      // 현재 스크롤 위치 업데이트
      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY, scrollTimeout]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [handleScroll, scrollTimeout]); */

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSiteList = (event: MouseEvent<HTMLButtonElement>) => {
    setSiteListVisible((prev) => !prev);
  };

  const toggleBizInfo = (event: MouseEvent<HTMLUListElement>) => {
    setBizInfoVisible((prev) => !prev);
  };

  return (
    <footer>
      <div className="inner">
        <div className="ft_left">
          <ul className="ft_link">
            <li>
              <Link href={"/"}>이용약관</Link>
            </li>
            <li>
              <Link href={"/"}>개인정보처리방침</Link>
            </li>
            <li>
              <Link href={"/"}>이용 가이드</Link>
            </li>
            <li>
              <Link href={"/"}>ABOUT US</Link>
            </li>
          </ul>
          <ul className="ft_info" onClick={toggleBizInfo}>
            <li>샘표식품(주)</li>
            <li>
              사업자 정보
              <Image
                src={downArrow}
                alt="downArrow"
                width={20}
                height={20}
                className={`${bizInfoVisible && "active"}`}
              />
            </li>
          </ul>
          <div className={`ft_info_drop ${bizInfoVisible && "block"}`}>
            대표이사: 박진선
            <br />
            사업자 번호: 446-87-00473
            <br />
            주소 : 서울특별시 중구 충무로2 (우편번호 : 04557)
          </div>
          <p>Copyright &copy; 샘표식품, All Rights Reserved.</p>
        </div>
        <div className="ft_right">
          <ul className="ft_sns">
            <li className="logo_award">
              <Image src={logoAward} alt="logoAward" width={90} height={35} />
            </li>
            <li>
              <Link
                href={"https://www.instagram.com/semie_kitchen/"}
                target="_blank"
              >
                <Image src={ic_insta} alt="ic_insta" width={23} height={23} />
              </Link>
            </li>
            <li>
              <Link href={"https://pf.kakao.com/_Hxoxkxab"} target="_blank">
                <Image src={ic_kakao} alt="ic_kakao" width={23} height={23} />
              </Link>
            </li>
            <li className="sitemap">
              <button
                className={`${siteListVisible && "on"}`}
                type="button"
                onClick={toggleSiteList}
              >
                관련사이트
                <Image src={ic_plus_b} alt="ic_plus_b" width={16} height={16} />
              </button>
              <div className={`siteList ${siteListVisible && "visible"}`}>
                <ul>
                  <li>
                    <Link
                      href={"http://www.tasiakitchen.co.kr/"}
                      target="_blank"
                    >
                      샘표 기업
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"http://www.semie-kitchen.com/"}
                      target="_blank"
                    >
                      새미네부엌 플랫폼
                    </Link>
                  </li>
                  <li>
                    <Link href={"http://www.fontanastyle.com/"} target="_blank">
                      티·아시아
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"https://www.semie-kitchen.com/default/"}
                      target="_blank"
                    >
                      새미네부엌
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"https://www.fontanastyle.com/main.do"}
                      target="_blank"
                    >
                      폰타나
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={
                        "https://sempio.recruiter.co.kr/appsite/company/index"
                      }
                      target="_blank"
                    >
                      샘표 채용
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"https://member.sempio.com/login"}
                      target="_blank"
                    >
                      샘표 통합회원 웹사이트
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <button className="ft_top" type="button" onClick={scrollToTop}>
            맨 위로
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
