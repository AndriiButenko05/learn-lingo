"use client";
import { Teacher } from "@/types/teacher";
import TeacherCard from "../TeacherCard/TeacherCard";
import { useEffect, useState } from "react";

interface TeachersListInterface {
  teachers: Teacher[];
  currentFilterLevel: string;
}

export default function TeachersList({
  teachers,
  currentFilterLevel,
}: TeachersListInterface) {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="w-full">
      <ul className="flex flex-col gap-8 items-center mt-8">
        {teachers.slice(0, visibleCount).map((teacher, index) => (
          <TeacherCard
            key={index}
            teacher={teacher}
            currentFilterLevel={currentFilterLevel}
          />
        ))}
      </ul>
      {visibleCount < teachers.length && (
        <div className="flex justify-center mt-16">
          <button
            onClick={handleLoadMore}
            className="w-[183px] h-[60px]  bg-[#F4C550] rounded-xl font-bold text-[18px] leading-[28px] hover:bg-[#FFDC86] transition-colors"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
