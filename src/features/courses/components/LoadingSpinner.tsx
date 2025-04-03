import React, { useState, useEffect, useMemo } from "react";
import icons from "../../../assets/icons/icons";

interface LoadingSpinnerProps {
  type: "creation" | "summary";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ type }) => {
  const [loadingText, setLoadingText] = useState("Preparing your lecture...");
  const [fade, setFade] = useState(true); // Controls fade-in effect

  // Memoized array to prevent re-creating it on every render
  const loadingMessagesCreation = useMemo(
    () => ["Preparing your lecture...", "Gathering resources..."],
    [],
  );

  const loadingMessagesSummary = useMemo(
    () => [
      "Summarizing your lecture...",
      "Gathering key insights...",
      "Analyzing content...",
      "Extracting important information...",
      "Creating a summary...",
      "Preparing your summary...",
    ],
    [],
  );

  const messages =
    type === "creation" ? loadingMessagesCreation : loadingMessagesSummary;

  // Initialize the first message
  useEffect(() => {
    setLoadingText(messages[0]);
  }, [messages]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setFade(false); // Start fade-out effect

      setTimeout(() => {
        index = (index + 1) % messages.length;
        setLoadingText(messages[index]);
        setFade(true); // Start fade-in effect
      }, 200); // Delay before switching text
    }, 3000);

    return () => clearInterval(interval);
  }, [messages]);

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
