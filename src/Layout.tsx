import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import React, { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <div className="mt-10">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
