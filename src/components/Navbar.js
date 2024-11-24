import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="https://via.placeholder.com/40"
          alt="Logo"
          className="navbar-logo"
        />
        <span className="navbar-title">ResearchZeal</span>
      </div>
      <div className="navbar-right">
        <img
          src="https://via.placeholder.com/40"
          alt="Avatar"
          className="navbar-avatar"
        />
        <button className="navbar-menu-icon">
          <span className="menu-bar">_</span>
          <span className="menu-bar">_</span>
          <span className="menu-bar">_</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
