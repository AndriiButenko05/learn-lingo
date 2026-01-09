import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RadioButtons from "../BookLesson/RadioButtons/RadioButtons";

interface BookFormProps {
  onSubmit: () => void;
}
const schema = yup.object({
  name: yup.string().required("Name is required").min(2),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().min(9).required("Phone is required"),
});

const BookForm = ({ onSubmit }: BookFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleBook = () => {
    onSubmit();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleBook)}>
      <RadioButtons />
      <div className="flex flex-col gap-[18px] mb-10">
        <div>
          <input
            {...register("name")}
            placeholder="Full Name"
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
        <div>
          <input
            type="phone"
            {...register("phone")}
            placeholder="Phone number:"
            className="placeholder-[#121417] border border-[rgba(18,20,23,0.1)] rounded-[12px] p-4 h-[54px] w-[472px] hover:border-[#F4C550] focus:border-[#F4C550] outline-0 mb-2 transition-colors ease-out"
          />
          <p className="text-[16px] text-red-600 ">{errors.phone?.message}</p>
        </div>
      </div>

      <button
        type="submit"
        className="w-[472px] h-[60px]  bg-[#F4C550] rounded-xl font-bold text-[18px] leading-[28px] hover:bg-[#FFDC86] transition-colors"
      >
        Book
      </button>
    </form>
  );
};

export default BookForm;
