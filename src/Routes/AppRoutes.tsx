import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import LoginPage from "./LoginPage";
import SignupPage from "./SignUpPage";
import VerifyEmail from "./VerifyEmail";
import HomePage from "./Home/HomePage";
import LecturePage from "./Home/LecturePage";
import RequestResetPassword from "./RequestResetPassword";
import ResetPassword from "./ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect base URL to /home if user is logged in */}
        <Route
          path="/"
          element={
            <GuestRoute>
              <App />
            </GuestRoute>
          }
        />
        <Route
          path="login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="signup"
          element={
            <GuestRoute>
              <SignupPage />
            </GuestRoute>
          }
        />
        <Route
          path="verify"
          element={
            <GuestRoute>
              <VerifyEmail />
            </GuestRoute>
          }
        />
        <Route
          path="reset"
          element={
            <GuestRoute>
              <RequestResetPassword />
            </GuestRoute>
          }
        />
        <Route
          path="reset-password"
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        >
          {/* Nested Route for LecturePage */}
          <Route
            path="lecture/:lectureId"
            element={
              <ProtectedRoute>
                <LecturePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;