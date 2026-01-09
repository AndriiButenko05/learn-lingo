"use client";

import { Teacher } from "@/types/teacher";
import { useEffect, useMemo, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "@/lib/firebase";
import TeachersList from "@/components/TeachersList/TeachersList";
import Filters, { Language, Level, Price } from "@/components/Filters/Filters";

export default function Teachers() {
  const [language, setLanguage] = useState<Language>("English");
  const [level, setLevel] = useState<Level>("A1 Beginner");
  const [price, setPrice] = useState<Price>("30");

  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersRef = ref(db, "/");
        const snapshot = await get(teachersRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const list = Array.isArray(data) ? data : Object.values(data);
          const cleanList = list.filter((item) => item !== null) as Teacher[];
          setAllTeachers(cleanList);
        }
      } catch (error) {
        console.error("error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    return allTeachers.filter((teacher) => {
      const matchLanguage = teacher.languages.includes(language);
      const matchLevel = teacher.levels.includes(level);
      const matchPrice = teacher.price_per_hour <= Number(price);

      return matchLanguage && matchLevel && matchPrice;
    });
  }, [allTeachers, language, level, price]);
  return (
    <section className="bg-[#F6F6F6] py-[96px] ">
      <div className="container">
        <Filters
          language={language}
          setLanguage={setLanguage}
          level={level}
          setLevel={setLevel}
          price={price}
          setPrice={setPrice}
        />
        {loading && (
          <div className="flex justify-center mt-8">
            <p className="bg-[#FFFFFF] p-6 rounded-3xl text-[#121417] text-[24px] font-medium">
              Loading Teachers...
            </p>
          </div>
        )}
        {!loading && filteredTeachers.length < 1 && (
          <div className="flex justify-center mt-8 ">
            <p className="bg-[#FFFFFF] p-6 rounded-3xl text-[#121417] text-[24px] font-medium">
              No teachers was found
            </p>
          </div>
        )}
        <TeachersList
          teachers={filteredTeachers}
          currentFilterLevel={level}
        ></TeachersList>
      </div>
    </section>
  );
}
