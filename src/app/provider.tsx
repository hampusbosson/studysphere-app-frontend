import React from "react";
import { AuthProvider } from "../context/auth-context";
import { ActiveCourseProvider } from "../context/ActiveCourseContext";
import { LecturesByCourseProvider } from "../context/lectures-by-course-context";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <AuthProvider>
        <ActiveCourseProvider>
          <LecturesByCourseProvider>
            {children}
          </LecturesByCourseProvider>
        </ActiveCourseProvider>
      </AuthProvider>
    );
  };