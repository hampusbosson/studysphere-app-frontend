import React from "react";
import { Tiptap } from "./TextEditor";
import PdfViewer from "./pdf-viewer";

interface CourseContentProps {
  activeState: string;
  summarizedContent: string;
  lectureUrl: string; 
}

const CourseContent: React.FC<CourseContentProps> = ({
  activeState,
  summarizedContent,
  lectureUrl,
}) => {
  const proxyUrl = `http://localhost:3000/api/lecture/proxy?url=${encodeURIComponent(lectureUrl)}`;

  return (
    <div>
      <div className={activeState === "pdf" ? "block" : "hidden"}>
        {lectureUrl ? <PdfViewer url={proxyUrl} /> : <div></div>}
      </div>
      <div className={activeState === "summary" ? "block" : "hidden"}>
        <Tiptap content={summarizedContent} />
      </div>
      <div className={activeState === "quiz" ? "block" : "hidden"}>
        quiz content
      </div>
    </div>
  );
};

export default CourseContent;
