import React from "react";
import "./loadingEmployeeTablePage.scss";
import TableSkeleton from "../../skeletons/tableSkeleton/TableSkeleton";

const LoadingEmployeeTablePage = () => {
  return (
    <div className="loadingEmployeeTablePage">
      <div className="lelp_header">
        <div className="text skeleton"></div>
        <div className="text skeleton"></div>
      </div>

      <TableSkeleton />
    </div>
  );
};

export default LoadingEmployeeTablePage;
