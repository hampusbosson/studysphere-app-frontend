import Header from "./components/Header/Header";
import HeaderLoggedIn from "./components/Header/HeaderLoggedIn";
import Footer from "./components/Footer/Footer";
import React, { ReactNode } from "react";
import useAuth from "./context/useAuth";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="flex flex-col justify-between h-screen bg-background">
      {isLoggedIn ? (
        <HeaderLoggedIn />
      ) : (
        <Header />
      )}
      <div className="mt-10">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
