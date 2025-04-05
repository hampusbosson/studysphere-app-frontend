import React, { useEffect } from "react";
import { useCourses } from "@/hooks/courses/use-courses";
import { getCourses } from "@/features/courses/api/get-courses";
import { Lecture, Course } from "@/types/api";
import DashboardLayout from "../../../components/layouts/dashboard-layout";
import CourseOverview from "../../../features/courses/components/course-overview";


const HomePage: React.FC = () => {

  const {setCourses, setActiveCourse, setLecturesByCourse, } = useCourses();

    useEffect(() => {
      const fetchCoursesWithLectures = async () => {
        try {
          const userCourses = await getCourses();
          setCourses(userCourses || []);
          if (userCourses && userCourses.length > 0) {
            const storedCourseId = localStorage.getItem("activeCourseId");
            if (storedCourseId) {
              console.log(storedCourseId);
              const foundCourse = userCourses.find(course => parseInt(course.id) === parseInt(storedCourseId));
              console.log(foundCourse);
              if (foundCourse) {
                setActiveCourse(foundCourse);
              }
            } else {
              setActiveCourse(userCourses[0]);
            }
            const newLecturesByCourse: Record<number, Lecture[]> =
              userCourses.reduce(
                (acc: Record<number, Lecture[]>, courseItem: Course) => {
                  acc[parseInt(courseItem.id)] = courseItem.lectures || [];
                  return acc;
                },
                {},
              );
  
            setLecturesByCourse(newLecturesByCourse);
          }
        } catch (error) {
          console.error("Error fetching classes and lectures:", error);
        }
      };
  
      fetchCoursesWithLectures();
    }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col py-8 px-12 gap-10 h-full">
        <div>
          <p className="text-4xl font-bold">Dashboard</p>
        </div>
        <div className="flex flex-row gap-10">
          <CourseOverview />
          <div>some other content</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
