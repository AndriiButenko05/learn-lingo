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

          let formattedList: Teacher[] = [];

          if (Array.isArray(data)) {
            formattedList = data.map((item, index) => ({
              ...item,
              id: index.toString(),
            }));
          } else {
            formattedList = Object.keys(data).map((key) => ({
              ...data[key],
              id: key,
            }));
          }

          const cleanList = formattedList.filter((item) => item && item.name);

          setAllTeachers(cleanList);
        }
      } catch (error) {
        console.error("Помилка:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    return allTeachers.filter((teacher) => {
      const teacherLanguages = teacher.languages || [];
      const matchLanguage = teacherLanguages.includes(language);
      const teacherLevels = teacher.levels || [];
      const matchLevel = teacherLevels.includes(level);

      const matchPrice = teacher.price_per_hour <= Number(price);

      return matchLanguage && matchLevel && matchPrice;
    });
  }, [allTeachers, language, level, price]);

  return (
    <section className="bg-[#F6F6F6] py-[96px] min-h-screen">
      <div className="container max-w-[1184px] mx-auto px-4">
        <Filters
          language={language}
          setLanguage={setLanguage}
          level={level}
          setLevel={setLevel}
          price={price}
          setPrice={setPrice}
        />
        {loading ? (
          <p className="text-center mt-10">Loading...</p>
        ) : (
          <TeachersList
            teachers={filteredTeachers}
            currentFilterLevel={level}
          />
        )}
      </div>
    </section>
  );
}
