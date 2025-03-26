import React, { useState } from "react";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../../../lib/auth";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../features/auth/components/ConfirmationModal";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Extract the token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, newPassword);
      setModalMessage('Password succesfully reset!');
      setModalVisible(true);
    } catch (error) {
        if (error instanceof AxiosError) {
            setErrorMessage("An error occurred. Please try again.");
        } else {
            setErrorMessage("An error occurred. Please try again.");
        }
    }
  };

  const handleLoginRedirect = () => navigate('/login');

  const handleModalClose = () => setModalVisible(false);

  return (
    <div className="w-full flex flex-col justify-center items-center bg-background h-screen">
      <h1 className="text-silver text-4xl mb-6">Reset Your Password</h1>
      <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border border-zinc-600 bg-[#1A1C2999] placeholder-gray-300 p-3 rounded-lg w-72 focus:outline-accent"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-zinc-600 bg-[#1A1C2999] placeholder-gray-300 p-3 rounded-lg w-72 focus:outline-accent"
        />
        {errorMessage && <p className="text-red-500 text-xs -mt-2">{errorMessage}</p>}
        <button
          type="submit"
          className="bg-accent text-white py-2 px-4 rounded-lg mt-2 hover:bg-accentHover"
        >
          Reset Password
        </button>
        <button className="font-semibold hover:bg-gray-900 rounded-lg p-2" onClick={handleLoginRedirect}>
            Login
        </button>
      </form>
      {modalVisible && (
        <ConfirmationModal message={modalMessage} onClose={handleModalClose}/>
      )} 
    </div>
  );
};

export default ResetPassword;