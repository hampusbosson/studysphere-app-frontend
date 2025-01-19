import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import SideBar from "../components/Sidebar/Sidebar";
import icons from "../assets/icons/icons";
import NewClassModal from "../components/Main/NewClassModal";
import ContentBox from "../components/ClassContent/ContentBox";
import { getClasses, Class } from "../utils/classUtils";
import { Lecture } from "../utils/lectureUtils";

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);
  const [activeClass, setActiveClass] = useState<Class | null>(classes[0]);
  const [lecturesByClass, setLecturesByClass] = useState<Record<number, Lecture[]>>({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch classes from the database on mount
  useEffect(() => {
    const fetchClassesWithLectures = async () => {
      try {
        // Fetch classes along with their lectures
        const userClasses = await getClasses(); 
        setClasses(userClasses); // Update classes with fetched data
        setActiveClass(userClasses[0]); // Set the first class as active
  
        // Populate lecturesByClass from fetched data
        const newLecturesByClass = userClasses.reduce(
          (acc: Record<number, Lecture[]>, classItem: Class) => {
            acc[parseInt(classItem.id)] = classItem.lectures || [];
            return acc;
          },
          {},
        );
        setLecturesByClass(newLecturesByClass);
      } catch (error) {
        console.error("Error fetching classes and lectures:", error);
      }
    };
  
    fetchClassesWithLectures();
  }, []);


  return (
    <Layout>
      <div className="bg-background h-full grid grid-cols-6">
        <div className="col-span-1">
          <SideBar
            classes={classes}
            setActiveClass={setActiveClass}
            setClasses={setClasses}
            activeClass={activeClass}
            lectures={lecturesByClass}
          />
        </div>
        <div className="col-span-5 p-8">
          <div className="flex flex-row justify-between items-start">
            <h1 className="text-4xl font-semibold font-montserrat">
              {activeClass ? activeClass.name : null}
            </h1>
            <button
              className="flex flex-row items-center gap-2 bg-accent pl-3 pr-4 py-2 rounded-lg hover:bg-accentHover"
              onClick={openModal}
            >
              {icons.plusIcon}
              <p className="font-semibold text-lg">New Class</p>
            </button>
          </div>
          <div className="mt-4">
            <ContentBox classItem={activeClass} lectures={lecturesByClass} setLectures={setLecturesByClass}/>
          </div>
        </div>
        {isModalOpen && (
          <NewClassModal onClose={closeModal} setClasses={setClasses} />
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
