import React from "react";
import "./sidebar.scss";
import { Link, NavLink } from "react-router-dom";

// icons
import { HiOutlineClipboardList } from "react-icons/hi";
import { GoTable } from "react-icons/go";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_menuSection">
        <span className="sidebar_menuTitle">Navigation</span>

        <div className="sidebar_menuContainer">
          <NavLink
            to={"/"}
            className="sidebat_menuItem"
            activeclassName="active"
          >
            <HiOutlineClipboardList />
            <span>Employee List</span>
          </NavLink>

          <NavLink
            to={"/employee-table"}
            className="sidebat_menuItem"
            activeclassName="active"
          >
            <GoTable />
            <span>Employee Table View</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
