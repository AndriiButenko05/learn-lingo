"use client";
import { useState, useRef, useEffect } from "react";

export type Language = "English" | "French" | "German" | "Ukrainian" | "Polish";

export type Level =
  | "A1 Beginner"
  | "A2 Elementary"
  | "B1 Intermediate"
  | "B2 Upper-Intermediate";

export type Price = "10" | "20" | "30" | "40";

interface CustomSelectProps {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  width: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

function CustomSelect({
  id,
  label,
  options,
  value,
  onChange,
  width,
  isOpen,
  onToggle,
}: CustomSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (isOpen) onToggle("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div ref={containerRef} className={`flex flex-col gap-2 relative ${width}`}>
      <label className="text-[14px] font-medium leading-[18px] text-[#8a8a89]">
        {label}
      </label>

      <div
        onClick={() => onToggle(isOpen ? "" : id)}
        className="h-12 py-[12px] px-[18px] rounded-2xl bg-[#fff] flex items-center justify-between cursor-pointer outline-none transition-all shadow-sm hover:shadow-md"
      >
        <span className="text-[18px] font-medium text-[#121417]">
          {id === "price" ? `${value} $` : value}
        </span>

        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <use href="#icon-down"></use>
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute top-[105%] left-0 w-full bg-[#fff] rounded-2xl p-[18px] shadow-[0_20px_69px_0_rgba(0,0,0,0.07)] z-50 flex flex-col gap-2 border border-gray-50">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                onToggle("");
              }}
              className={`text-[18px] font-medium cursor-pointer transition-colors hover:text-[#121417] ${
                option === value ? "text-[#121417]" : "text-[#12141733]"
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface FiltersProps {
  language: Language;
  setLanguage: (val: Language) => void;
  level: Level;
  setLevel: (val: Level) => void;
  price: Price;
  setPrice: (val: Price) => void;
}

export default function Filters({
  language,
  setLanguage,
  level,
  setLevel,
  price,
  setPrice,
}: FiltersProps) {
  const [openId, setOpenId] = useState<string>("");

  const languages: Language[] = [
    "English",
    "French",
    "German",
    "Ukrainian",
    "Polish",
  ];
  const levels: Level[] = [
    "A1 Beginner",
    "A2 Elementary",
    "B1 Intermediate",
    "B2 Upper-Intermediate",
  ];
  const prices: Price[] = ["10", "20", "30", "40"];

  const handleToggle = (id: string) => {
    setOpenId(id);
  };

  return (
    <div className="">
      <svg className="hidden">
        <symbol id="icon-down" viewBox="0 0 32 32">
          <path d="M16 20.269c-0.149 0-0.29-0.027-0.422-0.083s-0.259-0.143-0.381-0.265l-6.592-6.592c-0.227-0.227-0.334-0.497-0.323-0.812s0.13-0.586 0.357-0.812c0.227-0.227 0.497-0.34 0.812-0.34s0.586 0.113 0.812 0.34l5.738 5.771 5.771-5.771c0.227-0.227 0.492-0.334 0.796-0.323s0.569 0.13 0.796 0.357c0.227 0.227 0.34 0.497 0.34 0.812s-0.113 0.586-0.34 0.812l-6.559 6.559c-0.122 0.122-0.249 0.21-0.381 0.265s-0.273 0.083-0.422 0.083z"></path>
        </symbol>
      </svg>

      <div className="flex flex-wrap gap-5">
        <CustomSelect
          id="lang"
          label="Languages"
          width="w-[221px]"
          options={languages}
          value={language}
          onChange={(val) => setLanguage(val as Language)}
          isOpen={openId === "lang"}
          onToggle={handleToggle}
        />

        <CustomSelect
          id="level"
          label="Level of knowledge"
          width="w-[221px]"
          options={levels}
          value={level}
          onChange={(val) => setLevel(val as Level)}
          isOpen={openId === "level"}
          onToggle={handleToggle}
        />

        <CustomSelect
          id="price"
          label="Price"
          width="w-[124px]"
          options={prices}
          value={price}
          onChange={(val) => setPrice(val as Price)}
          isOpen={openId === "price"}
          onToggle={handleToggle}
        />
      </div>
    </div>
  );
}
