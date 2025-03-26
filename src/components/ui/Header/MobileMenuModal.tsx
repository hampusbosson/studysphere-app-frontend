import React from "react";
import Logo from "./Logo";
import HeaderButton from "./HeaderButton";
import icons from "../../../assets/icons/icons";

interface MobileMenuModalProps {
  onClose: () => void;
}

const MobileMenuModal: React.FC<MobileMenuModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 md:hidden bg-background">
      {/* Close button positioned absolutely */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2"
      >
        {icons.closeIcon}
      </button>
      
      {/* Content Container */}
      <div className="flex flex-col justify-evenly items-center w-full h-full">
        <Logo clickable={false} size={85} />
        <ul className="flex flex-col justify-center items-center gap-4">
          <HeaderButton linkName="home" buttonName="Home" size={24}/>
          <HeaderButton linkName="pricing" buttonName="Pricing" size={24}/>
          <HeaderButton linkName="blog" buttonName="Blog" size={24}/>
        </ul>
        <ul className="flex flex-col justify-center items-center gap-4">
          <HeaderButton linkName="login" buttonName="Log in" size={22}/>
          <HeaderButton linkName="signup" buttonName="Sign up" size={22}/>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenuModal;
