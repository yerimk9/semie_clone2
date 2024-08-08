import gsap from "gsap";

interface ScrollOptions {
  hideOffset?: number; // 스크롤이 아래로 내려갔을 때 숨길 위치
  showOffset?: number; // 스크롤이 위로 올라갔을 때 나타낼 위치
  duration?: number; // 애니메이션 지속 시간
  ease?: string; // 애니메이션 easing
  timeout?: number; // 타임아웃 시간
  elementSelector: string; // 애니메이션을 적용할 요소의 선택자
}

export default function createScrollHandler(
  lastScrollY: number,
  setLastScrollY: React.Dispatch<React.SetStateAction<number>>,
  scrollTimeout: NodeJS.Timeout | null,
  setScrollTimeout: React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>,
  options: ScrollOptions
) {
  const {
    hideOffset = 100,
    showOffset = 0,
    duration = 0.5,
    ease = "power2.out",
    timeout = 100,
    elementSelector,
  } = options;

  return () => {
    const element = document.querySelector(elementSelector) as HTMLElement;
    const currentScrollY = window.scrollY;

    if (element) {
      if (currentScrollY >= hideOffset) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }

      if (currentScrollY > lastScrollY) {
        // 스크롤이 아래로 내려가는 경우
        gsap.to(element, {
          y: hideOffset,
          duration,
          ease,
        });

        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        setScrollTimeout(
          setTimeout(() => {
            gsap.to(element, {
              y: showOffset,
              duration,
              ease,
            });
          }, timeout)
        );
      } else {
        // 스크롤이 위로 올라가는 경우
        gsap.to(element, {
          y: showOffset,
          duration,
          ease,
        });

        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      }

      // 현재 스크롤 위치 업데이트
      setLastScrollY(currentScrollY);
    }
  };
}
