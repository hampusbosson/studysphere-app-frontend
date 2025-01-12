import React, { useState } from "react";
import Layout from "../Layout";
import SideBar from "../components/Sidebar/Sidebar";
import icons from "../assets/icons/icons";
import NewClassModal from "../components/Main/NewClassModal";

const HomePage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [classes, setClasses] = useState<string[]>([])

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <Layout>
      <div className="bg-background h-full grid grid-cols-6">
        <div className="col-span-1">
          <SideBar classes={classes}/>
        </div>
        <div className="col-span-5 flex flex-col justify-center items-center">
          <button
            className="flex flex-row fixed right-8 top-20 items-center gap-2 bg-accent pl-3 pr-4 py-2 rounded-lg hover:bg-accentHover"
            onClick={openModal}
          >
            {icons.plusIcon}
            <p className="font-semibold text-lg">New Class</p>
          </button>
          <h1 className="text-4xl font-bold text-silver">
            Welcome to StudySphere
          </h1>
          <p className="text-gray-300 mt-4 text-lg">
            Master your studies with ease and efficiency.
          </p>
        </div>
        {modalVisible && <NewClassModal onClose={closeModal} setClasses={setClasses}/>}
      </div>
    </Layout>
  );
};

export default HomePage;
