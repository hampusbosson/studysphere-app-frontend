import React, { useState } from "react";
import { useMatch } from "react-router-dom";
import DashboardLayout from "../../../components/layouts/dashboard-layout";
import SideBar from "../../../components/ui/Sidebar/Sidebar";
import ContentBox from "../../../features/courses/components/ContentBox";
import { Outlet } from "react-router-dom"; // Import Outlet
import { useCourses } from "../../../hooks/courses/use-courses";
import { paths } from "../../../config/paths";

const CoursePage: React.FC = () => {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [activeLecture, setActiveLecture] = useState("");
  const lectureRoutePattern = `${paths.app.course.getHref()}/${paths.app.lecture.path}`;
  const lectureRouteMatch = useMatch(lectureRoutePattern); // Check if the route matches the lecture page
  const { courses, activeCourse, lecturesByCourse, setCourses, setActiveCourse, setLecturesByCourse } = useCourses();
  

  const openCourseModal = () => setIsCourseModalOpen(true);
  const closeCourseModal = () => setIsCourseModalOpen(false);



  return (
    <DashboardLayout>
      <div className="h-full grid grid-cols-6">
        <div className="col-span-1">
          <SideBar
            courses={courses}
            setCourses={setCourses}
            setActiveLecture={setActiveLecture}
            activeLecture={activeLecture}
            activeCourse={activeCourse}
            setActiveCourse={setActiveCourse}
            lecturesByCourse={lecturesByCourse}
          />
        </div>
        <div className="col-span-5 px-8 py-6">
          {!lectureRouteMatch ? ( // Render ContentBox when not on a lecture page
            <>
              <ContentBox
                openCourseModal={openCourseModal}
                closeCourseModal={closeCourseModal}
                isClassModalOpen={isCourseModalOpen}
                setCourses={setCourses}
                setActiveLecture={setActiveLecture}
                lecturesByCourse={lecturesByCourse}
                activeCourse={activeCourse}
                setLecturesByCourse={setLecturesByCourse}
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
