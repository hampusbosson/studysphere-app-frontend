import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useActiveCourse } from "../../../context/useActiveCourse";
import CourseContent from "../../../features/course-material/components/course-content";

const LecturePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lecture, courseItem } = location.state || {};
  const { setActiveCourse } = useActiveCourse();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [activeButton, setActiveButton] = useState("pdf");
  const [content, setContent] = useState(lecture.content);
  const lectureUrl = lecture.url; 

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content])

  useEffect(() => {

    setContent(lecture.content); 
  }, [lecture])

  const handleClassClick = () => {
    setActiveCourse(courseItem);
    navigate("/home");
  };

  const handlePdfClick = () => {
    setActiveButton("pdf");
  }

  const handleSummaryClick = () => {
    setActiveButton("summary");
  };

  const handleQuizClick = () => {
    setActiveButton("quiz");
  };

  return (
    <div className="px-24">
      <div></div>
      <div className="flex flex-row gap-2 text-gray-400 text-sm">
        <button onClick={handleClassClick}>{courseItem.name}</button>
        <p> / </p>
        <p className="text-white">{lecture.title}</p>
      </div>
      <div className="bg-gray-900 rounded-lg mt-2 p-2 flex flex-col gap-4">
        <div className="bg-gray-900 p-2 flex flex-row justify-around font-bold w-full gap-2 sticky top-0 z-10">
          <button
            className={`py-3 w-full rounded-lg ${
              activeButton === "pdf" ? "bg-gray-800" : "bg-gray-700"
            }`}
            onClick={handlePdfClick}
          >
            PDF
          </button> 
          <button
            className={`py-3 w-full rounded-lg ${
              activeButton === "summary" ? "bg-gray-800" : "bg-gray-700"
            }`}
            onClick={handleSummaryClick}
          >
            Summary
          </button>
          <button
            className={`py-3 w-full rounded-lg ${
              activeButton === "quiz" ? "bg-gray-800" : "bg-gray-700"
            }`}
            onClick={handleQuizClick}
          >
            Quiz
          </button>
        </div>
        <CourseContent 
          activeState={activeButton}
          summarizedContent={content}
          lectureUrl={lectureUrl}
        />
      </div>
    </div>
  );
};

export default LecturePage;
