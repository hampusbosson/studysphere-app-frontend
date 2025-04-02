import { Document, Page, pdfjs } from "react-pdf";
import React, { useState, useEffect, useCallback } from "react";
import _debounce from "lodash/debounce";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface PdfViewerProps {
  url: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  const [docUrl, setDocUrl] = useState(url);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isDocumentReady, setIsDocumentReady] = useState(false);

    // Debounce changing the document URL
    const debouncedSetDocUrl = useCallback(
      _debounce((newUrl: string) => {
        setDocUrl(newUrl);
      }, 500),
      []
    );
  
    // Watch for url changes and debounce update
    useEffect(() => {
      debouncedSetDocUrl(url);
    }, [url, debouncedSetDocUrl]);



  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsDocumentReady(true);
  };

  return (
    <div className="flex justify-center">
      <Document
        file={docUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => console.error("Error loading PDF:", error)}
        onSourceError={(error) =>
          console.error("Error with PDF source:", error)
        }
      >
        {isDocumentReady &&
          Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="m-0 pb-4 space-y-0">
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={1.5}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </div>
          ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
