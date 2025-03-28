import React from "react";
import icons from "../../../assets/icons/icons";
import { Course } from "../../../types/api";

interface ToolbarProps {
    courseItem: Course;
    activeButton: string;
    setActiveButton: React.Dispatch<React.SetStateAction<string>>
}

const Toolbar: React.FC<ToolbarProps> = ({ courseItem, activeButton, setActiveButton }) => {

    const courseName = courseItem.name;

  const handlePdfClick = () => {
    setActiveButton("pdf");
  };

  const handleSummaryClick = () => {
    setActiveButton("summary");
  };

  const handleQuizClick = () => {
    setActiveButton("quiz");
  };

  const handleEditClick = () => {

  }

  const openDeleteModal = () => {
    
  }

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
    </div>
  );
};

export default Toolbar;
