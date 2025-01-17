import React, { useState, useEffect } from "react";
import { Class } from "../../utils/classUtils";
import icons from "../../assets/icons/icons";
import AddLectureModal from "./AddLectureModal";
import { Lecture, getLecturesForClass } from "../../utils/lectureUtils";

interface ContentBoxProps {
  classItem: Class | null;
}

const ContentBox: React.FC<ContentBoxProps> = ({ classItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lectures, setLectures] = useState<Lecture[]>(
    classItem?.lectures || [],
  );

  // Fetch lectures whenever the classItem changes
  useEffect(() => {
    const fetchLectures = async () => {
      if (classItem) {
        try {
          const fetchedLectures = await getLecturesForClass(classItem.id); // Fetch lectures from the API
          setLectures(fetchedLectures);
        } catch (error) {
          console.error("Error fetching lectures:", error);
        }
      }
    };

    fetchLectures();
  }, [classItem]); // Triggered when classItem changes


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="flex flex-row bg-gray-700 rounded-lg py-2 pl-3 pr-4 items-center justify-center gap-1 hover:bg-gray-800 font-semibold"
      >
        {icons.plusIcon} Add lecture
      </button>
      <ul>
        {lectures.map((lectureItem, index) => (
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
