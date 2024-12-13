import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import LoginPage from "./LoginPage";
import SignupPage from "./SignUpPage";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<LoginPage />}/>
        <Route path="signup" element={<SignupPage />}/> 
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;