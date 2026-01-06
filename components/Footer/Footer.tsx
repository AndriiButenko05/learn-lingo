export default function Footer() {
  return (
    <footer className="">
      <div className="container">
        <div className="py-[40px] px-[122px] border-[1.5px] border-dashed border-[#9fbaae] rounded-[30px]">
          <ul className="flex flex-row justify-between items-center">
            <li>
              <div className="flex flex-row items-center gap-4">
                <h2 className="font-medium text-[28px] leading-8">32,000 +</h2>
                <p className="text-[14px] leading-4.5 text-[rgba(18,20,23,0.7)] w-[96px]">
                  Experienced tutors
                </p>
              </div>
            </li>
            <li>
              <div className="flex flex-row items-center gap-4">
                <h2 className="font-medium text-[28px] leading-8">300,000 +</h2>
                <p className="text-[14px] leading-4.5 text-[rgba(18,20,23,0.7)] w-[96px]">
                  5-star tutor reviews
                </p>
              </div>
            </li>
            <li>
              <div className="flex flex-row items-center gap-4">
                <h2 className="font-medium text-[28px] leading-8">120 +</h2>
                <p className="text-[14px] leading-4.5 text-[rgba(18,20,23,0.7)] w-[95px]">
                  Subjects taught
                </p>
              </div>
            </li>
            <li>
              <div className="flex flex-row items-center gap-4">
                <h2 className="font-medium text-[28px] leading-8">200 +</h2>
                <p className="text-[14px] leading-4.5 text-[rgba(18,20,23,0.7)] w-[96px]">
                  Tutor nationalities
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
