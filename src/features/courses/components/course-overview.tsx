import React from "react";
import { useCourses } from "../../../hooks/courses/use-courses";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../config/paths";

const CourseOverview: React.FC = () => {
  const { courses, setActiveCourse } = useCourses();
  const navigate = useNavigate();

    const handleCourseClick = () => {
        
        navigate(paths.app.course.getHref());
    };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold bg-blue-950 p-1 w-48 flex items-center justify-center rounded-sm">Active Courses</p>
      <div className="mt-2 pr-2 h-[28rem] overflow-y-auto scrollbar-thin scrollbar-hidden scrollbar-hover scrollbar-thumb-gray-700 scrollbar-track-transparent">
  {courses?.map((course) => (
    <div
      key={course.id}
      onClick={handleCourseClick}
      className="bg-card flex flex-col mb-4 justify-center border p-4 rounded-md border-gray-600 w-48 h-24 hover:shadow-md hover:shadow-gray-500 hover:shadow-offset-x-4 hover:border-white transition-all duration-300 ease-in-out cursor-pointer"
    >
      <p className="text-sm font-semibold">{course.name}</p>
      <p className="text-gray-500">Lectures: {course.lectures?.length}</p>
      <p className="text-gray-500">progress: 56%</p>
    </div>
  ))}
</div>
    </div>
  );
};

export default CourseOverview;
