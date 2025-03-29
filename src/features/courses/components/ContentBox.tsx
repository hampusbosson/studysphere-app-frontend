import React, { useState } from "react";
import icons from "../../../assets/icons/icons";
import AddLectureModal from "../../course-material/components/AddLectureModal";
import { Lecture } from "../../../types/api";
import { useNavigate } from "react-router-dom";
import NewCourseModal from "./NewCourseModal";
import LoadingSpinner from "./LoadingSpinner";
import { Course } from "../../../types/api";

interface ContentBoxProps {
  courseItem: Course | null;
  lectures?: Record<number, Lecture[]>;
  setLectures: React.Dispatch<React.SetStateAction<Record<number, Lecture[]>>>;
  activeCourse: Course | null;
  openCourseModal: () => void;
  closeCourseModal: () => void;
  isClassModalOpen: boolean;
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  setActiveLecture: React.Dispatch<React.SetStateAction<string>>
}

const ContentBox: React.FC<ContentBoxProps> = ({
  courseItem,
  lectures = {},
  setLectures,
  activeCourse,
  openCourseModal,
  closeCourseModal,
  isClassModalOpen,
  setCourses,
  setActiveLecture
}) => {
  const navigate = useNavigate();
  const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openLectureModal = () => setIsLectureModalOpen(true);
  const closeLectureModal = () => setIsLectureModalOpen(false);

  // Get the lectures for the current class
  const currentLectures = courseItem
    ? lectures[parseInt(courseItem.id)] || []
    : [];

  const handleLectureClick = (lecture: Lecture) => {
    setActiveLecture(lecture.title);
    navigate(`/home/lecture/${lecture.id}`, { state: { lecture, courseItem } });
  };

  return (
    <div className="h-full">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex flex-row justify-between items-start">
            <h1 className="text-4xl font-semibold font-montserrat">
              {activeCourse ? activeCourse.name : null}
            </h1>
            <button
              className="flex flex-row items-center gap-2 bg-accent pl-3 pr-4 py-2 rounded-lg hover:bg-accentHover"
              onClick={openCourseModal}
            >
              {icons.plusIcon}
              <p className="font-semibold text-lg">New Course</p>
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={openLectureModal}
              className="flex flex-row bg-gray-700 rounded-lg py-2 pl-3 pr-4 items-center justify-center gap-1 hover:bg-gray-800 font-semibold"
            >
              {icons.plusIcon} Add lecture
            </button>
            <ul className="flex flex-row gap-10 flex-wrap mt-6">
              {currentLectures.map((lectureItem, index) => (
                <li
                  key={index}
                  className="border border-gray-600 w-60 h-64 rounded-lg hover:border-gray-400 hover:cursor-pointer"
                  onClick={() => handleLectureClick(lectureItem)}
                >
                  <p className="py-2 border-b border-gray-600 font-semibold text-center">
                    {lectureItem.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {isClassModalOpen && (
            <NewCourseModal onClose={closeCourseModal} setCourses={setCourses} />
          )}
          {isLectureModalOpen && (
            <AddLectureModal
              onClose={closeLectureModal}
              courseItem={courseItem}
              setLectures={setLectures}
              setIsLoading={setIsLoading}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ContentBox;
