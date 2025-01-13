import React, { useState } from "react";
import InputField from "../Auth/InputField";
import { createClass } from "../../utils/classUtils";
import { Class } from "../../utils/classUtils";

interface NewClassModalProps {
  onClose: () => void;
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
}

const NewClassModal: React.FC<NewClassModalProps> = ({
  onClose,
  setClasses,
}) => {
  const [className, setClassName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const capitalizeClassName = (className: string) => {
    return className.charAt(0).toUpperCase() + className.slice(1);
  }

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();

    if (className.trim() === "") {
      setErrorMessage("Class name cannot be empty");
      return;
    }

    try {
        const newClassCapitalized = capitalizeClassName(className)
        const newClass = await createClass(newClassCapitalized);

        setClasses((prevClasses) => [...prevClasses, newClass]);
        setClassName("");
        onClose();
    } catch (error) {
        console.error("Error creating class:", error);
        setErrorMessage("Failed to create class, Please try again.");
    }


  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-background border-gray-400 border w-96 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-xl font-bold">Whats the name of your class?</h2>
        <form
          className="flex flex-col justify-end gap-4 mt-4"
          onSubmit={handleAddClass}
        >
          <InputField
            type="text"
            value={className}
            onValueChange={setClassName}
          />
          {errorMessage && (
            <p className="text-red-500 text-xs text-left -mt-2 -mb-2">{errorMessage}</p>
          )}
          <button
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accentHover font-semibold transition mt-2"
            type="submit"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-lg hover:bg-gray-700 transition font-semibold"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewClassModal;
