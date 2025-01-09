import React, { useRef, useState } from "react";
import Logo from "../components/Header/Logo";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOTP, verifyEmail, login } from "../utils/authUtils";


const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; // Allow only a single digit (0-9)

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = async () => {
    await resendOTP(email);
    console.log("otp resent");
  };

  const handleVerify = async () => {
    console.log(email);
    console.log(password);
    try {
      // Verify email with OTP
      const verified = await verifyEmail(email, otp.join(""));

      if (verified) {
        console.log("Email verified!");
        
        // Login after successful verification
        const token = await login(email, password);
        console.log("Logged in successfully, token:", token);
        
        navigate("/home");
      } else {
        console.log("Email not verified!");
      }
    } catch (error) {
      console.error("Error verifying email or logging in:", error);
    }
  };

  return (
    <div className="bg-background h-screen w-full flex flex-col justify-center items-center">
      <div className="absolute top-4 left-4 p-2">
        <Logo clickable={true} size={48} />
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl font-semibold font-montserrat">
          Verify Your Email
        </h1>
        <h2 className="mt-4">
          Please enter the 6-digit code sent to your email address.
        </h2>
        <div className="flex gap-2">
          {otp.map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)} // Assign each input ref
              type="text"
              value={otp[index]}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl border border-gray-500 rounded-md outline-none focus:border-silver focus:ring-1 focus:ring-silver bg-transparent text-white leading-[3rem] font-medium"
            />
          ))}
        </div>
        <button
          className="mt-6 w-56 py-2 bg-transparent text-white border-silver border rounded-lg hover:bg-accent hover:border-accent transition"
          onClick={handleVerify}
        >
          Verify
        </button>
        <button
          className="font-medium mt-1 hover:bg-gray-900 py-2 rounded-lg w-56"
          onClick={handleResendOTP}
        >
          Resend Verification Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
