import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
} from "firebase/firestore";

const pageClick = async <T>(
  page: number,
  collectionName: string,
  size: number
): Promise<{ dataList: T[] }> => {
  let dataList: T[] = [];
  let querySnapshot;

  const pageSize = size;

  const baseQuery = query(collection(db, collectionName), limit(pageSize));

  if (page === 1) {
    querySnapshot = await getDocs(baseQuery);
  } else {
    const prevPageSnapshot = await getDocs(baseQuery);
    const lastDoc = prevPageSnapshot.docs[prevPageSnapshot.docs.length - 1];

    querySnapshot = await getDocs(query(baseQuery, startAfter(lastDoc)));
  }

  querySnapshot.forEach((doc) => {
    const data = doc.data() as T;
    dataList.push(data);
  });

  return {
    dataList,
  };
};

export default pageClick;
