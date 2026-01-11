"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isRegistrastionOpen, setIsRegistrationOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const { user, logOut } = useAuth();

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

            {user && (
              <li>
                <Link
                  href="/favorites"
                  className={`text-[16px] leading-5 hover:text-[#CBDED3] transition-colors ease-out ${
                    pathname === "/favorites"
                      ? "text-emerald-600"
                      : "text-black"
                  }`}
                >
                  Favorites
                </Link>
              </li>
            )}
          </ul>

          <div className="flex flex-row gap-4 items-center">
            {user ? (
              <div className="flex gap-4 items-center">
                <span className="text-[16px] font-bold text-[#121417]">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={logOut}
                  className="flex justify-center items-center w-[100px] h-[48px] rounded-xl bg-[#F4C550] text-black font-bold hover:bg-[#FFDC86] transition-colors ease-out"
                >
                  Log out
                </button>
              </div>
            ) : (
              <ul className="flex flex-row gap-4 items-center">
                <li>
                  <button onClick={() => setIsLoginOpen(true)}>
                    <div className="flex flex-row items-center gap-2 font-bold hover:text-[#F4C550] transition-colors">
                      <svg width={20} height={20} className="fill-[#9FBAAE]">
                        <use href="/icons.svg#icon-login"></use>
                      </svg>
                      <p>Log in</p>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsRegistrationOpen(true)}
                    className="flex justify-center items-center w-[166px] h-[48px] rounded-xl bg-[#121417] text-white font-bold hover:bg-[#CBDED3] hover:text-black transition-colors ease-out"
                  >
                    Registration
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        {isRegistrastionOpen && (
          <Registration
            isRegistrastionOpen={isRegistrastionOpen}
            setIsRegistrationOpen={setIsRegistrationOpen}
          />
        )}
        {isLoginOpen && (
          <Login isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
        )}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </header>
  );
}
