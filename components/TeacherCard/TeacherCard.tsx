"use client";

import { Teacher } from "@/types/teacher";
import Image from "next/image";
import { useState, useEffect } from "react";
import TeacherLevels from "../TeacherLevels/TeacherLevels";
import BookLesson from "../BookLesson/BookLesson";

import { useAuth } from "@/context/AuthContext";
import { ref, set, remove, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";

interface TeacherCardProps {
  teacher: Teacher;
  currentFilterLevel?: string;
}

export default function TeacherCard({
  teacher,
  currentFilterLevel = "",
}: TeacherCardProps) {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { user } = useAuth();

  useEffect(() => {
    if (!user || !teacher.id) return;

    const favoriteRef = ref(db, `users/${user.uid}/favorites/${teacher.id}`);

    const unsubscribe = onValue(favoriteRef, (snapshot) => {
      setIsFavorite(snapshot.exists());
    });

    return () => unsubscribe();
  }, [user, teacher.id]);

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error("Please log in to use favorites");
      return;
    }

    const favoriteRef = ref(db, `users/${user.uid}/favorites/${teacher.id}`);

    try {
      if (isFavorite) {
        await remove(favoriteRef);
        toast.success("Removed from favorites");
      } else {
        await set(favoriteRef, teacher);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating favorites");
    }
  };

  return (
    <li className="flex flex-row gap-12 items-start bg-[#FFFFFF] p-6 rounded-3xl w-full">
      <div className="relative shrink-0 p-3 border border-[#fbe9ba] rounded-full">
        <Image
          width={120}
          height={120}
          src={teacher.avatar_url}
          alt={teacher.name}
          className="rounded-full"
        />

        <div className="absolute top-[18px] right-[23px] w-3 h-3 bg-[#38cd3e] rounded-full border-2 border-white"></div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <p className="text-[#8a8a89] text-[16px] font-medium">Languages</p>
          <div className="flex gap-8 items-center">
            <div className="flex items-center gap-2">
              <svg width={16} height={16} className="fill-white stroke-black">
                <use href="/icons.svg#icon-book"></use>
              </svg>
              <p className="text-[#121417] text-[16px] font-medium leading-[24px]">
                Lessons online
              </p>
            </div>

            <p className="text-[#121417] text-[16px] font-medium leading-[24px] ">
              Lessons done: {teacher.lessons_done}
            </p>
            <div className="flex items-center gap-2">
              <svg width={16} height={16} className="fill-amber-400">
                <use href="/icons.svg#icon-star"></use>
              </svg>
              <p className="text-[#121417] text-[16px] font-medium leading-[24px]">
                Rating: {teacher.rating}
              </p>
            </div>

            <p className="text-[#121417] text-[16px] font-medium leading-[24px]">
              Price / 1 hour:{" "}
              <span className="text-[#38cd3e]">{teacher.price_per_hour}$</span>
            </p>

            <button
              onClick={handleToggleFavorite}
              className="outline-none transition-transform active:scale-90"
            >
              <svg
                width={26}
                height={26}
                className={`transition-colors duration-300 ${
                  isFavorite
                    ? "fill-[#F4C550] stroke-[#F4C550]"
                    : "fill-transparent stroke-[#121417] hover:stroke-[#F4C550]"
                }`}
              >
                <use href="/icons.svg#icon-heart"></use>
              </svg>
            </button>
          </div>
        </div>

        <h2 className="mb-8 text-[#121417] text-[24px] font-medium">
          {teacher.name} {teacher.surname}
        </h2>

        <div className="space-y-2 mb-4">
          <p className="text-[#8a8a89]">
            Speaks:{" "}
            <span className="text-[#121417] underline decoration-solid">
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
              {teacher.conditions.join(" ")}
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
                      <div className="flex items-center gap-1">
                        <svg width={16} height={16} className="fill-amber-400">
                          <use href="/icons.svg#icon-star"></use>
                        </svg>
                        <p className="text-sm">
                          {review.reviewer_rating.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8">
          <TeacherLevels
            currentFilterLevel={currentFilterLevel}
            teacherLevels={teacher.levels}
          />
        </div>

        {isInfoOpen && (
          <button
            className="py-4 px-12 bg-[#f4c550] rounded-xl font-bold mt-8 hover:bg-[#FFDC86] transition-colors"
            onClick={() => setIsBookingOpen(!isBookingOpen)}
          >
            Book trial lesson
          </button>
        )}
      </div>

      {isBookingOpen && (
        <BookLesson
          avatar_url={teacher.avatar_url}
          name={teacher.name}
          surname={teacher.surname}
          setIsBookingOpen={setIsBookingOpen}
          isBookingOpen={isBookingOpen}
        />
      )}
    </li>
  );
}
