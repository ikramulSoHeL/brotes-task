// import React from "react";
// import "./createEmployeeModal.scss";

// // api services
// import { PostData } from "../../../../apis/api-services";
// import { API_URLS } from "../../../../constants/apis-urls";
// import { QUERY_KEYS } from "../../../../constants/query-keys";

// const CreateEmployeeModal = ({ onClose }) => {
//   const { data: employee, isLoading: isEmployeeLoading } = PostData({
//     url: API_URLS.EMPLOYEE_CREATE,
//     key: QUERY_KEYS.EMPLOYEE_CREATE,
//     navigateOnSuccess: "/employee-table",
//     onSuccess: () => {
//       onClose();
//     },
//   });

//   return (
//     <div className="createEmployeeModal">
//       <div className="cem_container">
//         <div className="modal_header">
//           <span>Add New Employee</span>

//           <button onClick={onClose}>
//             <span>X</span>
//           </button>
//         </div>

//         <div className="modal_form">
//           <div className="image_input">
//             <input type="file" id="image" accept="image/*" />

//             <div className="image_preview">
//               <img
//                 src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt=""
//               />
//             </div>
//           </div>

//           <div className="form_group">
//             <label htmlFor="name">Name</label>
//             <input type="text" id="name" placeholder="Enter Name" />
//           </div>

//           <div className="form_group">
//             <label htmlFor="phone">Phone</label>
//             <input type="text" id="phone" placeholder="Enter Phone" />
//           </div>

//           <div className="form_group">
//             <label htmlFor="email">Email</label>
//             <input type="text" id="email" placeholder="Enter Email" />
//           </div>

//           <div className="form_group">
//             <label htmlFor="address">Address</label>
//             <input type="text" id="address" placeholder="Enter Address" />
//           </div>

//           <div className="modal_btns">
//             <button className="btn btn-primary">Save</button>
//             <button className="btn btn-secondary">Cancel</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateEmployeeModal;

import React, { useState } from "react";
import "./createEmployeeModal.scss";

// api services
import { PostData } from "../../../../apis/api-services";
import { API_URLS } from "../../../../constants/apis-urls";
import { QUERY_KEYS } from "../../../../constants/query-keys";

const CreateEmployeeModal = ({ onClose }) => {
  // states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    address: "",
    status: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const { mutate: addEmployee, isLoading: isEmployeeLoading } = PostData({
    url: API_URLS.EMPLOYEE_CREATE,
    key: QUERY_KEYS.EMPLOYEE_CREATE,
    onSuccess: () => {
      onClose();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send image and other data
    const dataToSubmit = new FormData();
    dataToSubmit.append("name", formData.name);
    dataToSubmit.append("phone", formData.phone);
    dataToSubmit.append("email", formData.email);
    dataToSubmit.append("department", formData.department);
    dataToSubmit.append("address", formData.address);
    dataToSubmit.append("status", formData.status);
    if (formData.image) {
      dataToSubmit.append("image", formData.image);
    }

    // Call your API service to submit the form
    addEmployee({ formData: dataToSubmit });
  };

  return (
    <div className="createEmployeeModal">
      <div className="cem_container">
        <div className="modal_header">
          <span>Add New Employee</span>
          <button onClick={onClose}>
            <span>X</span>
          </button>
        </div>

        <form className="modal_form" onSubmit={handleSubmit}>
          <div className="image_input">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="image_preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              )}
            </div>
          </div>

          <div className="form_group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form_group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form_group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form_group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="Enter Department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form_group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form_group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="modal_btns">
            <button
              type="submit"
              className={`btn btn-primary ${
                isEmployeeLoading ? "loading" : ""
              }`}
              disabled={isEmployeeLoading}
            >
              {isEmployeeLoading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeModal;
