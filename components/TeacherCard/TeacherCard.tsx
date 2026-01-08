"use client";
import { Teacher } from "@/types/teacher";
import Image from "next/image";
import { useState } from "react";
import TeacherLevels from "../TeacherLevels/TeacherLevels";

interface TeacherCardProps {
  teacher: Teacher;
  currentFilterLevel: string;
}

export default function TeacherCard({
  teacher,
  currentFilterLevel,
}: TeacherCardProps) {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  return (
    <li className="flex flex-row gap-12 items-start bg-[#FFFFFF] p-6 rounded-3xl w-full max-w-296">
      <div className="relative shrink-0 p-3 border border-[#fbe9ba] rounded-full">
        <Image
          width={120}
          height={120}
          src={teacher.avatar_url}
          alt={teacher.name}
          className="rounded-full"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <p className="text-[#8a8a89] text-[16px] font-medium">Languages</p>
          <div className="flex gap-8">
            <p>Rating: {teacher.rating}</p>
            <p>
              Price:{" "}
              <span className="text-[#38cd3e]">{teacher.price_per_hour}$</span>
            </p>
          </div>
        </div>

        <h2 className="mb-8 text-[#121417] text-[24px] font-medium">
          {teacher.name} {teacher.surname}
        </h2>

        <div className="space-y-2 mb-4">
          <p className="text-[#8a8a89]">
            Speaks:{" "}
            <span className="text-[#121417] underline">
              {teacher.languages.join(", ")}
            </span>
          </p>
          <p className="text-[#8a8a89]">
            Lesson info:{" "}
            <span className="text-[#121417]">{teacher.lesson_info}</span>
          </p>
          <p className="text-[#8a8a89]">
            Conditions:{" "}
            <span className="text-[#121417]">
              {teacher.conditions.join(", ")}
            </span>
          </p>
        </div>

        {!isInfoOpen && (
          <button
            onClick={() => setIsInfoOpen(true)}
            className="underline font-medium text-[16px] [text-decoration-skip-ink:none]"
          >
            Read more
          </button>
        )}

        {isInfoOpen && (
          <div className="mt-4">
            <p className="mb-8 text-[#121417]">{teacher.experience}</p>

            <ul className="space-y-8">
              {teacher.reviews.map((review, idx) => (
                <li key={idx}>
                  <div className="flex gap-3 items-center mb-4">
                    <Image
                      src="/review.png"
                      alt="reviewer"
                      width={44}
                      height={44}
                    />
                    <div>
                      <p className="text-[#8a8a89] text-sm">
                        {review.reviewer_name}
                      </p>
                      <p className="text-sm">
                        {review.reviewer_rating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>

            <button className="py-4 px-12 bg-[#f4c550] rounded-xl font-bold mt-8">
              Book trial lesson
            </button>
          </div>
        )}

        <div className="mt-8">
          <TeacherLevels
            currentFilterLevel={currentFilterLevel}
            teacherLevels={teacher.levels}
          />
        </div>
      </div>
    </li>
  );
}
