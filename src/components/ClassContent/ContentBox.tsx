import React, { useState } from "react";
import { Class } from "../../utils/classUtils";
import icons from "../../assets/icons/icons";
import AddLectureModal from "./AddLectureModal";
import { Lecture } from "../../utils/lectureUtils";

interface ContentBoxProps {
  classItem: Class | null;
  lectures?: Record<number, Lecture[]>
  setLectures: React.Dispatch<React.SetStateAction<Record<number, Lecture[]>>>;
}

const ContentBox: React.FC<ContentBoxProps> = ({ classItem, lectures = {}, setLectures }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  // Get the lectures for the current class
  const currentLectures = classItem ? lectures[parseInt(classItem.id)] || [] : [];

  return (
    <div>
      <button
        onClick={openModal}
        className="flex flex-row bg-gray-700 rounded-lg py-2 pl-3 pr-4 items-center justify-center gap-1 hover:bg-gray-800 font-semibold"
      >
        {icons.plusIcon} Add lecture
      </button>
      <ul>
        {currentLectures.map((lectureItem, index) => (
          <li key={index}>{lectureItem.title}</li>
        ))}
      </ul>
      {isModalOpen && (
        <AddLectureModal
          onClose={closeModal}
          classItem={classItem}
          setLectures={setLectures}
        />
      )}
    </div>
  );
};

export default ContentBox;
