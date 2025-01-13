import React, { useState, useEffect} from "react";
import Layout from "../Layout";
import SideBar from "../components/Sidebar/Sidebar";
import icons from "../assets/icons/icons";
import NewClassModal from "../components/Main/NewClassModal";
import { getClasses, Class } from "../utils/classUtils";



const HomePage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [classes, setClasses] = useState<Class[]>([])
  const [activeClass, setActiveClass] = useState('');


  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

    // Fetch classes from the database on mount
    useEffect(() => {
      const fetchClasses = async () => {
        try {
          const userClasses = await getClasses();
          setClasses(userClasses); // Update classes with fetched data
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchClasses();
    }, []);
  

  return (
    <Layout>
      <div className="bg-background h-full grid grid-cols-6">
        <div className="col-span-1">
          <SideBar classes={classes} setActiveClass={setActiveClass}/>
        </div>
        <div className="col-span-5 flex flex-row justify-between items-start p-8">
          <h1 className="text-4xl font-semibold font-montserrat">{activeClass}</h1>
          <button
            className="flex flex-row items-center gap-2 bg-accent pl-3 pr-4 py-2 rounded-lg hover:bg-accentHover"
            onClick={openModal}
          >
            {icons.plusIcon}
            <p className="font-semibold text-lg">New Class</p>
          </button>
        </div>
        {modalVisible && <NewClassModal onClose={closeModal} setClasses={setClasses}/>}
      </div>
    </Layout>
  );
};

export default HomePage;
