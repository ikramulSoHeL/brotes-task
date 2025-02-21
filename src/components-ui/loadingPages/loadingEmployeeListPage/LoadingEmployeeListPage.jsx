import React from "react";
import "./loadingEmployeeListPage.scss";

// components
import EmployeeCardSkeleton from "../../skeletons/employeeCardSkeleton/EmployeeCardSkeleton";

const LoadingEmployeeListPage = () => {
  return (
    <div className="loadingEmployeeListPage">
      <div className="lelp_header">
        <div className="text skeleton"></div>
        <div className="text skeleton"></div>
      </div>

      <div className="lelp_cards">
        <EmployeeCardSkeleton />
        <EmployeeCardSkeleton />
        <EmployeeCardSkeleton />
        <EmployeeCardSkeleton />
        <EmployeeCardSkeleton />
        <EmployeeCardSkeleton />
        <EmployeeCardSkeleton />
        <EmployeeCardSkeleton />
        <EmployeeCardSkeleton />
        <EmployeeCardSkeleton />
      </div>
    </div>
  );
};

export default LoadingEmployeeListPage;
