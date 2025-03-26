import React, { ReactNode } from "react"
import Header from "../ui/Header/Header";
import Footer from "../ui/Footer/Footer";

interface LandingLayoutProps {
    children: ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen bg-background">
            <Header />
            <div className="flex-grow">{children}</div>
            <Footer />
        </div>
    )
}

export default LandingLayout;