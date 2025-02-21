import React, { useState } from "react";
import "./createEmployeeModal.scss";

// icons
import { MdOutlinePhotoCamera } from "react-icons/md";

// api services
import { PostData } from "../../../../apis/api-services";
import { API_URLS } from "../../../../constants/apis-urls";
import { QUERY_KEYS } from "../../../../constants/query-keys";
import validateEmployeeForm from "../../../../helpers/Employee_validation";

const CreateEmployeeModal = ({ isOpen, onClose }) => {
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
      setFormData({
        name: "",
        phone: "",
        email: "",
        department: "",
        address: "",
        status: "",
        image: null,
      });
      setImagePreview(null);
      onClose();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate form
    const isValid = validateEmployeeForm(formData);
    if (!isValid) return;

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
    <>
      {isOpen && (
        <div className="createEmployeeModal">
          <div className="createEmployeeModal_container">
            <form className="modal_form" onSubmit={handleSubmit}>
              <div className="image_inputPreview">
                <div className="image_input">
                  <MdOutlinePhotoCamera />
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="image_preview">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <img
                      src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg?t=st=1739985008~exp=1739988608~hmac=37296decbb8c96f885ad069fdde5337c9b607cf3122d90383f7f9f062715063a&w=740"
                      alt=""
                    />
                  )}
                </div>
              </div>

              <div className="createEmployee_inputSection">
                <div className="input_group">
                  <label htmlFor="name" className="">
                    Name
                  </label>
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

                <div className="input_group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input_group">
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

                <div className="input_group">
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

                <div className="input_group">
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

                <div className="input_group">
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
              </div>

              <div className="createEmployee_btns">
                <button
                  type="submit"
                  className={`primaryBtn ${isEmployeeLoading ? "loading" : ""}`}
                  disabled={isEmployeeLoading}
                >
                  {isEmployeeLoading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  className="primaryBtn outline"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEmployeeModal;
