import React from "react";
import { AuthProvider } from "../context/auth-context";
import { ActiveCourseProvider } from "../context/ActiveCourseContext";
import { CurrentLectureProvider } from "../context/current-lecture-context";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <AuthProvider>
        <ActiveCourseProvider>
          <CurrentLectureProvider>
            {children}
          </CurrentLectureProvider>
        </ActiveCourseProvider>
      </AuthProvider>
    );
  };