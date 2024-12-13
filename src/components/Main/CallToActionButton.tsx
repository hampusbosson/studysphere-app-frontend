import React from "react";
import { Link } from "react-router-dom";

interface CallToActionButtonProps {
  linkName: string;
  buttonName: string;
}

const CallToActionButton: React.FC<CallToActionButtonProps> = ({ linkName, buttonName }) => {

  return (
    <Link to={linkName} className="border rounded-full px-8 py-3 font-semibold text-2xl border-accent shadow-glow-accent transition duration-200 hover:shadow-glow-accent-active text-silver">
      {buttonName}
    </Link>
  );
};

export default CallToActionButton;