import React from "react";
import "./tableSkeleton.scss";

const TableSkeleton = () => {
  return (
    <div className="table_skeleton">
      <div className="table_filterContainer">
        <div className="tavle_filter skeleton"></div>
        <div className="tavle_filter skeleton"></div>
        <div className="tavle_filter skeleton"></div>
      </div>

      <div className="table_rows">
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
        <div className="table_row skeleton"></div>
      </div>
    </div>
  );
};

export default TableSkeleton;
