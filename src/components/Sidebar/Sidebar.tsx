import { Class } from "../../utils/classUtils";
import React, { useState, useEffect, useCallback, useRef } from "react";
import icons from "../../assets/icons/icons";
import { renameClass } from "../../utils/classUtils";

interface SideBarProps {
  classes: Class[];
  setActiveClass: React.Dispatch<React.SetStateAction<string>>;
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
  activeClass: string;
}

const SideBar: React.FC<SideBarProps> = ({
  classes,
  setClasses,
  setActiveClass,
  activeClass,
}) => {
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);
  const [classInEdit, setClassInEdit] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({}); // Store refs for inputs

  const handleEditClick = (className: string) => {
    setClassInEdit(className);
    setEditValues((prev) => ({
      ...prev,
      [className]: className, // Initialize with the current name
    }));

    // Focus the input box after setting it to edit mode
    setTimeout(() => {
    inputRefs.current[className]?.focus();
    }, 0);
  };

  const handleEdit = async (e: React.FormEvent, className: string) => {
    e.preventDefault();

    const newClassName = editValues[className]?.trim();

    if (!newClassName) {
      setClassInEdit(null); // Exit edit mode without changes if input is empty
      return;
    }

    const classToEdit = classes.find((classItem) => classItem.name === className);
    if (!classToEdit) {
        console.error("Class not found");
        return;
    }

    try {
        const renamedClass = await renameClass(parseInt(classToEdit.id), newClassName)

        const updatedClasses = classes.map((classItem) =>
            classItem.id === renamedClass.id
              ? { ...classItem, name: renamedClass.name }
              : classItem,
          );

          console.log(updatedClasses);
          setClasses(updatedClasses);
          setActiveClass(newClassName);
          setClassInEdit(null); // Exit edit mode

    } catch (error) {
        console.error("Error renaming class:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    className: string,
  ) => {
    const value = e.target.value;
    setEditValues((prev) => ({
      ...prev,
      [className]: value, // Update only the targeted class name
    }));
  };

  //Exit edit mode when clicking outside of input box
  const handleClickOutside = useCallback(
    () => {
      if (classInEdit) {
        setClassInEdit(null);
      }
    },
    [classInEdit], // Include dependencies
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="border-r border-gray-800 flex flex-col h-full p-4">
      <p className="font-bold text-lg mb-4">My Classes</p>
      <ul className="space-y-2">
        {classes.map((classItem, index) => (
          <li
            key={index}
            className={`cursor-pointer flex flex-row justify-between ${
                activeClass === classItem.name ? "text-white underline decoration-1" : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveClass(classItem.name)}
            onMouseEnter={() => setHoveredClass(classItem.name)}
            onMouseLeave={() => setHoveredClass(null)}
          >
            {classInEdit === classItem.name ? (
              <form
                onSubmit={(e) => handleEdit(e, classItem.name)}
                onClick={(e) => e.stopPropagation()} // Prevent click from propagating
              >
                <input
                  ref={(el) => (inputRefs.current[classItem.name] = el)}
                  type="text"
                  value={editValues[classItem.name] || ""} // Use specific value for this class
                  onChange={(e) => handleChange(e, classItem.name)}
                  className="bg-transparent border-b border-gray-600 text-white focus:outline-none"
                />
              </form>
            ) : (
              <span>{classItem.name}</span> // Display class name if not in edit mode
            )}
            {hoveredClass === classItem.name && (
              <div className="flex flex-row gap-2 -mr-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering the class click
                    handleEditClick(classItem.name);
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
