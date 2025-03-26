import React, { useState, useEffect, useMemo } from "react";
import icons from "../../../assets/icons/icons";

const LoadingSpinner: React.FC = () => {
  const [loadingText, setLoadingText] = useState("Preparing your lecture...");
  const [fade, setFade] = useState(false); // Controls fade-in effect

  // Memoized array to prevent re-creating it on every render
  const loadingMessages = useMemo(
    () => [
      "Preparing your lecture...",
      "Gathering resources...",
      "Summarizing key concepts...",
      "Generating content...",
      "Almost done...",
    ],
    [],
  ); // Empty dependency array ensures it is only created once

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setFade(false); // Start fade-out effect

      setTimeout(() => {
        index = (index + 1) % loadingMessages.length;
        setLoadingText(loadingMessages[index]);
        setFade(true); // Start fade-in effect
      }, 200); // Delay before switching text
    }, 3000);

    return () => clearInterval(interval);
  }, [loadingMessages]);

  return (
    <div className="h-full flex flex-col gap-2 justify-center items-center">
      {icons.loadingIcon}
      <p
        className={`text-lg font-semibold text-gray-300 transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
      >
        {loadingText}
      </p>
    </div>
  );
};

export default LoadingSpinner;
