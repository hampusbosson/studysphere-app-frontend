import { Class } from "../../utils/classUtils";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { renameClass, deleteClass } from "../../utils/classUtils";
import DeleteClassModal from "./DeleteClassModal";
import ClassItem from "./ClassItem";
import { Lecture } from "../../utils/lectureUtils";

interface SideBarProps {
  classes: Class[];
  setActiveClass: React.Dispatch<React.SetStateAction<Class | null>>;
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
  activeClass: Class | null;
  lectures?: Record<number, Lecture[]>
}

const SideBar: React.FC<SideBarProps> = ({
  classes,
  setClasses,
  setActiveClass,
  activeClass,
  lectures,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalName, setDeleteModalName] = useState("");
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);
  const [classInEdit, setClassInEdit] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({}); // Store refs for inputs
  const [listOpen, setListOpen] = useState<Record<string, boolean>>();

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
      [className]: classes.find((item) => item.name === className)?.name || "", // Initialize with the current class name
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
      
      if (listOpen?.[className]) {
        openList(renamedClass.name)
      } else {
        closeList(renamedClass.name);
      }
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

  return (
    <div className="border-r border-gray-800 flex flex-col h-full p-4">
      <p className="font-bold text-lg mb-4">My Classes</p>
      <ul className="space-y-2">
        {classes.map((classItem, index) => (
          <ClassItem
            key={index}
            classItem={classItem}
            activeClass={activeClass}
            listOpen={listOpen || {}}
            setActiveClass={setActiveClass}
            handleEdit={handleEdit}
            handleEditClick={handleEditClick}
            handleChange={handleChange}
            hoveredClass={hoveredClass}
            setHoveredClass={setHoveredClass}
            setDeleteModalName={setDeleteModalName}
            openDeleteModal={openDeleteModal}
            classInEdit={classInEdit}
            inputRefs={inputRefs}
            lectures={lectures}
            editValues={editValues}
            openList={openList}
            closeList={closeList}
          />
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
