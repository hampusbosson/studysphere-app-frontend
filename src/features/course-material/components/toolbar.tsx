import React from "react";
import icons from "../../../assets/icons/icons";
import { Lecture } from "../../../types/api";
import { Course } from "../../../types/api";
import DeleteLectureModal from "./delete-lecture-modal";
import { useState } from "react";
import { deleteLecture } from "../api/delete-lecture";
import { useNavigate } from "react-router-dom";
import { useLectureByCourse } from "../../../context/use-lectures-by-course";
import { paths } from "../../../config/paths";

interface ToolbarProps {
  lecture: Lecture;
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
  courseItem: Course;
}

const Toolbar: React.FC<ToolbarProps> = ({
  lecture,
  activeButton,
  setActiveButton,
  courseItem,
}) => {
  const navigate = useNavigate();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { lecturesByCourse, setLecturesByCourse } = useLectureByCourse();

  const handlePdfClick = () => {
    setActiveButton("pdf");
  };

  const handleSummaryClick = () => {
    setActiveButton("summary");
  };

  const handleQuizClick = () => {
    setActiveButton("quiz");
  };

  const handleEditClick = () => {};

  const openDeleteModal = () => setDeleteModalVisible(true);
  const closeDeleteModal = () => setDeleteModalVisible(false);

  
  const handleDelete = async () => {
    const courseId = parseInt(courseItem.id)
    const currentLectures = lecturesByCourse[courseId] || [];
    const lectureToDelete = currentLectures.find(
      (lectureItem) => lectureItem.id === lecture.id
    );

    if (!lectureToDelete) {
      console.error("Lecture not found");
      return;
    }

    try {
      await deleteLecture(parseInt(lecture.id));

      const updatedLectures = currentLectures.filter(
        (lectureItem) => lectureItem.title !== lectureToDelete.title,
      );

      setLecturesByCourse((prev) => ({
        ...prev,
        [courseId]: updatedLectures,
      }));
    } catch (error) {
      console.error("Error deleting lecture:", error);
    } finally {
        navigate(paths.app.course.path);
    }
  };


  return (
    <div className="bg-gray-900 flex flex-row justify-between p-4 rounded-xl font-bold ">
      <div className="flex flex-row gap-2">
        <button
          className={`py-1 w-24 rounded-lg ${
            activeButton === "pdf"
              ? "bg-gray-800 border border-gray-400 "
              : "bg-gray-700"
          }`}
          onClick={handlePdfClick}
        >
          PDF
        </button>
        <button
          className={`py-1 w-24 rounded-lg ${
            activeButton === "summary"
              ? "bg-gray-800 border border-gray-400 "
              : "bg-gray-700"
          }`}
          onClick={handleSummaryClick}
        >
          Summary
        </button>
        <button
          className={`py-1 w-24 rounded-lg ${
            activeButton === "quiz"
              ? "bg-gray-800 border border-gray-400"
              : "bg-gray-700"
          }`}
          onClick={handleQuizClick}
        >
          Quiz
        </button>
      </div>
      <div className="flex flex-row gap-2 align-top h-full">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEditClick();
          }}
        >
          {icons.editIcon(5)}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            openDeleteModal();
          }}
        >
          {icons.deleteIcon(5)}
        </button>
      </div>
      {deleteModalVisible && (
        <DeleteLectureModal
          lecture={lecture}
          onClose={closeDeleteModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Toolbar;
