import React from "react";

interface SideBarProps {
  classes: string[];
}

const SideBar: React.FC<SideBarProps> = ({ classes }) => {
  return (
    <div className="border-r border-gray-800 flex flex-col h-full p-4">
      <p className="font-bold text-lg mb-4">My Classes</p>
      <ul className="space-y-2">
        {classes.map((className, index) => (
          <li key={index} className="text-gray-300 hover:text-white cursor-pointer">
            {className}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;