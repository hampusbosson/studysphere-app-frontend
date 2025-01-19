import React from "react";
import icons from "../../assets/icons/icons";
import { Class } from "../../utils/classUtils";
import { Lecture } from "../../utils/lectureUtils";
import { useNavigate } from "react-router-dom";

interface ClassItemProps {
  classItem: Class;
  activeClass: Class | null;
  listOpen: Record<string, boolean>;
  setActiveClass: React.Dispatch<React.SetStateAction<Class | null>>;
  handleEdit: (e: React.FormEvent, className: string) => void;
  handleEditClick: (className: string) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    className: string,
  ) => void;
  hoveredClass: string | null;
  setHoveredClass: React.Dispatch<React.SetStateAction<string | null>>;
  setDeleteModalName: React.Dispatch<React.SetStateAction<string>>;
  openDeleteModal: (className: string) => void;
  classInEdit: string | null;
  inputRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>;
  lectures?: Record<number, Lecture[]>;
  editValues: Record<string, string>;
  openList: (className: string) => void; 
  closeList: (className: string) => void;
}

const ClassItem: React.FC<ClassItemProps> = ({
  classItem,
  activeClass,
  listOpen,
  setActiveClass,
  handleEdit,
  handleEditClick,
  handleChange,
  hoveredClass,
  setHoveredClass,
  openDeleteModal,
  classInEdit,
  inputRefs,
  lectures = {},
  editValues,
  openList,
  closeList,
}) => {

  const navigate = useNavigate();

  const currentLectures = classItem ? lectures[parseInt(classItem.id)] || [] : [];

  const handleClassClick = (classItem: Class) => {
    setActiveClass(classItem);
    navigate('/home');
  }

  const handleLectureClick = (lectureId: string) => {
    
    navigate(`/home/lecture/${lectureId}`);
  };

  return (
    <li
      className={`cursor-pointer flex flex-col justify-between font-semibold ${
        activeClass?.name === classItem.name
          ? "text-white decoration-1"
          : "text-gray-300 hover:text-white"
      }`}
      onClick={() => handleClassClick(classItem)}
      onMouseEnter={() => setHoveredClass(classItem.name)}
      onMouseLeave={() => setHoveredClass(null)}
    >
      <div className="flex flex-row justify-between">
        {classInEdit === classItem.name ? (
          <div className="flex flex-row gap-1 items-center">
            <div
              className={`transform transition-transform duration-200 ${
                listOpen?.[classItem.name] ? "rotate-90" : "rotate-0"
              }`}
            >
              {icons.chevronRight()}
            </div>
            <form
              onSubmit={(e) => handleEdit(e, classItem.name)}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={(el) => (inputRefs.current[classItem.name] = el)}
                type="text"
                value={editValues[classItem.name] || ""} 
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
                e.stopPropagation();
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
                e.stopPropagation();
                handleEditClick(classItem.name);
              }}
            >
              {icons.editIcon}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openDeleteModal(classItem.name);
              }}
            >
              {icons.deleteIcon}
            </button>
          </div>
        )}
      </div>
      {listOpen?.[classItem.name] && (
        <ul
          className={`ml-3 flex flex-col w-[90%] ${
            currentLectures && currentLectures.length > 0 
              ? "border-b border-gray-700 pb-2 mt-2 gap-2"
              : ""
          }`}
        >
          {currentLectures?.map((lectureItem, index) => (
            <li key={index} className="text-white text-sm font-light hover:font-medium">
              <div className="flex flex-row gap-1 items-center" onClick={(e) => {
                e.stopPropagation()
                handleLectureClick(lectureItem.id)
              }}>
                <p>-</p>
                <p>{lectureItem.title}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default ClassItem;
