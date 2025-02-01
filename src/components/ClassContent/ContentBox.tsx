import React, { useState } from "react";
import { Class } from "../../utils/classUtils";
import icons from "../../assets/icons/icons";
import AddLectureModal from "./AddLectureModal";
import { Lecture } from "../../utils/lectureUtils";
import { useNavigate } from "react-router-dom";
import NewClassModal from "../../components/Main/NewClassModal";
import LoadingSpinner from "./LoadingSpinner";

interface ContentBoxProps {
  classItem: Class | null;
  lectures?: Record<number, Lecture[]>;
  setLectures: React.Dispatch<React.SetStateAction<Record<number, Lecture[]>>>;
  activeClass: Class | null;
  openClassModal: () => void;
  closeClassModal: () => void;
  isClassModalOpen: boolean;
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
}

const ContentBox: React.FC<ContentBoxProps> = ({
  classItem,
  lectures = {},
  setLectures,
  activeClass,
  openClassModal,
  closeClassModal,
  isClassModalOpen,
  setClasses,
}) => {
  const navigate = useNavigate();
  const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openLectureModal = () => setIsLectureModalOpen(true);
  const closeLectureModal = () => setIsLectureModalOpen(false);

  // Get the lectures for the current class
  const currentLectures = classItem
    ? lectures[parseInt(classItem.id)] || []
    : [];

  const handleLectureClick = (lecture: Lecture) => {
    navigate(`/home/lecture/${lecture.id}`, { state: { lecture, classItem } });
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex flex-row justify-between items-start">
            <h1 className="text-4xl font-semibold font-montserrat">
              {activeClass ? activeClass.name : null}
            </h1>
            <button
              className="flex flex-row items-center gap-2 bg-accent pl-3 pr-4 py-2 rounded-lg hover:bg-accentHover"
              onClick={openClassModal}
            >
              {icons.plusIcon}
              <p className="font-semibold text-lg">New Class</p>
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
            <NewClassModal onClose={closeClassModal} setClasses={setClasses} />
          )}
          {isLectureModalOpen && (
            <AddLectureModal
              onClose={closeLectureModal}
              classItem={classItem}
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
