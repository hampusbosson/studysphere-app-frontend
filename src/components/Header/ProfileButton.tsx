import React from "react";

interface ProfileButtonProps {
    firstLetterEmail: string | undefined;
    onPress: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ firstLetterEmail, onPress }) => {
    return (
        <button onClick={onPress} className="bg-accentHover rounded-full w-8 h-8">
            {firstLetterEmail}
        </button>
    )
}

export default ProfileButton;