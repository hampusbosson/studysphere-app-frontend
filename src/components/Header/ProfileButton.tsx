import React from "react";

interface ProfileButtonProps {
    firstLetterEmail: string;
    onPress: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ firstLetterEmail, onPress }) => {
    return (
        <button onClick={onPress}>
            {firstLetterEmail}
        </button>
    )
}

export default ProfileButton;