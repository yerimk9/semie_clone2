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

/* export interface FoodGuideItem {
  id: number;
  name: string;
  desc: string;
  hashTag?: string[] | string; // 해시태그는 선택적일 수 있습니다.
  preparation_time?: number; // 준비 시간은 선택적일 수 있습니다.
  cooking_time?: number; // 조리 시간은 선택적일 수 있습니다.
  timestamp?: string; // 타임스탬프는 선택적입니다.
}

export interface FoodGuide {
  id: number;
  title: string;
  main_img: string;
  subTitle: string; // 서브 타이틀 1은 선택적입니다.
  hashTag?: string[] | string; // 해시태그는 선택적입니다.
  items?: FoodGuideItem[];
}

// export interface FoodGui

export interface FoodGuideDetailItem {
  item: {
    cooking_time: string;
    name: string;
    hashTag: string | string[];
    preparation_time: string;
    main_img: string;
    desc: string;
  };
}

export interface FoodGuideItemProps {
  item: FoodGuide;
}

export interface FoodGuideProps {
  list: FoodGuide[];
}

export interface GuideModalProps {
  list: FoodGuide[];
  isModal: boolean;
  setIsModal: () => void;
}

export interface WowListItemProps {
  // id: string;
  item: {
    id: string;
    date: string;
    imgUrl: string;
    status: string;
    title: string;
  };
}

export interface FilterProps {
  list: string[];
}

export interface CookingListItemsProps {
  author: string;
  authorDesc?: string;
  date: string;
  detail?: boolean;
  images: string[];
  imgUrl: string;
  text: string;
  title: string;
  hashTag?: string[] | string;
  ready?: {
    personNum: number;
    cooking_time: number;
    ready_time: number;
    main: string[];
    sub: string[];
    seasoning: string[];
  };
  step?: [{ desc: string; stepNm: string; tip?: string }];
}
export interface CookingListItemProps {
  item: {
    author: string;
    authorDesc?: string;
    date: string;
    detail?: boolean;
    images: string[];
    imgUrl: string;
    text: string;
    title: string;
    hashTag?: string[] | string;
    ready?: {
      personNum: number;
      cooking_time: number;
      ready_time: number;
      main: string[];
      sub: string[];
      seasoning: string[];
    };
    step?: [{ desc: string; stepNm: string; tip?: string }];
  };
}

export interface CounselingItemsProps {
  id: string;
  date: string;
  name: string;
  text: string;
  title: string;
  imgUrl?: string;
  hashTag?: string[] | string;
}
export interface CounselingItemProps {
  item: {
    id: string;
    date: string;
    name: string;
    text: string;
    title: string;
    imgUrl: string;
    hashTag: string[] | string;
  };
}
 */
