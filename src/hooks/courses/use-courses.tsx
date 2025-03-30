import CoursesContext from "./courses-context";
import { useContext } from "react";

export const useCourses = () => {
    const context = useContext(CoursesContext);
    if (!context) {
      throw new Error("useCourses must be used within an ActiveClassProvider");
    }
    return context;
};
