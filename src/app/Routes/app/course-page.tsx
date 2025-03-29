import React, { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import DashboardLayout from "../../../components/layouts/dashboard-layout";
import SideBar from "../../../components/ui/Sidebar/Sidebar";
import ContentBox from "../../../features/courses/components/ContentBox";
import { Lecture } from "../../../types/api";
import { Outlet } from "react-router-dom"; // Import Outlet
import { useActiveCourse } from "../../../context/useActiveCourse";
import { Course } from "../../../types/api";
import { getCourses } from "../../../features/courses/api/get-courses";
import { useLectureByCourse } from "../../../context/use-lectures-by-course";
import { paths } from "../../../config/paths";

const CoursePage: React.FC = () => {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [activeLecture, setActiveLecture] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const lectureRoutePattern = `${paths.app.course.getHref()}/${paths.app.lecture.path}`;
  const lectureRouteMatch = useMatch(lectureRoutePattern); // Check if the route matches the lecture page
  const { activeCourse, setActiveCourse } = useActiveCourse();
  const { lecturesByCourse, setLecturesByCourse } = useLectureByCourse();

  const openCourseModal = () => setIsCourseModalOpen(true);
  const closeCourseModal = () => setIsCourseModalOpen(false);

  // Fetch classes from the database on mount
  useEffect(() => {
    const fetchCoursesWithLectures = async () => {
      try {
        // Fetch classes along with their lectures
        const userCourses = await getCourses();
        setCourses(userCourses || []); // Update classes with fetched data
        setActiveCourse(userCourses[0]); // Set the first class as active

        // Populate lecturesByCourse from fetched data
        const newLecturesByCourse = userCourses.reduce(
          (acc: Record<number, Lecture[]>, courseItem: Course) => {
            acc[parseInt(courseItem.id)] = courseItem.lectures || [];
            return acc;
          },
          {},
        );
        setLecturesByCourse(newLecturesByCourse);

      } catch (error) {
        console.error("Error fetching classes and lectures:", error);
      }
    };

    fetchCoursesWithLectures();
  }, [setActiveCourse, setLecturesByCourse]);

  return (
    <DashboardLayout>
      <div className="bg-background h-full grid grid-cols-6">
        <div className="col-span-1">
          <SideBar
            courses={courses}
            setActiveCourse={setActiveCourse}
            setCourses={setCourses}
            activeCourse={activeCourse}
            lectures={lecturesByCourse}
            setActiveLecture={setActiveLecture}
            activeLecture={activeLecture}
          />
        </div>
        <div className="col-span-5 px-8 py-6">
          {!lectureRouteMatch ? ( // Render ContentBox when not on a lecture page
            <>
              <ContentBox
                courseItem={activeCourse}
                lectures={lecturesByCourse}
                setLectures={setLecturesByCourse}
                activeCourse={activeCourse}
                openCourseModal={openCourseModal}
                closeCourseModal={closeCourseModal}
                isClassModalOpen={isCourseModalOpen}
                setCourses={setCourses}
                setActiveLecture={setActiveLecture}
              />
            </>
          ) : (
            // Render Outlet for the lecture route, renders LecturePage
            <Outlet />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoursePage;
