import React from "react";

interface ProfileModalButtonProps {
  onPress: () => void;
  name: string;
  icon: React.ReactNode;
  className?: string;
}

const ProfileModalButton: React.FC<ProfileModalButtonProps> = ({
  onPress,
  name,
  icon,
  className,
}) => {
  return (
    <button
      onClick={onPress}
      className={`w-full text-left font-medium text-lg flex flex-row gap-2 items-center hover:bg-gray-900 px-4 py-2 ${className}`}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProfileModalButton;
