import React, { useState } from "react";
import Logo from "../components/Header/Logo";
import { sendResetPasswordLink } from "../utils/authUtils";
import { AxiosError } from "axios";
import ConfirmationModal from "../components/Auth/ConfirmationModal";

const RequestResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleModalClose = () => setModalVisible(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await sendResetPasswordLink(email);
      setLoading(false);
      setModalMessage("A reset link has been sent to your email!");
      setModalVisible(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        setModalMessage(
          "We could not find your email address. Make sure you've put in a valid email and that you have an account.",
        );
        setModalVisible(true);
      } else {
        console.error("Unexpected error:", error);
        setModalMessage(
          "We could not find your email address. Make sure you've put in a valid email and that you have an account.",
        );
        setModalVisible(true);
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center bg-background h-screen">
      <div className="absolute top-4 left-4 p-2">
        <Logo clickable={true} size={48} />
      </div>
      <div className="flex flex-col justify-center items-center gap-2 mb-6">
        <h1 className="text-silver text-4xl md:text-5xl font-bold">
          Reset Password
        </h1>
        <h2 className="text-gray-300 font-semibold">
          Please enter your email adress
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full justify-center items-center"
      >
        <input
          type="text"
          placeholder="Email Address"
          className="border border-zinc-600 bg-[#1A1C2999] placeholder-gray-300 p-3 rounded-lg w-72 focus:outline-accent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-transparent text-white py-2 px-4 rounded-lg border-silver border w-72 hover:bg-accent transition duration-200 hover:border-accent font-semibold mt-2"
        >
          {loading ? "Loading.." : "Reset Password"}
        </button>
      </form>
      {modalVisible && (
        <ConfirmationModal message={modalMessage} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default RequestResetPassword;
