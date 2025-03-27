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
}

const CourseContent: React.FC<CourseContentProps> = ({
  activeState,
  summarizedContent,
}) => {
  const originalPdfUrl =
    "https://www.upet.ro/annals/economics/pdf/2020/p1/8).%20Ilioni_2.pdf";
  const proxyUrl = `http://localhost:3000/api/lecture/proxy?url=${encodeURIComponent(originalPdfUrl)}`;

  return (
    <div>
      {activeState === "pdf" && (
        <div>
          <PdfViewer url={proxyUrl} />
        </div>
      )}
      {activeState === "summary" && (
        <div>
          <Tiptap content={summarizedContent} />
        </div>
      )}
      {activeState === "quiz" && <div>quiz content</div>}
    </div>
  );
};

export default CourseContent;
