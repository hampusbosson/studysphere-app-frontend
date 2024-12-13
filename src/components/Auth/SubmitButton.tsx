import React from "react";

interface SubmitButtonProps {
    title: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ( { title } ) => {
  return (
    <button
      type="submit"
      className="bg-transparent text-white py-2 px-4 rounded-lg border-silver border w-72 hover:bg-accent transition duration-200  hover:border-accent font-semibold mt-4"
    >
      {title}
    </button>
  );
};

export default SubmitButton;
