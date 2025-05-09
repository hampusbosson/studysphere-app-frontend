import React from "react";
import { Lecture } from "../../../types/api";

interface DeleteLectureModalProps {
  lecture: Lecture | undefined;
  onClose: () => void;
  handleDelete: () => Promise<void>;
}

const DeleteLectureModal: React.FC<DeleteLectureModalProps> = ({ lecture, onClose, handleDelete }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-800/50 backdrop-blur-xs flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-background border-gray-600 border w-[40rem] p-4 rounded-lg shadow-lg flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-lg">
          Are you sure you want to delete the lecture{" "}
          <strong>{lecture?.title}</strong>? The lecture and all its content will be
          removed.
        </h1>
        <div className="flex flex-row gap-3 w-full justify-end">
          <button
            onClick={onClose}
            className="bg-accent rounded-lg py-1 px-4 font-medium hover:bg-accentHover"
          >
            Cancel
          </button>
          <button
            className="bg-red-700 rounded-lg py-1 px-4 font-medium hover:bg-red-800"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLectureModal;
