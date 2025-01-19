import React, { useState } from "react";
import { Class } from "../../utils/classUtils";
import InputField from "../Auth/InputField";
import icons from "../../assets/icons/icons";
import { createLecture } from "../../utils/lectureUtils";
import { Lecture } from "../../utils/lectureUtils";

interface AddSubjectModalProps {
  classItem: Class | null;
  onClose: () => void;
  setLectures: React.Dispatch<React.SetStateAction<Record<number, Lecture[]>>>;
}

const AddLectureModal: React.FC<AddSubjectModalProps> = ({ classItem, onClose, setLectures }) => {
  const [subjectName, setSubjectName] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeButton, setActiveButton] = useState("url");

  const handleAddLecture = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (subjectName.trim() === "") {
      setErrorMessage("Lecture name cannot be empty");
      return;
    }
  
    try {
      const newLecture = await createLecture(classItem?.id, subjectName.trim());
      if (!classItem?.id) {
        throw new Error("Class ID is undefined");
      }
  
      // Update the lectures for the specific class
      setLectures((prev) => ({
        ...prev,
        [classItem.id]: [...(prev[parseInt(classItem.id)] || []), newLecture],
      }));
  
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error creating lecture:", error);
      setErrorMessage("Failed to create lecture, Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-300 bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-background border-gray-600 border rounded-xl shadow-lg flex flex-col items-center px-14"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold pt-6 text-white">
          Create new lecture
        </h2>
        <form
          className="flex flex-col gap-4 mt-4 w-full justify-center items-center"
          onSubmit={handleAddLecture}
        >
          <InputField
            label="Lecture Title"
            type="text"
            value={subjectName}
            onValueChange={setSubjectName}
          />
          {errorMessage && (
            <p className="text-red-500 text-xs text-left -mt-2 -mb-2 w-full pl-1">
              {errorMessage}
            </p>
          )}
          <div className="w-72 mt-4 items-center justify-center">
            <div className="flex flex-row gap-2 w-full justify-around border-b border-gray-700">
              <button
                type="button"
                className={`relative flex flex-col items-center text-lg w-36 pb-2 ${activeButton === "url" ? "font-semibold text-white" : ""}`}
                onClick={() => setActiveButton("url")}
              >
                <div className="flex items-center gap-2">
                  {icons.linkIcon(
                    activeButton === "url" ? "white" : "lightgray",
                  )}
                  <span>URL</span>
                </div>
                {activeButton === "url" && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
                )}
              </button>
              <button
                type="button"
                className={`relative flex flex-col items-center text-lg w-36 pb-2 ${activeButton === "upload" ? "font-semibold text-white" : ""}`}
                onClick={() => setActiveButton("upload")}
              >
                <div className="flex items-center gap-2">
                  {icons.cloudIcon(
                    activeButton === "upload" ? "white" : "lightgray",
                  )}
                  <span>Upload</span>
                </div>
                {activeButton === "upload" && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
                )}
              </button>
            </div>
          </div>
          <div className="w-full h-64">
            {activeButton === "url" && (
              <div>
                <InputField
                  type="text"
                  value={url}
                  onValueChange={setUrl}
                  placeholder="Paste a URL here"
                />
                <div className="mt-4">
                  <p className="mb-2 text-white">Supports:</p>
                  <ul className="flex flex-col gap-2 text-white">
                    <li>- Websites, articles, blogs</li>
                    <li>- Online PDF's</li>
                    <li>- Google Docs</li>
                    <li>- Google Slides</li>
                  </ul>
                </div>
              </div>
            )}
            {activeButton === "upload" && (
              <div className="flex flex-col justify-center items-center border-gray-700 border rounded-lg py-16 gap-4">
                <p className="text-white">Drag and drop a PDF file here</p>
                <div className="flex items-center w-52">
                  <span className="flex-grow h-[1px] bg-gray-700"></span>
                  <span className="px-4">or</span>
                  <span className="flex-grow h-[1px] bg-gray-700"></span>
                </div>
                <button
                  className="pr-5 pl-4 py-2 bg-accent text-white rounded-lg hover:bg-accentHover font-semibold transition flex flex-row gap-2 items-center mt-2"
                  type="button"
                >
                  {icons.uploadIcon}
                  Choose file
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-4 mt-4 pb-6">
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2 rounded-lg hover:bg-gray-700 transition font-semibold"
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 bg-accent text-white rounded-lg hover:bg-accentHover font-semibold transition"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLectureModal;
