import React, { useState } from "react";
import { Class } from "../../utils/classUtils";
import icons from "../../assets/icons/icons";
import AddLectureModal from "./AddLectureModal";

interface ContentBoxProps {
    classItem: Class | null;
}

const ContentBox: React.FC<ContentBoxProps> = ({ classItem }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div>
            <button onClick={openModal} className="flex flex-row bg-gray-700 rounded-lg py-2 pl-3 pr-4 items-center justify-center gap-1 hover:bg-gray-800 font-semibold">
                {icons.plusIcon} Add lecture
            </button>
            {isModalOpen && <AddLectureModal onClose={closeModal} classItem={classItem}/>}
        </div>
    )
}

export default ContentBox;