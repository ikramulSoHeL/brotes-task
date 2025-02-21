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
            src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg?t=st=1739985008~exp=1739988608~hmac=37296decbb8c96f885ad069fdde5337c9b607cf3122d90383f7f9f062715063a&w=740"
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
