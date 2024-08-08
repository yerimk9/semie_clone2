import Header from "./components/Header";
import Footer from "./components/Footer";
import Section1 from "./components/Section1";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";
import { FoodGuide } from "./types";
import Section4 from "./components/Section4";
import Section3 from "./components/Section3";
import Section2 from "./components/Section2";
import GuideDetailItem from "./components/GuideDetailItem";

export default async function Home() {
  let foodItems: FoodGuide[] = [];
  try {
    // Firestore에서 데이터 가져오기
    const querySnapshot = await getDocs(
      query(collection(db, "food_guide_list"))
    );

    querySnapshot.forEach((doc) => {
      const data = doc.data() as FoodGuide;
      foodItems.push(data);
    });
  } catch (e) {
    console.log(e);
  }

  return (
    <div>
      <Header />

      <main>
        <div className="section1">
          <Section1 list={foodItems} />
        </div>

        <div className="section2">
          <Section2 list={foodItems} />
        </div>

        <div className="section3">
          <Section3 />
        </div>

        <div className="section4">
          <Section4 />
        </div>
      </main>
      <Footer />
    </div>
  );
}
