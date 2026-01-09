"use client";
import Image from "next/image";
import BookForm from "../BookForm/BookForm";
import toast, { Toaster } from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";
interface BookLessonProps {
  avatar_url: string;
  name: string;
  surname: string;
  setIsBookingOpen: Dispatch<SetStateAction<boolean>>;
  isBookingOpen: boolean;
}

export default function BookLesson({
  name,
  surname,
  avatar_url,
  setIsBookingOpen,
  isBookingOpen,
}: BookLessonProps) {
  const handleSubmit = () => {
    toast.success("Successfully toasted!");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="relative w-[600px] bg-white rounded-[30px] p-16">
        <button
          className="absolute top-5 right-5 hover:opacity-70 transition-opacity"
          onClick={() => setIsBookingOpen(!isBookingOpen)}
        >
          <svg width={32} height={32}>
            <use href="/icons.svg#icon-close"></use>
          </svg>
        </button>
        <h2 className="text-[40px] font-medium leading-[48px] mb-5 text-[#121417]">
          Book trial lesson
        </h2>
        <p className="text-[16px] leading-[22px] text-[#8a8a89] mb-5">
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
        <div className="flex gap-3 items-center mb-10">
          <Image
            src={avatar_url}
            alt={name}
            width={44}
            height={44}
            className="rounded-full"
          />
          <div>
            <p className="text-[#8a8a89] text-sm">Your teacher</p>
            <p className="text-[16px] font-medium">
              {name}
              {""} {surname}
            </p>
          </div>
        </div>
        <h3 className="text-[24px] leading-[32px] font-medium mb-5">
          What is your main reason for learning English?
        </h3>
        <BookForm onSubmit={handleSubmit} />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
