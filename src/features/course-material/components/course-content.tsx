import React from "react";
import { Tiptap } from "./TextEditor";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

// Set up PDF.js worker for Vite
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface PdfViewerProps {
  url: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }

  return (
    <div className="flex justify-center">
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => console.error("Error loading PDF:", error)}
        onSourceError={(error) =>
          console.error("Error with PDF source:", error)
        }
      >
        {numPages &&
          Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="m-0 pb-4 space-y-0">
              <Page pageNumber={index + 1} scale={1.5} renderAnnotationLayer={false} renderTextLayer={false}/>
            </div>
          ))}
      </Document>
    </div>
  );
};

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
