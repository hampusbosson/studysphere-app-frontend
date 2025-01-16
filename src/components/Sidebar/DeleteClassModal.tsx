import React from "react";

interface DeleteClassModalProps {
  className: string;
  onClose: () => void;
  handleDelete: () => Promise<void>;
}

const DeleteClassModal: React.FC<DeleteClassModalProps> = ({
  className,
  onClose,
  handleDelete,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-background border-gray-600 border w-[40rem] p-4 rounded-lg shadow-lg flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-lg">
          Are you sure you want to delete the class <strong>{className}</strong>
          ? The class and all its content will be removed.
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

export default DeleteClassModal;
