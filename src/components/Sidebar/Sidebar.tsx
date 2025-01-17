import { Class } from "../../utils/classUtils";
import React, { useState, useEffect, useCallback, useRef } from "react";
import icons from "../../assets/icons/icons";
import { renameClass, deleteClass } from "../../utils/classUtils";
import DeleteClassModal from "./DeleteClassModal";

interface SideBarProps {
  classes: Class[];
  setActiveClass: React.Dispatch<React.SetStateAction<Class | null>>;
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
  activeClass: Class | null;
}

const SideBar: React.FC<SideBarProps> = ({
  classes,
  setClasses,
  setActiveClass,
  activeClass,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalName, setDeleteModalName] = useState("");
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);
  const [classInEdit, setClassInEdit] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({}); // Store refs for inputs
  const [listOpen, setListOpen] = useState<Record<string, boolean>>();

  const openList = (className: string) => {
    setListOpen((prev) => ({
      ...prev,
      [className]: true,
    }));
  };

  const closeList = (className: string) => {
    setListOpen((prev) => ({
      ...prev,
      [className]: false,
    }));
  };

  const handleDelete = async () => {
    const classToDelete = classes.find(
      (classItem) => classItem.name === deleteModalName,
    );
    if (!classToDelete) {
      console.error("Class not found");
      return;
    }

    try {
      await deleteClass(parseInt(classToDelete.id));

      const updatedClasses = classes.filter(
        (classItem) => classItem.id !== classToDelete.id,
      );

      setClasses(updatedClasses);

      closeDeleteModal();

      //reset activeClass if it was the one deleted
      if (activeClass && activeClass.name === deleteModalName) {
        setActiveClass(updatedClasses.length > 0 ? updatedClasses[0] : null);
      }
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

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

    const classToEdit = classes.find(
      (classItem) => classItem.name === className,
    );
    if (!classToEdit) {
      console.error("Class not found");
      return;
    }

    try {
      const renamedClass = await renameClass(
        parseInt(classToEdit.id),
        newClassName,
      );

      const updatedClasses = classes.map((classItem) =>
        classItem.id === renamedClass.id
          ? { ...classItem, name: renamedClass.name }
          : classItem,
      );

      setClasses(updatedClasses);
      setActiveClass(renamedClass);
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

  const openDeleteModal = (className: string) => {
    setDeleteModalName(className);
    setModalVisible(true);
  };
  const closeDeleteModal = () => setModalVisible(false);

  return (
    <div className="border-r border-gray-800 flex flex-col h-full p-4">
      <p className="font-bold text-lg mb-4">My Classes</p>
      <ul className="space-y-2">
        {classes.map((classItem, index) => (
          <li
            key={index}
            className={`cursor-pointer flex flex-row justify-between ${
              activeClass && activeClass.name === classItem.name
                ? "text-white underline decoration-1"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveClass(classItem)}
            onMouseEnter={() => setHoveredClass(classItem.name)}
            onMouseLeave={() => setHoveredClass(null)}
          >
            {classInEdit === classItem.name ? (
              <div className="flex flex-row gap-1 items-center">
                {icons.chevronRight()}
                <form
                  onSubmit={(e) => handleEdit(e, classItem.name)}
                  onClick={(e) => e.stopPropagation()} // Prevent click from propagating
                >
                  <input
                    ref={(el) => (inputRefs.current[classItem.name] = el)}
                    type="text"
                    value={editValues[classItem.name] || ""} // Use specific value for this class
                    onChange={(e) => handleChange(e, classItem.name)}
                    className="bg-transparent border-b border-gray-600 text-white focus:outline-none w-[90%]"
                  />
                </form>
              </div>
            ) : (
              <div className="flex flex-row gap-1 items-center">
                <button
                  type="button"
                  className="text-gray-500 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation(); //prevent triggering the classclick
                    if (listOpen?.[classItem.name]) {
                      closeList(classItem.name);
                    } else {
                      openList(classItem.name);
                    }
                  }}
                >
                  <div
                    className={`transform transition-transform duration-200 ${
                      listOpen?.[classItem.name] ? "rotate-90" : "rotate-0"
                    }`}
                  >
                    {icons.chevronRight()}
                  </div>
                </button>
                <span>{classItem.name}</span>
              </div>
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
                    openDeleteModal(classItem.name);
                  }}
                >
                  {icons.deleteIcon}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {modalVisible && (
        <DeleteClassModal
          className={deleteModalName}
          onClose={closeDeleteModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default SideBar;
