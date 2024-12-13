import React, { useState } from "react";
import InputField from "../components/Auth/InputField";
import SubmitButton from "../components/Auth/SubmitButton";
import Logo from "../components/Header/Logo";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPasword, setRepeatedPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    console.log("Email:", email);
    console.log("Password:", password);
    // Add login logic here, such as calling an API
  };

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
        <InputField
          type="password"
          value={repeatedPasword}
          placeholder="Repeat Password"
          onValueChange={setRepeatedPassword}
        />
        <div className="w-72 -mt-3">
        </div>
        <SubmitButton title="Sign Up" />
      </form>
      <button className="flex flex-row gap-1 mt-3 group">
        Already have an account?
        <p className="underline font-semibold group-hover:text-accent">
          Login
        </p>
      </button>
    </div>
  );
};

export default SignupPage;