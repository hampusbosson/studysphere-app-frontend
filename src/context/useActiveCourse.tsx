import { useContext } from "react";
import ActiveCourseContext from "./ActiveCourseContext";

export const useActiveCourse = () => {
    const context = useContext(ActiveCourseContext);
    if (!context) {
      throw new Error("useActiveClass must be used within an ActiveClassProvider");
    }
    return context;
};