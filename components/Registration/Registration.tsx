import { Dispatch, SetStateAction } from "react";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import toast from "react-hot-toast";

interface RegistrationProps {
  setIsRegistrationOpen: Dispatch<SetStateAction<boolean>>;
  isRegistrastionOpen: boolean;
}
export default function Registration({
  setIsRegistrationOpen,
  isRegistrastionOpen,
}: RegistrationProps) {
  const handleSubmit = () => {
    setIsRegistrationOpen(!isRegistrastionOpen);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="relative w-[600px] bg-white rounded-[30px] p-16">
        <button
          className="absolute top-5 right-5 hover:opacity-70 transition-opacity"
          onClick={() => setIsRegistrationOpen(!isRegistrastionOpen)}
        >
          <svg width={32} height={32}>
            <use href="/icons.svg#icon-close"></use>
          </svg>
        </button>
        <h2 className="text-[40px] font-medium leading-[48px] mb-5 text-[#121417]">
          Registration
        </h2>
        <p className="text-[16px] leading-[22px] text-[#8a8a89] mb-5">
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
        <RegistrationForm onSubmit={handleSubmit}></RegistrationForm>
      </div>
    </div>
  );
}
