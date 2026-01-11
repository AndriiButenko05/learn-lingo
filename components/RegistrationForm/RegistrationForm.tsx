"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "@/lib/firebase";
import { useState } from "react";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
interface RegistraionFormProps {
  onSubmit: () => void;
}
const schema = yup.object({
  name: yup.string().required("Name is required").min(2),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8).required("Password is required"),
});

const RegistrationForm = ({ onSubmit }: RegistraionFormProps) => {
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: data.name,
      });
      await set(ref(db, `users/${user.uid}`), {
        name: data.name,
        email: data.email,
      });

      toast.success("Registration successful!");
      reset();
      onSubmit();
    } catch (error) {
      const firebaseError = error as FirebaseError;

      if (firebaseError.code === "auth/email-already-in-use") {
        toast.error("This email is already registered.");
      } else {
        toast.error("Something went wrong. Please try again.");
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
            {...register("name")}
            placeholder="Name"
            className="placeholder-[#121417] border border-[rgba(18,20,23,0.1)] rounded-[12px] p-4 h-[54px] w-[472px] hover:border-[#F4C550] focus:border-[#F4C550] outline-0 mb-2 transition-colors ease-out"
          />
          <p className="text-[16px] text-red-600 ">{errors.name?.message}</p>
        </div>
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
        {isLoading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
};

export default RegistrationForm;
