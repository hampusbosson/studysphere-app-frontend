import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface HeaderButtonProps {
  linkName: string;
  buttonName: string;
  size?: number; 
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ linkName, buttonName, size = 20 }) => {
    const fontSize = { fontSize: `${size}px` };


    const buttonClass = classNames(
        "font-medium text-lg rounded-3xl px-4 py-1 transition duration-200 flex justify-center items-center font-lato", // Base styles with padding and smooth hover effect
        {
            "hover:bg-gray-800": linkName !== "signup",
          "border-2 border-white hover:bg-accent hover:border-accent": linkName === "signup", // Special styles for "signup"
        }
      );

  return (
    <Link to={linkName} className={buttonClass} style={fontSize}>
      {buttonName}
    </Link>
  );
};

export default HeaderButton;