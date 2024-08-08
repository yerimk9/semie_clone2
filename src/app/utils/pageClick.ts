import { db } from "@/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

const pageClick = async (
  page: number,
  collectionName: string,
  size: number
) => {
  let wowList: any["item"][] = [];
  let querySnapshot;

  const pageSize = size;

  const baseQuery = query(
    collection(db, collectionName),
    orderBy("date"),
    limit(pageSize)
  );

  if (page === 1) {
    querySnapshot = await getDocs(baseQuery);
  } else {
    const prevPageSnapshot = await getDocs(baseQuery);
    const lastDoc = prevPageSnapshot.docs[prevPageSnapshot.docs.length - 1];

    querySnapshot = await getDocs(query(baseQuery, startAfter(lastDoc)));
  }

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    wowList.push(data);
  });

  return {
    wowList,
  };
};

export default pageClick;
