import React from "react";
import "./employeeInfoModal.scss";

// icons
import { RxCross2 } from "react-icons/rx";

// helpers
import { IMAGE_URL } from "../../../constants/imageUrls";

const EmployeeInfoModal = ({ isOpen, onClose, employeeData }) => {
  return (
    <>
      {isOpen && (
        <div className="employeeInfoModal">
          <div className="employeeInfoModal_content">
            <div className="modal_close">
              <RxCross2 onClick={onClose} />
            </div>

            <div className="eim_imageContainer">
              {employeeData?.image === null ? (
                <img
                  src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg?t=st=1739985008~exp=1739988608~hmac=37296decbb8c96f885ad069fdde5337c9b607cf3122d90383f7f9f062715063a&w=740"
                  alt=""
                />
              ) : (
                <img
                  src={`${IMAGE_URL.EMPLOYEE}/${employeeData?.image}` || ""}
                  alt=""
                />
              )}
            </div>

            <div className="employee_infoContent">
              <div className="info_row">
                <span className="info_title">Name:</span>
                <span className="info_value">{employeeData?.name}</span>
              </div>

              <div className="info_row">
                <span className="info_title">Department:</span>
                <span className="info_value">{employeeData?.department}</span>
              </div>

              <div className="info_row">
                <span className="info_title">Status:</span>
                <span className="info_value">{employeeData?.status}</span>
              </div>

              <div className="info_row">
                <span className="info_title">Phone:</span>
                <span className="info_value">{employeeData?.phone}</span>
              </div>

              <div className="info_row">
                <span className="info_title">Email:</span>
                <span className="info_value">{employeeData?.email}</span>
              </div>

              <div className="info_row">
                <span className="info_title">Address:</span>
                <span className="info_value">{employeeData?.address}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeInfoModal;
