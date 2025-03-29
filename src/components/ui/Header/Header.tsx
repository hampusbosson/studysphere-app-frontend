import React, { useState } from "react";
import Logo from "./Logo";
import HeaderButton from "./HeaderButton";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenuModal from "./MobileMenuModal";
import { paths } from "../../../config/paths";

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false); 

  return (
    <div className="header flex flex-row items-center p-6 border-gray-800 border-b justify-between lg:justify-evenly">
      <Logo clickable={true} size={48}/>
      <div className="flex-row gap-1 items-center hidden md:flex lg:gap-4">
        {/* This div is hidden on small screens */}
        <HeaderButton linkName={paths.landing.home.path} buttonName="Home" />
        <HeaderButton linkName={paths.landing.pricing.path} buttonName="Pricing" />
        <HeaderButton linkName={paths.landing.blog.path} buttonName="Blog" />
      </div>
      <div className="flex-row gap-1 items-center hidden md:flex lg:gap-4">
        {/* This div is also hidden on small screens */}
        <HeaderButton linkName={paths.auth.login.path} buttonName="Log in" />
        <HeaderButton linkName={paths.auth.signup.path} buttonName="Sign up" />
      </div>
      <div className="block pt-1 md:hidden">
        <MobileMenuButton onPress={openModal}/>
      </div>

      {/* Render the mobile modal when 'isModalOpen' is true */}
      {isModalOpen && <MobileMenuModal onClose={closeModal}/>}
    </div>
  );
};

export default Header;