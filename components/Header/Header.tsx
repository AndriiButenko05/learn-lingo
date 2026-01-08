"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();
  return (
    <header className="pt-6 pb-6 text-[#121417] w-[1184px] mx-auto">
      <div className="container">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2">
            <Image
              src="/ukraine.png"
              alt="ukraine flag"
              width="28"
              height="28"
            ></Image>
            <Link href="/">
              <p className="text-xl font-medium leading-6">LearnLingo</p>
            </Link>
          </div>
          <ul className="flex flex-row gap-12">
            <li>
              <Link
                href="/"
                className={`text-[16px] leading-5 hover:text-[#CBDED3] transition-colors ease-out ${
                  pathname === "/" ? "text-emerald-600" : "text-black"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/teachers"
                className={`text-[16px] leading-5 hover:text-[#CBDED3] transition-colors ease-out ${
                  pathname === "/teachers" ? "text-emerald-600" : "text-black"
                }`}
              >
                Teachers
              </Link>
            </li>
          </ul>
          <ul className="flex flex-row gap-4 items-center">
            <li>
              <button>
                <div className="flex flex-row items-center gap-2">
                  <svg width={20} height={20} className="fill-[#9FBAAE]">
                    <use href="/icons.svg#icon-login"></use>
                  </svg>
                  <p className="font-bold">Log in</p>
                </div>
              </button>
            </li>
            <li>
              <button className="flex justify-center items-center w-[166px] h-[48px] rounded-xl bg-[#121417] text-white font-bold hover:bg-[#CBDED3] hover:text-black transition-colors ease-out">
                Registration
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
