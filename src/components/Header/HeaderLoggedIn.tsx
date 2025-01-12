import React, { useState, useRef, useEffect, useCallback } from "react";
import ProfileButton from "./ProfileButton";
import ProfileModal from "./ProfileModal";
import useAuth from "../../context/useAuth";


const HeaderLoggedIn: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Memoize handleClickOutside to avoid unnecessary re-renders
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, handleClickOutside]);

  const firstLetterEmail = user?.email.charAt(0).toUpperCase();

  return (
    <div className="header flex flex-row items-center p-2 px-4 border-gray-800 border-b justify-between">
      <div className="flex flex-row gap-4">
        <button>button1</button>
        <button>button2</button>
        <button>button3</button>
      </div>
      <ProfileButton firstLetterEmail={firstLetterEmail} onPress={openModal} />
      {isModalOpen && (
        <div
          ref={modalRef}
          style={{
            position: "absolute",
          }}
        >
          <ProfileModal email={user?.email} />
        </div>
      )}
    </div>
  );
};

export default HeaderLoggedIn;
