import React from "react";
import Logo from "../components/Header/Logo";
import { login, getUserFromSession } from "../utils/authUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import { AxiosError } from "axios";

const schema = z.object({
  email: z.string().email("Please provide a valid email address."),
  password: z.string(),
});

type FormFields = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

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
      await login(email, password); // Backend login request

      const userData = await getUserFromSession();
      setUser(userData);

      navigate("/home"); // Redirect only on success
    } catch (error) {
      // Handle errors and set them in the form
      if (error instanceof AxiosError && error.response?.data?.message) {
        const backendErrorMessage = error.response.data.message;
        setError("root", {
          type: "server",
          message: backendErrorMessage,
        });
      } else {
        // Handle other errors or unexpected cases
        setError("root", {
          type: "server",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  const signupRedirect = () => navigate("/signup");

  const resetPasswordRedirect = () => navigate("/reset");

  return (
    <div className="w-full flex flex-col justify-center items-center bg-background h-screen">
      <div className="absolute top-4 left-4 p-2">
        <Logo clickable={true} size={48} />
      </div>
      <div className="flex flex-col justify-center items-center gap-2 mb-8">
        <h1 className="text-silver text-4xl md:text-5xl font-bold">
          Welcome Back!
        </h1>
        <h2 className="text-gray-300 font-semibold">Please login with</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full justify-center items-center"
      >
        <input
          {...register("email")}
          type="text"
          placeholder="Email Address"
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

        {errors.root && (
          <div className="text-red-500 text-xs w-72 text-left -mt-2">
            {errors.root.message}
          </div>
        )}
        <div className="w-72 -mt-3">
          <button className="underline text-left text-sm pl-1 font-medium text-gray-300" onClick={resetPasswordRedirect}>
            Forgot your password?
          </button>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-transparent text-white py-2 px-4 rounded-lg border-silver border w-72 hover:bg-accent transition duration-200 hover:border-accent font-semibold mt-4"
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </form>
      <button
        className="flex flex-row gap-1 mt-3 group"
        onClick={signupRedirect}
      >
        Dont have an account?
        <p className="underline font-semibold group-hover:text-accent">
          Sign Up
        </p>
      </button>
    </div>
  );
};

export default LoginPage;
