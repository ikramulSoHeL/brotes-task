import React from "react";
import "./employeeCardSkeleton.scss";

const EmployeeCardSkeleton = () => {
  return (
    <div className="employeeCard_skeleton">
      <div className="ecs_imageContainer">
        <div className="ecs_image skeleton"></div>
      </div>

      <div className="esc_infoContainer">
        <div className="name skeleton"></div>
        <div className="dept skeleton"></div>
        <div className="phone skeleton"></div>
        <div className="email skeleton"></div>
      </div>

      <div className="esc_socials">
        <div className="social skeleton"></div>
        <div className="social skeleton"></div>
        <div className="social skeleton"></div>
        <div className="social skeleton"></div>
      </div>
    </div>
  );
};

export default EmployeeCardSkeleton;
