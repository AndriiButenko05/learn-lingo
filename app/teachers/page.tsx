"use client";

import { Teacher } from "@/types/teacher";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "@/lib/firebase";
import TeachersList from "@/components/TeachersList/TeachersList";

export default function Teachers() {
  const [language, setLanguage] = useState<
    "English" | "French" | "German" | "Ukrainian" | "Polish"
  >("English");
  const [level, setLevel] = useState<"A1" | "A2" | "B1" | "B2">("A1");
  const [price, setPrice] = useState<"10" | "20" | "30" | "40">("30");
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
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
          setFilteredTeachers(cleanList);
        }
      } catch (error) {
        console.error("Помилка:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);
  return (
    <section className="bg-[#F6F6F6]">
      <div className="container">
        <TeachersList
          teachers={allTeachers}
          currentFilterLevel={level}
        ></TeachersList>
      </div>
    </section>
  );
}
