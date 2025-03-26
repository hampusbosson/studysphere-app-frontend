import React from "react";
import icons from "../../../assets/icons/icons";
import { Course } from "../../../types/api";
import { Lecture } from "../../../types/api";
import { useNavigate } from "react-router-dom";
import LectureListItem from "../../course-material/components/LectureListItem";

interface CourseItemProps {
  courseItem: Course;
  activeCourse: Course | null;
  listOpen: Record<string, boolean>;
  setActiveCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  handleEdit: (e: React.FormEvent, courseName: string) => void;
  handleEditClick: (courseName: string) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    courseName: string,
  ) => void;
  hoveredCourse: string | null;
  setHoveredCourse: React.Dispatch<React.SetStateAction<string | null>>;
  setDeleteModalName: React.Dispatch<React.SetStateAction<string>>;
  openDeleteModal: (courseName: string) => void;
  courseInEdit: string | null;
  inputRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>;
  lectures?: Record<number, Lecture[]>;
  editValues: Record<string, string>;
  openList: (courseName: string) => void;
  closeList: (courseName: string) => void;
  setActiveLecture: React.Dispatch<React.SetStateAction<string>>
  activeLecture: string;
}

const CourseItem: React.FC<CourseItemProps> = ({
  courseItem,
  activeCourse,
  listOpen,
  setActiveCourse,
  handleEdit,
  handleEditClick,
  handleChange,
  hoveredCourse,
  setHoveredCourse,
  openDeleteModal,
  courseInEdit,
  inputRefs,
  lectures = {},
  editValues,
  openList,
  closeList,
  setActiveLecture,
  activeLecture,
}) => {
  const navigate = useNavigate();

  const currentLectures = courseItem
    ? lectures[parseInt(courseItem.id)] || []
    : [];

  const handleCourseClick = (courseItem: Course) => {
    setActiveCourse(courseItem);
    navigate("/home");
  };

  return (
    <li
      className={`cursor-pointer flex flex-col justify-between font-semibold ${
        activeCourse?.name === courseItem.name
          ? "text-white decoration-1"
          : "text-gray-300 hover:text-white"
      }`}
      onClick={() => handleCourseClick(courseItem)}
      onMouseEnter={() => setHoveredCourse(courseItem.name)}
      onMouseLeave={() => setHoveredCourse(null)}
    >
      <div className="flex flex-row justify-between">
        {courseInEdit === courseItem.name ? (
          <div className="flex flex-row gap-1 items-center">
            <div
              className={`transform transition-transform duration-200 ${
                listOpen?.[courseItem.name] ? "rotate-90" : "rotate-0"
              }`}
            >
              {icons.chevronRight()}
            </div>
            <form
              onSubmit={(e) => handleEdit(e, courseItem.name)}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={(el) => (inputRefs.current[courseItem.name] = el)}
                type="text"
                value={editValues[courseItem.name] || ""}
                onChange={(e) => handleChange(e, courseItem.name)}
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
                e.stopPropagation();
                if (listOpen?.[courseItem.name]) {
                  closeList(courseItem.name);
                } else {
                  openList(courseItem.name);
                }
              }}
            >
              <div
                className={`transform transition-transform duration-200 ${
                  listOpen?.[courseItem.name] ? "rotate-90" : "rotate-0"
                }`}
              >
                {icons.chevronRight()}
              </div>
            </button>
            <span>{courseItem.name}</span>
          </div>
        )}
        {hoveredCourse === courseItem.name && (
          <div className="flex flex-row gap-2 -mr-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(courseItem.name);
              }}
            >
              {icons.editIcon}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openDeleteModal(courseItem.name);
              }}
            >
              {icons.deleteIcon}
            </button>
          </div>
        )}
      </div>
      {listOpen?.[courseItem.name] && (
        <ul
          className={`ml-3 flex flex-col w-[90%] ${
            currentLectures && currentLectures.length > 0
              ? "border-b border-gray-700 pb-2 mt-2 gap-2"
              : ""
          }`}
        >
          {currentLectures?.map((lectureItem, index) => (
            <li
              key={index}
              className="text-white text-sm font-light hover:font-medium"
            >
              <LectureListItem 
                setActiveLecture={setActiveLecture}
                activeLecture={activeLecture}
                lectureItem={lectureItem}
                courseItem={courseItem}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CourseItem;
