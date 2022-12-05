import React from "react";
import logos from "./logos.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="topnav">
      <img src={logos} className="logo" alt="logo" />
      <a1>Help </a1>
      <a1>About</a1>

      <Link to="/Logout">
        <a2>Logout</a2>
      </Link>
    </div>
  );
};

export default Navbar;
