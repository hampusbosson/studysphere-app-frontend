import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Course, Lecture } from "../../types/api";
import { getCourses } from "../../features/courses/api/get-courses";

interface CoursesContextType {
  courses: Course[] | null;
  activeCourse: Course | null;
  lecturesByCourse: Record<number, Lecture[]>;
  setCourses: React.Dispatch<React.SetStateAction<Course[] | null>>;
  setActiveCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  setLecturesByCourse: React.Dispatch<
    React.SetStateAction<Record<number, Lecture[]>>
  >;
  summarizedLectures: Record<string, boolean>;
  setSummarizedLectures: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
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
  const [summarizedLectures, setSummarizedLectures] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const fetchCoursesWithLectures = async () => {
      try {
        const userCourses = await getCourses();
        setCourses(userCourses || []);
        if (userCourses && userCourses.length > 0) {
          setActiveCourse(userCourses[0]);
          const newLecturesByCourse: Record<number, Lecture[]> =
            userCourses.reduce(
              (acc: Record<number, Lecture[]>, courseItem: Course) => {
                acc[parseInt(courseItem.id)] = courseItem.lectures || [];
                return acc;
              },
              {},
            );

          // Build summarizedLectures record.
          // For each lecture, if lecture.summarizedContent exists, mark it as summarized.
          const newSummarizedLectures: Record<string, boolean> = {};
          userCourses.forEach((course) => {
            (course.lectures || []).forEach((lecture) => {
              newSummarizedLectures[lecture.id] = Boolean(
                lecture.summarizedContent,
              );
            });
          });
          setSummarizedLectures(newSummarizedLectures);
          setLecturesByCourse(newLecturesByCourse);
        }
      } catch (error) {
        console.error("Error fetching classes and lectures:", error);
      }
    };

    fetchCoursesWithLectures();
  }, []);

  return (
    <CoursesContext.Provider
      value={{
        courses,
        activeCourse,
        lecturesByCourse,
        setCourses,
        setActiveCourse,
        setLecturesByCourse,
        summarizedLectures,
        setSummarizedLectures,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export default CoursesContext;
