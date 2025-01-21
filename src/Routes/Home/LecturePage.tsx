import React, { useState } from "react";
import { /*useParams,*/ useLocation, useNavigate } from "react-router-dom";
//import { Lecture } from "../../utils/lectureUtils";

const LecturePage: React.FC = () => {
  const navigate = useNavigate();
  //const { lectureId } = useParams<{ lectureId: string }>();
  const location = useLocation();
  const { lecture, classItem, setActiveClass } = location.state || {};

  const [activeButton, setActiveButton] = useState("summary");

  const handleClassClick = () => {
    setActiveClass(classItem)
    navigate("/home");
  };

  const handleSummaryClick = () => {
    setActiveButton("summary");
  };

  const handleChatClick = () => {
    setActiveButton("chat");
  };

  const handleQuizClick = () => {
    setActiveButton("quiz");
  };

  return (
    <div className="px-24">
      <div className="flex flex-row gap-2 text-gray-400 text-sm">
        <button onClick={handleClassClick}>{classItem.name}</button>
        <p> / </p>
        <p className="text-white">{lecture.title}</p>
      </div>
      <div className="bg-gray-900 rounded-lg mt-2 p-2">
        <div className="flex flex-row justify-around font-bold w-full gap-2">
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
              activeButton === "chat" ? "bg-gray-800" : "bg-gray-700"
            }`}
            onClick={handleChatClick}
          >
            Chat
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
        <h1>Lecture Details</h1>
        <p>title: {lecture.title}</p>
      </div>
    </div>
  );
};

export default LecturePage;
