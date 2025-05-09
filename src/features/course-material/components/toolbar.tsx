import React, { useState } from "react";
import icons from "../../../assets/icons/icons";
import { Lecture } from "../../../types/api";
import { Course } from "../../../types/api";
import DeleteLectureModal from "./delete-lecture-modal";
import { deleteLecture } from "../api/delete-lecture";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../../../hooks/courses/use-courses";
import { paths } from "../../../config/paths";

interface ToolbarProps {
  lecture: Lecture | undefined;
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
  courseItem: Course | null;
  summarize: (lectureId: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  lecture,
  activeButton,
  setActiveButton,
  courseItem,
  summarize,
}) => {
  const navigate = useNavigate();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { lecturesByCourse, setLecturesByCourse } = useCourses();
  const [summarized, setSummarized] = useState(false);

  const handlePdfClick = () => {
    setActiveButton("pdf");
  };

  const handleSummaryClick = () => {
    if (lecture && !lecture?.summarizedContent && !summarized) {
      summarize(lecture.id);
      setSummarized(true);
    }
    setActiveButton("summary");
  };

  const handleQuizClick = () => {
    setActiveButton("quiz");
  };

  const handleEditClick = () => {};

  const openDeleteModal = () => setDeleteModalVisible(true);
  const closeDeleteModal = () => setDeleteModalVisible(false);

  
  const handleDelete = async () => {
    if (!courseItem) {
      console.error("Course item is null");
      return;
    }
    const courseId = parseInt(courseItem.id);
    const currentLectures = lecturesByCourse[courseId] || [];
    const lectureToDelete = currentLectures.find(
      (lectureItem) => lectureItem.id === lecture?.id
    );

    if (!lectureToDelete) {
      console.error("Lecture not found");
      return;
    }

    try {
      if (lecture?.id) {
        await deleteLecture(parseInt(lecture.id));
      } else {
        console.error("Lecture ID is undefined");
      }

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
        navigate(paths.app.course.getHref());
    }
  };


  return (
    <div className="bg-card mb-4 flex flex-row justify-between p-2 rounded-md font-bold ">
      <div className="flex flex-row gap-2">
        <button
          className={`py-2 px-6 rounded-sm flex flex-row gap-2 items-center text-gray-500 ${
            activeButton === "pdf"
              ? "bg-black text-white"
              : ""
          }`}
          onClick={handlePdfClick}
        >
          {icons.pdfIcon(activeButton === "pdf")}
          <p>PDF</p>
        </button>
        <button
          className={`py-2 px-6 rounded-sm flex flex-row gap-2 items-center text-gray-500  ${
            activeButton === "summary"
              ? "bg-black text-white"
              : ""
          }`}
          onClick={handleSummaryClick}
        >
          {icons.summaryIcon(activeButton === "summary")}
          <p>Summary</p>
        </button>
        <button
          className={`py-2 px-6 rounded-sm flex flex-row gap-2 items-center text-gray-500  ${
            activeButton === "quiz"
              ? "bg-background text-white"
              : ""
          }`}
          onClick={handleQuizClick}
        >
          {icons.quizIcon(activeButton === "quiz")}
          <p>Quiz</p>
        </button>
      </div>
      <div className="flex flex-row gap-4 items-center justify-center mr-4">
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
