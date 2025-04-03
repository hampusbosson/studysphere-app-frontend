import React from "react";
import { Lecture } from "../../../types/api";
import { useNavigate } from "react-router-dom";
import { Course } from "../../../types/api";
import { paths } from "../../../config/paths";
import { useCourses } from "../../../hooks/courses/use-courses";

interface LectureListItemProps {
  setActiveLecture: React.Dispatch<React.SetStateAction<string>>;
  activeLecture: string;
  lectureItem: Lecture;
}

const LectureListItem: React.FC<LectureListItemProps> = ({
  setActiveLecture,
  activeLecture,
  lectureItem,
}) => {
  const navigate = useNavigate();
  const { courses, setActiveCourse } = useCourses();

  // find activeCourse from courses
  const activeCourse: Course | null = courses?.find(
    (course) => course.id === lectureItem.classId,
  ) || null;

  const handleLectureClick = (lecture: Lecture) => {
    setActiveCourse(activeCourse || null);
    setActiveLecture(lecture.title);
    
    navigate(paths.app.lecture.getHref(lecture.id), {
      state: { lecture, activeCourse },
    });
  };

  return (
    <div
      className="flex flex-row justify-between"
      onClick={(e) => {
        e.stopPropagation();
        handleLectureClick(lectureItem);
      }}
    >
      <div
        className={`flex flex-row items-center gap-1 ${activeLecture === lectureItem.title ? "text-white font-semibold" : "text-gray-300"}`}
      >
        <p>-</p>
        <p>{lectureItem.title}</p>
      </div>
      <div></div>
    </div>
  );
};

export default LectureListItem;
