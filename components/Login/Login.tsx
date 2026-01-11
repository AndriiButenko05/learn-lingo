import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import LoginForm from "../LoginForm/LoginForm";

interface LoginProps {
  setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
  isLoginOpen: boolean;
}
export default function Login({ setIsLoginOpen, isLoginOpen }: LoginProps) {
  const handleSubmit = () => {
    setIsLoginOpen(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="relative w-[600px] bg-white rounded-[30px] p-16">
        <button
          className="absolute top-5 right-5 hover:opacity-70 transition-opacity"
          onClick={() => setIsLoginOpen(!isLoginOpen)}
        >
          <svg width={32} height={32}>
            <use href="/icons.svg#icon-close"></use>
          </svg>
        </button>
        <h2 className="text-[40px] font-medium leading-[48px] mb-5 text-[#121417]">
          Log In
        </h2>
        <p className="text-[16px] leading-[22px] text-[#8a8a89] mb-5">
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
        <LoginForm onSubmit={handleSubmit}></LoginForm>
      </div>
    </div>
  );
}
