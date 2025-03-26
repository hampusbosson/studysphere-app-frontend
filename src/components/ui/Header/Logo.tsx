import React from "react";
import logo from "../../../assets/images/studysphere-logo-3.png";
import { Link } from "react-router-dom";

interface LogoProps {
  clickable: boolean;
  size: number;
}

const Logo: React.FC<LogoProps> = ({ clickable, size }) => {
    const logoStyle = { height: `${size}px` };

  return (
    <>
      {clickable ? (
        <Link to="/">
          <img src={logo} style={logoStyle} className="cursor-pointer" alt="Logo" />
        </Link>
      ) : (
        <img src={logo} style={logoStyle} alt="Logo" />
      )}
    </>
  );
};

export default Logo;
