import React from "react";
import { AuthProvider } from "../hooks/auth/auth-context";
import { CoursesProvider } from "../hooks/courses/courses-context";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
        <CoursesProvider>
          {children}
        </CoursesProvider>
    </AuthProvider>
  );
};
