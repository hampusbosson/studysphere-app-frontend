import React, { useState } from "react";
import { api } from "../utils/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/reset-password", { token, newPassword: password });
      setMessage("Password reset successful!");
      navigate("/login");
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.data?.message) {
            setMessage(error.response?.data?.message || "Something went wrong.");
        }
    }
  };

  return (
    <div>
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;