import React from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Header/Logo";
import { signup } from "../utils/authUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    email: z.string().email("Please provide a valid email address."),
    password: z
      .string()
      .min(7, "Password must be at least 7 characters long.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter."),
    repeatedPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: "Passwords must match.",
    path: ["repeatedPassword"], // Points to the field with the issue
  });

type FormFields = z.infer<typeof schema>;

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { email, password } = data;
    try {
      await signup(email, password);
      
      navigate("/verify", {state: { email, password } });

    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      if (axiosError.message) {
        // Use the backend error message
        setError("root", {
          type: "server",
          message: axiosError.message, // Display the backend error message
        });
      } else {
        // Fallback for unexpected errors
        setError("root", {
          type: "server",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  const loginRedirect = () => navigate('/login');

  return (
    <div className="w-full flex flex-col justify-center items-center bg-background h-screen">
      <div className="absolute top-4 left-4 p-2">
        <Logo clickable={true} size={48} />
      </div>
      <div className="flex flex-col justify-center items-center gap-2 mb-8">
        <h1 className="text-silver text-4xl md:text-5xl font-bold">
          Lets get you setup!
        </h1>
        <h2 className="text-gray-300 font-semibold">Please sign up with</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full justify-center items-center"
      >
        <input
          {...register("email")}
          type="text"
          placeholder="Email"
          className="border border-zinc-600 bg-[#1A1C2999] placeholder-gray-300 p-3 rounded-lg w-72 focus:outline-accent"
        />
        {errors.email && (
          <div className="text-red-500 text-xs w-72 text-left -m-2">
            {errors.email.message}
          </div>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="border border-zinc-600 bg-[#1A1C2999] placeholder-gray-300 p-3 rounded-lg w-72 focus:outline-accent"
        />
        {errors.password && (
          <div className="text-red-500 text-xs w-72 text-left -m-2">
            {errors.password.message}
          </div>
        )}
        <input
          {...register("repeatedPassword")}
          type="password"
          placeholder="Repeat Password"
          className="border border-zinc-600 bg-[#1A1C2999] placeholder-gray-300 p-3 rounded-lg w-72 focus:outline-accent"
        />
        {errors.repeatedPassword && (
          <div className="text-red-500 text-xs w-72 text-left -m-2">
            {errors.repeatedPassword?.message}
          </div>
        )}

        {errors.root && (
          <div className="text-red-500 text-xs w-72 text-left -mt-2">
            {errors.root.message}
          </div>
        )}
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-transparent text-white py-2 px-4 rounded-lg border-silver border w-72 hover:bg-accent transition duration-200  hover:border-accent font-semibold mt-4"
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
      <button className="flex flex-row gap-1 mt-3 group" onClick={loginRedirect}>
        Already have an account?
        <p className="underline font-semibold group-hover:text-accent">Login</p>
      </button>
    </div>
  );
};

export default SignupPage;
