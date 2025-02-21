import React, { useMemo } from "react";
import "./employeeCard.scss";

// icons
import { BiLogoFacebook } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import { BiLogoLinkedin } from "react-icons/bi";
import { TiSocialSkypeOutline } from "react-icons/ti";
import { GoInfo } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

// helpers
import { ROOT_IMAGE_URL } from "../../utils/config";

const EmployeeCard = ({
  employee,
  handleInfoModalOpen,
  openDeleteEmployeeModal,
}) => {
  const imageUrl = useMemo(() => {
    return employee?.image === null
      ? "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg?t=st=1739985008~exp=1739988608~hmac=37296decbb8c96f885ad069fdde5337c9b607cf3122d90383f7f9f062715063a&w=740"
      : ROOT_IMAGE_URL + "/employeeImages/" + employee?.image;
  }, [employee?.image]);

  return (
    <div className="employee_card">
      <div className="card_actions">
        <button
          className="card_action"
          onClick={() => handleInfoModalOpen(employee)}
        >
          <GoInfo />
        </button>
        <button
          className="card_action"
          onClick={() => openDeleteEmployeeModal(employee._id)}
        >
          <RiDeleteBin6Line />
        </button>
      </div>

      <div className="card_image">
        <div className="card_imageDiv">
          <img src={imageUrl} alt="Employee Profile" />
        </div>
      </div>

      <div className="employee_info">
        <h2>{employee?.name}</h2>
        <span className="employee_dept">{employee?.phone}</span>

        <div className="sdditional_info">
          <p className="employee_phone">{employee?.address}</p>
          <span className="employee_email">{employee?.email}</span>
        </div>
      </div>

      <div className="social_icons">
        <div className="social_icon">
          <BiLogoFacebook />
        </div>
        <div className="social_icon">
          <BiLogoTwitter />
        </div>
        <div className="social_icon">
          <BiLogoLinkedin />
        </div>
        <div className="social_icon">
          <TiSocialSkypeOutline />
        </div>
      </div>

      <div className="card_bottom"></div>
      <div className="card_line1"></div>
      <div className="card_line2"></div>
    </div>
  );
};

export default EmployeeCard;
