import { Course } from "../../../types/api";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { renameCourse } from "../../../features/courses/api/rename-course";
import { deleteCourse } from "../../../features/courses/api/delete-course";
import DeleteCourseModal from "./DeleteCourseModal";
import CourseItem from "./CourseItem";
import { Lecture } from "../../../types/api";

interface SideBarProps {
  courses: Course[];
  setActiveCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  activeCourse: Course | null;
  lectures?: Record<number, Lecture[]>
}

const SideBar: React.FC<SideBarProps> = ({
  courses,
  setCourses,
  setActiveCourse,
  activeCourse,
  lectures,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalName, setDeleteModalName] = useState("");
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const [courseInEdit, setCourseInEdit] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({}); // Store refs for inputs
  const [listOpen, setListOpen] = useState<Record<string, boolean>>();

  const handleDelete = async () => {
    const courseToDelete = courses.find(
      (courseItem) => courseItem.name === deleteModalName,
    );
    if (!courseToDelete) {
      console.error("Class not found");
      return;
    }

    try {
      await deleteCourse(parseInt(courseToDelete.id));

      const updatedCourses = courses.filter(
        (courseItem) => courseItem.id !== courseToDelete.id,
      );

      setCourses(updatedCourses);

      closeDeleteModal();

      //reset activeClass if it was the one deleted
      if (activeCourse && activeCourse.name === deleteModalName) {
        setActiveCourse(updatedCourses.length > 0 ? updatedCourses[0] : null);
      }
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const handleEditClick = (courseName: string) => {
    setCourseInEdit(courseName);
    setEditValues((prev) => ({
      ...prev,
      [courseName]: courses.find((item) => item.name === courseName)?.name || "", // Initialize with the current class name
    }));

    // Focus the input box after setting it to edit mode
    setTimeout(() => {
      inputRefs.current[courseName]?.focus();
    }, 0);
  };



  const handleEdit = async (e: React.FormEvent, courseName: string) => {
    e.preventDefault();

    const newCourseName = editValues[courseName]?.trim();

    if (!newCourseName) {
      setCourseInEdit(null); // Exit edit mode without changes if input is empty
      return;
    }

    const courseToEdit = courses.find(
      (courseItem) => courseItem.name === courseName,
    );
    if (!courseToEdit) {
      console.error("Class not found");
      return;
    }

    try {
      const renamedCourse = await renameCourse(
        parseInt(courseToEdit.id),
        newCourseName,
      );

      const updatedCourses = courses.map((courseItem) =>
        courseItem.id === renamedCourse.id
          ? { ...courseItem, name: renamedCourse.name }
          : courseItem,
      );

      setCourses(updatedCourses);
      setActiveCourse(renamedCourse);
      setCourseInEdit(null); // Exit edit mode
      
      if (listOpen?.[courseName]) {
        openList(renamedCourse.name)
      } else {
        closeList(renamedCourse.name);
      }
    } catch (error) {
      console.error("Error renaming class:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    courseName: string,
  ) => {
    const value = e.target.value;
    setEditValues((prev) => ({
      ...prev,
      [courseName]: value, // Update only the targeted class name
    }));
  };

  //Exit edit mode when clicking outside of input box
  const handleClickOutside = useCallback(
    () => {
      if (courseInEdit) {
        setCourseInEdit(null);
      }
    },
    [courseInEdit], // Include dependencies
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const openDeleteModal = (courseName: string) => {
    setDeleteModalName(courseName);
    setModalVisible(true);
  };
  const closeDeleteModal = () => setModalVisible(false);

  const openList = (courseName: string) => {
    setListOpen((prev) => ({
      ...prev,
      [courseName]: true,
    }));
  };

  const closeList = (courseName: string) => {
    setListOpen((prev) => ({
      ...prev,
      [courseName]: false,
    }));
  };

  return (
    <div className="border-r border-gray-800 flex flex-col h-full p-4">
      <p className="font-bold text-lg mb-4">My Classes</p>
      <ul className="space-y-2">
        {courses.map((courseItem, index) => (
          <CourseItem
            key={index}
            courseItem={courseItem}
            activeCourse={activeCourse}
            listOpen={listOpen || {}}
            setActiveCourse={setActiveCourse}
            handleEdit={handleEdit}
            handleEditClick={handleEditClick}
            handleChange={handleChange}
            hoveredCourse={hoveredCourse}
            setHoveredCourse={setHoveredCourse}
            setDeleteModalName={setDeleteModalName}
            openDeleteModal={openDeleteModal}
            courseInEdit={courseInEdit}
            inputRefs={inputRefs}
            lectures={lectures}
            editValues={editValues}
            openList={openList}
            closeList={closeList}
          />
        ))}
      </ul>
      {modalVisible && (
        <DeleteCourseModal
          courseName={deleteModalName}
          onClose={closeDeleteModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default SideBar;
