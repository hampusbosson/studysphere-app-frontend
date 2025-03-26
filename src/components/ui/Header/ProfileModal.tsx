import React from "react";
import ProfileModalButton from "./ProfileModalButton";
import icons from "../../../assets/icons/icons";
import { logout } from "../../../lib/auth";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../context/useAuth";


interface ProfileModalProps {
  email: string | null | undefined;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ email }) => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleLogout = async() => {
        try {
            await logout();

            setUser(null);
            
            navigate('/');
        } catch(error) {
            console.error("Login failed:", error); // Log any errors
            alert("Login failed. Please try again."); // Provide feedback to the user
        }
    }

  return (
    <div className="fixed top-32 right-6 transform -translate-y-1/2 flex justify-start items-start z-50 bg-background w-64 rounded-lg border border-gray-400">
      <div className="flex flex-col items-start w-full">
      <p className="font-raleway truncate overflow-hidden w-full max-w-[16rem] px-4 pt-2 mb-2">
          {email}
        </p>
        <div className="w-full border-t border-gray-500 flex flex-col">
            <ProfileModalButton name="Upgrade" icon={icons.upgradeIcon} className=""/>
            <ProfileModalButton name="Settings" icon={icons.settingsIcon}/>
            <ProfileModalButton name="Logout" icon={icons.logoutIcon} className="rounded-b-lg pb-3" onPress={handleLogout}/>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
