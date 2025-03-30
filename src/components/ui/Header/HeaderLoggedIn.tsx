import React, { useState, useRef, useEffect, useCallback } from "react";
import ProfileButton from "./ProfileButton";
import ProfileModal from "./ProfileModal";
import useAuth from "../../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../config/paths";


const HeaderLoggedIn: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

    // Determine active button based on the current path.
    let activeButton = "";
    if (location.pathname.startsWith("/home")) activeButton = "home";
    else if (location.pathname.startsWith("/courses")) activeButton = "courses";
    else if (location.pathname.startsWith("/calendar")) activeButton = "calendar";

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

  const handleHomeClick = () => {
    navigate(paths.app.home.getHref());
  }

  const handleCoursesClick = () => {
    navigate(paths.app.course.getHref());
  }

  const handleCalendarClick = () => {
    navigate(paths.app.calendar.getHref());
  }



  return (
    <div className="header flex flex-row items-center p-2 px-4 border-gray-800 border-b justify-between">
      <div className="flex flex-row gap-6">
        <button onClick={handleHomeClick} className={`${activeButton === 'home' ? 'underline' : ''}`}>Home</button>
        <button onClick={handleCoursesClick} className={`${activeButton === 'courses' ? 'underline' : ''}`}>Courses</button>
        <button onClick={handleCalendarClick} className={`${activeButton === 'calendar' ? 'underline' : ''}`}>Calendar</button>
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
