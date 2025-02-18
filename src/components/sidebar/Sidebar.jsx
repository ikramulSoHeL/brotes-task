import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";

// icons
import { HiOutlineClipboardList } from "react-icons/hi";
import { GoTable } from "react-icons/go";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_menuContainer">
        <Link to={"/"} className="sidebat_menuItem">
          <HiOutlineClipboardList />
          <span>Employee List</span>
        </Link>

        <Link to={"/employee-table"} className="sidebat_menuItem">
          <GoTable />
          <span>Employee Table View</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
