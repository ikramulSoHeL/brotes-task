import React, { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

// icons
import { IoMenuOutline } from "react-icons/io5";
import { BiLogoJquery } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);

    const sidebar = document.querySelector(".sidebar");
    const app_main = document.querySelector(".app_main");

    sidebar.classList.toggle("sidebar_menu_open");
    app_main.classList.toggle("s");
  };

  return (
    <div className="navbar">
      <Link to={"/"} className="logo_link">
        <BiLogoJquery />
        <span>Brotecs</span>
      </Link>

      <div className="navbar_menu_container">
        <div className="avatar" onClick={handleMenuOpen}>
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>

        {isMenuOpen && (
          <div className="navbar_menu">
            <div className="mavbar_menuItem">
              <span>Profile</span>
            </div>
            <div className="mavbar_menuItem">
              <span>Settings</span>
            </div>
          </div>
        )}

        <div className="sidebar_menuBtn" onClick={handleSidebarMenu}>
          {isSidebarOpen ? <RxCross2 /> : <IoMenuOutline />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
