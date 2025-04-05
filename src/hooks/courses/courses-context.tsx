import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Course, Lecture } from "../../types/api";

interface CoursesContextType {
  courses: Course[] | null;
  activeCourse: Course | null;
  lecturesByCourse: Record<number, Lecture[]>;
  setCourses: React.Dispatch<React.SetStateAction<Course[] | null>>;
  setActiveCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  setLecturesByCourse: React.Dispatch<
    React.SetStateAction<Record<number, Lecture[]>>
  >;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[] | null>([]);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [lecturesByCourse, setLecturesByCourse] = useState<
    Record<number, Lecture[]>
  >({});

  return (
    <CoursesContext.Provider
      value={{
        courses,
        activeCourse,
        lecturesByCourse,
        setCourses,
        setActiveCourse,
        setLecturesByCourse,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export default CoursesContext;
