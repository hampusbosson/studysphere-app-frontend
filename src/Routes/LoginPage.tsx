import React, { useState } from "react";
import InputField from "../components/Auth/InputField";
import SubmitButton from "../components/Auth/SubmitButton";
import Logo from "../components/Header/Logo";
import { login } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import { getUserFromSession } from "../utils/authUtils";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
  
    try {
      await login(email, password); 

      const userData = await getUserFromSession();
      setUser(userData);

      navigate('/home'); // Redirect only on success
    } catch (error) {
      console.error("Login failed:", error); // Log any errors
      alert("Login failed. Please try again."); // Provide feedback to the user
    }
  };

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
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full justify-center items-center"
      >
        <InputField
          type="email"
          value={email}
          placeholder="Email Address"
          onValueChange={setEmail}
        />
        <InputField
          type="password"
          value={password}
          placeholder="Password"
          onValueChange={setPassword}
        />
        <div className="w-72 -mt-3">
          <button className="underline text-left text-sm pl-1 font-medium text-gray-300">
            Forgot your password?
          </button>
        </div>
        <SubmitButton title="Login" />
      </form>
      <button className="flex flex-row gap-1 mt-3 group">
        Dont have an account?
        <p className="underline font-semibold group-hover:text-accent">
          Sign Up
        </p>
      </button>
    </div>
  );
};

export default LoginPage;
