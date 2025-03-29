import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { paths } from "../config/paths";
import LandingRoute from "./Routes/landing";
import LoginPage from "./Routes/auth/LoginPage";
import SignupPage from "./Routes/auth/SignUpPage";
import VerifyEmail from "./Routes/auth/VerifyEmail";
import HomePage from "./Routes/app/HomePage";
import LecturePage from "./Routes/app/LecturePage";
import RequestResetPassword from "./Routes/auth/RequestResetPassword";
import ResetPassword from "./Routes/auth/ResetPassword";
import ProtectedRoute from "./Routes/ProtectedRoute";
import GuestRoute from "./Routes/GuestRoute";
import { ActiveCourseProvider } from "../context/ActiveCourseContext";
import { CurrentLectureProvider } from "../context/current-lecture-context";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ActiveCourseProvider>
        <Routes>
          {/* Redirect base URL to /home if user is logged in */}
          <Route
            path={paths.landing.path}
            element={
              <GuestRoute>
                <LandingRoute />
              </GuestRoute>
            }
          />
          <Route
            path={paths.auth.login.path}
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path={paths.auth.signup.path}
            element={
              <GuestRoute>
                <SignupPage />
              </GuestRoute>
            }
          />
          <Route
            path={paths.auth.verify.path}
            element={
              <GuestRoute>
                <VerifyEmail />
              </GuestRoute>
            }
          />
          <Route
            path={paths.auth.reset.path}
            element={
              <GuestRoute>
                <RequestResetPassword />
              </GuestRoute>
            }
          />
          <Route
            path={paths.auth.resetPassword.path}
            element={
              <GuestRoute>
                <ResetPassword />
              </GuestRoute>
            }
          />
          <Route
            path={paths.app.home.path}
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          >
            {/* Nested Route for LecturePage */}
            <Route
              path={paths.app.lecture.path}
              element={
                <ProtectedRoute>
                  <LecturePage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </ActiveCourseProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
