import React, { ReactNode } from "react"
import HeaderLoggedIn from "../ui/Header/HeaderLoggedIn"

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen overflow-auto bg-background">
            <HeaderLoggedIn />
            <div className="flex-grow">{children}</div>
        </div>
    )
}

export default DashboardLayout;