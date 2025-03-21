import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useActiveClass } from "../../context/useActiveClass";
import { Tiptap } from "../../components/Lecture/TextEditor";

const LecturePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lecture, classItem } = location.state || {};
  const { setActiveClass } = useActiveClass();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [activeButton, setActiveButton] = useState("summary");
  const [content, setContent] = useState(lecture.content);

  console.log(lecture.id);

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
    setActiveClass(classItem);
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
      <div className="bg-gray-900 rounded-lg mt-2 p-2 flex flex-col gap-4">
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
        <div>
        <Tiptap content={content}/>
        </div>
      </div>
    </div>
  );
};

export default LecturePage;
