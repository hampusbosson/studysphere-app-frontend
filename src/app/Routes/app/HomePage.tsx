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

const HomePage: React.FC = () => {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [lecturesByCourse, setLecturesByCourse] = useState<
    Record<number, Lecture[]>
  >({});
  const lectureRouteMatch = useMatch("/home/lecture/:lectureId"); // Check if the route matches the lecture page
  const { activeCourse, setActiveCourse } = useActiveCourse();

  const openCourseModal = () => setIsCourseModalOpen(true);
  const closeCourseModal = () => setIsCourseModalOpen(false);

  // Fetch classes from the database on mount
  useEffect(() => {
    const fetchCoursesWithLectures = async () => {
      try {
        // Fetch classes along with their lectures
        const userCourses = await getCourses();
        console.log(userCourses)
        setCourses(userCourses || []); // Update classes with fetched data
        setActiveCourse(userCourses[0]); // Set the first class as active

        // Populate lecturesByClass from fetched data
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
  }, [setActiveCourse]);

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
          />
        </div>
        <div className="col-span-5 p-8">
          {!lectureRouteMatch ? ( // Render ContentBox when not on a lecture page
            <>
              <ContentBox
                courseItem={activeCourse}
                lectures={lecturesByCourse}
                setLectures={setLecturesByCourse}
                activeCourse={activeCourse}
                openClassModal={openCourseModal}
                closeClassModal={closeCourseModal}
                isClassModalOpen={isCourseModalOpen}
                setCourses={setCourses}
              />
            </>
          ) : (
            // Render Outlet for the lecture route, renders nested route for homepage
            <Outlet />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
