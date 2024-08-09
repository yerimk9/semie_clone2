export interface FoodGuideItem {
  cooking_time?: string | number;
  date: string;
  desc: string;
  hashTag?: string | string[];
  mainH?: string;
  mainT?: string;
  main_img: string;
  name: string;
  preparation_time?: string | number;
  subDesc?: string;
}

export interface FoodGuideListItem {
  id: number;
  hashTag?: string[];
  items: FoodGuideItem[];
  main_img: string;
  subTitle?: string;
  title: string;
}

export interface FoodGuideList {
  list: FoodGuideListItem[];
}

export interface CookingListItemProps {
  author: string;
  date: string;
  hashTag?: string | string[];
  id: string | number;
  images?: string[];
  imgUrl: string;
  text: string;
  title: string;
  detail?: boolean;
  ready?: {
    cooking_time?: string | number;
    main?: string[];
    personNum?: string | number;
    ready_time?: string | number;
    seasoning?: string[];
    sub?: string[];
  };
  step?: [{ desc?: string; stepNm?: string; tip?: string }];
}

export interface CookingList {
  item: CookingListItemProps;
}

export interface CounselingListItemProps {
  date: string;
  hashTag?: string[];
  id: string | number;
  imgUrl: string;
  name: string;
  text: string;
  title: string;
}

export interface CounselingList {
  item: CounselingListItem;
}

export interface WowListItem {
  id: string | number;
  date: string;
  images: string[];
  imgUrl: string;
  status: string;
  title: string;
}

export interface WowList {
  item: WowListItem;
}

export interface FoodGuideModal {
  list: FoodGuide[];
  isModal: boolean;
  setIsModal: () => void;
}

export interface FilterProps {
  list: string[];
}

export interface ScrollOptions {
  hideOffset?: number; // 스크롤이 아래로 내려갔을 때 숨길 위치
  showOffset?: number; // 스크롤이 위로 올라갔을 때 나타낼 위치
  duration?: number; // 애니메이션 지속 시간
  ease?: string; // 애니메이션 easing
  timeout?: number; // 타임아웃 시간
  elementSelector: string; // 애니메이션을 적용할 요소의 선택자
}
