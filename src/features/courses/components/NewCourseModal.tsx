import React, { useState } from "react";
import InputField from "../../auth/components/InputField";
import { createCourse } from "../api/create-course";
import { Course } from "../../../types/api";

interface NewCourseModalProps {
  onClose: () => void;
  setClasses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const NewCourseModal: React.FC<NewCourseModalProps> = ({
  onClose,
  setClasses,
}) => {
  const [courseName, setCourseName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const capitalizeClassName = (courseName: string) => {
    return courseName.charAt(0).toUpperCase() + courseName.slice(1);
  };

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();

    if (courseName.trim() === "") {
      setErrorMessage("Class name cannot be empty");
      return;
    }

    try {
      const newClassCapitalized = capitalizeClassName(courseName);
      const newClass = await createCourse(newClassCapitalized);

      setClasses((prevClasses) => [...prevClasses, newClass]);
      setCourseName("");
      onClose();
    } catch (error) {
      console.error("Error creating class:", error);
      setErrorMessage("Failed to create class, Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-background border-gray-600 border w-96 p-6 rounded-lg shadow-lg flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold">Whats the name of your class?</h2>
        <form
          className="flex flex-col justify-end gap-4 mt-4"
          onSubmit={handleAddClass}
        >
          <InputField
            type="text"
            value={courseName}
            onValueChange={setCourseName}
          />
          {errorMessage && (
            <p className="text-red-500 text-xs text-left -mt-2 -mb-2">
              {errorMessage}
            </p>
          )}
          <div className="flex flex-row items-center justify-center gap-4 mt-2">
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

export default NewCourseModal;
