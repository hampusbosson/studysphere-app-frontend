import React from "react";
import { Lecture } from "../../../types/api";
import { useNavigate } from "react-router-dom";
import { Course } from "../../../types/api";

interface LectureListItemProps {
  setActiveLecture: React.Dispatch<React.SetStateAction<string>>;
  activeLecture: string;
  lectureItem: Lecture;
  courseItem: Course;
}

const LectureListItem: React.FC<LectureListItemProps> = ({
  setActiveLecture,
  activeLecture,
  lectureItem,
  courseItem,
}) => {
  const navigate = useNavigate();
 
  const handleLectureClick = (lecture: Lecture) => {
    setActiveLecture(lecture.title);
    navigate(`/home/lecture/${lecture.id}`, {
      state: { lecture, courseItem },
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
