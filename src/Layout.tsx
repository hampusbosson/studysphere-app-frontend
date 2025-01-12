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
    <div className="flex flex-col h-screen bg-background">
      {isLoggedIn ? <HeaderLoggedIn /> : <Header />}
      <div className="flex-grow">{children}</div>
      {isLoggedIn ? null : <Footer />}
    </div>
  );
};

export default Layout;
