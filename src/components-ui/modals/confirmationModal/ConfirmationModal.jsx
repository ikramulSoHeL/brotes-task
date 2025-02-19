import React from "react";
import "./confirmationModal.scss";

// icons
import { RxCross2 } from "react-icons/rx";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <>
      {isOpen && (
        <div className="confirmationModal">
          <div className="confirmationModal_container">
            <div className="modal_header">
              <span>Delete!!!</span>

              <button onClick={onClose} className="modal_closeBtn">
                <RxCross2 />
              </button>
            </div>

            <div className="confirmationModal_content">
              <p>Are you sure you want to delete this employee?</p>
            </div>

            <div className="modal_btns">
              <button className="primaryBtn" onClick={onConfirm}>
                yes
              </button>
              <button className="primaryBtn outline" onClick={onClose}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
