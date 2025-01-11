import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import LoginPage from "./LoginPage";
import SignupPage from "./SignUpPage";
import VerifyEmail from "./VerifyEmail";
import HomePage from "./HomePage";
import RequestResetPassword from "./RequestResetPassword";
import ResetPassword from "./ResetPassword";
import ProtectedRoute from "./ProtectedRoute";


const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<LoginPage />}/>
        <Route path="signup" element={<SignupPage />}/> 
        <Route path="verify" element={<VerifyEmail />}></Route>
        <Route path="reset" element={<RequestResetPassword />}></Route>
        <Route path="reset-password" element={<ResetPassword />} />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;