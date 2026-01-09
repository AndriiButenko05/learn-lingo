"use client";
import { useState } from "react";

export default function RadioButtons() {
  const [selectedReason, setSelectedReason] = useState("Career and business");
  const reasons = [
    "Career and business",
    "Lesson for kids",
    "Living abroad",
    "Exams and coursework",
    "Culture, travel or hobby",
  ];
  return (
    <fieldset className="flex flex-col gap-4 mb-10">
      {reasons.map((reason) => (
        <label
          key={reason}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="radio"
            name="reason"
            value={reason}
            checked={selectedReason === reason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="peer hidden"
          />
          <span className="w-5 h-5 rounded-full border-[2px] border-[#e0e0e0] peer-checked:border-[#F4C550] peer-checked:[&>span]:opacity-100 flex items-center justify-center relative transition-colors">
            <span className="w-2.5 h-2.5 bg-[#F4C550] rounded-full opacity-0 transition-opacity"></span>
          </span>
          <span className="text-[16px] leading-[22px] text-[#121417]">
            {reason}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
