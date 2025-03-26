import React from "react"
import icons from "../../../assets/icons/icons"

interface MobileMenuButtonProps {
    onPress: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onPress }) => {
    return (
        <button onClick={onPress}>
            {icons.baricon}
        </button>
    )
}

export default MobileMenuButton