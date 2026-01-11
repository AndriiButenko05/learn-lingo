"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import { useState } from "react";
interface LoginFormProps {
  onSubmit: () => void;
}
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  type FormData = yup.InferType<typeof schema>;

  const onFormSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Successfully logged in!");
      reset();
      onSubmit();
    } catch (error) {
      const firebaseError = error as FirebaseError;

      if (
        firebaseError.code === "auth/invalid-credential" ||
        firebaseError.code === "auth/user-not-found" ||
        firebaseError.code === "auth/wrong-password"
      ) {
        toast.error("Invalid email or password.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="flex flex-col gap-[18px] mb-10">
        <div>
          <input
            {...register("email")}
            placeholder={"Email"}
            className="placeholder-[#121417] border border-[rgba(18,20,23,0.1)] rounded-[12px] p-4 h-[54px] w-[472px] hover:border-[#F4C550] focus:border-[#F4C550] outline-0 mb-2 transition-colors ease-out"
          />
          <p className="text-[16px] text-red-600 ">{errors.email?.message}</p>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className="w-full placeholder-[#121417] border border-[rgba(18,20,23,0.1)] rounded-[12px] p-4 h-[54px] pr-12 hover:border-[#F4C550] focus:border-[#F4C550] outline-none transition-colors ease-out"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
          >
            {showPassword ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>

          <p className="text-[14px] text-red-600 mt-1">
            {errors.password?.message}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-[60px] bg-[#F4C550] rounded-xl font-bold text-[18px] leading-[28px] hover:bg-[#FFDC86] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
