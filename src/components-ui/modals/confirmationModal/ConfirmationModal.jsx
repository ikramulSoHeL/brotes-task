import React from "react";
import "./confirmationModal.scss";

const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="confirmationModal">
      <div className="cm_container">
        <div className="modal_header">
          <span>Are you sure?</span>
          <button onClick={onClose}>
            <span>X</span>
          </button>
        </div>

        <div className="modal_body">
          <p>Are you sure you want to delete this employee?</p>
        </div>

        <div className="modal_btns">
          <button className="btn btn-primary" onClick={onConfirm}>
            yes
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
