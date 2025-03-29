import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useActiveCourse } from "../../../context/useActiveCourse";
import CourseContent from "../../../features/course-material/components/course-content";
import Toolbar from "../../../features/course-material/components/toolbar";
import { paths } from "../../../config/paths";

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
  }, [content]);

  useEffect(() => {
    setContent(lecture.content);
  }, [lecture]);

  const handleClassClick = () => {
    setActiveCourse(courseItem);
    navigate(paths.app.course.getHref());
  };

  return (
    <div className="px-24">
      <div className="flex flex-row gap-2 text-gray-400 text-sm">
        <button onClick={handleClassClick}>{courseItem.name}</button>
        <p> / </p>
        <p className="text-white">{lecture.title}</p>
      </div>
      <div className="bg-gray-900 rounded-xl mt-2 flex flex-col gap-2">
        <Toolbar 
          lecture={lecture}
          setActiveButton={setActiveButton}
          activeButton={activeButton}
          courseItem={courseItem}
        />
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
