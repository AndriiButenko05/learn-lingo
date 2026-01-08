"use client";
import { Teacher } from "@/types/teacher";
import TeacherCard from "../TeacherCard/TeacherCard";

interface TeachersListInterface {
  teachers: Teacher[];
  currentFilterLevel: string;
}

export default function TeachersList({
  teachers,
  currentFilterLevel,
}: TeachersListInterface) {
  return (
    <div className="w-full">
      <ul className="flex flex-col gap-8 items-center">
        {teachers.map((teacher, index) => (
          <TeacherCard
            key={index}
            teacher={teacher}
            currentFilterLevel={currentFilterLevel}
          />
        ))}
      </ul>
    </div>
  );
}
