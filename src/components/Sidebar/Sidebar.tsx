import { Class } from "../../utils/classUtils";
import React, { useState } from "react";
import icons from "../../assets/icons/icons";

interface SideBarProps {
  classes: Class[];
  setActiveClass: React.Dispatch<React.SetStateAction<string>>;
}

const SideBar: React.FC<SideBarProps> = ({ classes, setActiveClass }) => {
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);

  return (
    <div className="border-r border-gray-800 flex flex-col h-full p-4">
      <p className="font-bold text-lg mb-4">My Classes</p>
      <ul className="space-y-2">
        {classes.map((classItem, index) => (
          <li
            key={index}
            className="text-gray-300 hover:text-white cursor-pointer flex flex-row justify-between"
            onClick={() => setActiveClass(classItem.name)}
            onMouseEnter={() => setHoveredClass(classItem.name)}
            onMouseLeave={() => setHoveredClass(null)}
          >
            {classItem.name}
            {hoveredClass === classItem.name && (
              <div className="flex flex-row gap-2 -mr-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering the class click
                  }}
                >
                  {icons.editIcon}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering the class click
                  }}
                >
                  {icons.deleteIcon}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
