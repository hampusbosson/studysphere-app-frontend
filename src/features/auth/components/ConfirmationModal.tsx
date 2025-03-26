import React from "react";
import icons from "../../../assets/icons/icons";

interface ConfirmationModalProps {
  message: string;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onClose,
}) => {
  return (
    <div
      className="fixed bottom-0 transform -translate-x-1/2 
                 flex justify-center items-center z-50 bg-background w-64 
                 rounded-lg border border-gray-500 shadow-lg py-8 px-2
                 transition-transform duration-300 ease-out animate-slide-up mb-8"
    >
      <p className="text-center">{message}</p>
      <button onClick={onClose} className="fixed right-0 top-2  text-white w-8 ">
        {icons.closeIcon}
      </button>
    </div>
  );
};

export default ConfirmationModal;
