import { useContext } from "react";
import LectureByCourseContext from "./lectures-by-course-context";

export const useLectureByCourse = () => {
    const context = useContext(LectureByCourseContext);
    if (!context) {
      throw new Error('useLectureByCourse must be used within a LectureProvider');
    }
    return context;
  };