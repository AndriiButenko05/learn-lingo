import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="">
      <div className="mb-6">
        <div className="container">
          <div className="flex flex-row gap-6 h-[530px] ">
            <div className="flex-1 rounded-[30px] bg-[#f8f8f8] py-[64px] px-[98px] ">
              <h1 className="font-medium text-5xl mb-8 leading-[56px]">
                Unlock your potential with the best{" "}
                <span className="inline-block bg-[#9FBAAE] italic font-normal rounded-lg px-2 leading-none">
                  language
                </span>{" "}
                tutors
              </h1>
              <p className="text-[16px] leading-5.5 mb-[64px]">
                Embark on an Exciting Language Journey with Expert Language
                Tutors: Elevate your language proficiency to new heights by
                connecting with highly qualified and experienced tutors.
              </p>
              <Link
                href="/teachers"
                className="w-[267px] h-[60px] rounded-xl px-[88px] py-[16px] bg-[#9FBAAE] text-black font-bold text-center text-[17px] leading-7 hover:bg-[#CBDED3] transition-all ease-out"
              >
                Get started
              </Link>
            </div>
            <Image
              src="/hero.jpg"
              alt="girl with laptop"
              width={568}
              height={530}
            ></Image>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </section>
  );
}
