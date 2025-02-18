import React from "react";
import "./appLayout.scss";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const AppLayout = ({ children }) => {
  return (
    <div className="app_layout">
      <Navbar />
      <Sidebar />
      <div className="app_main">{children}</div>
    </div>
  );
};

export default AppLayout;
