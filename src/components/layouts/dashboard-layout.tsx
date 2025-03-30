import React, { ReactNode } from "react"
import HeaderLoggedIn from "../ui/Header/HeaderLoggedIn"

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen bg-background">
            <HeaderLoggedIn />
            <div className="flex-grow bg-background-overlay">{children}</div>
        </div>
    )
}

export default DashboardLayout;