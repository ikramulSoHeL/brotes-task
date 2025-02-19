import React, { useEffect, useState } from "react";
import "./updateEmployeeModal.scss";

// icons
import { MdOutlinePhotoCamera } from "react-icons/md";

// api services
import { FetchData, PutData } from "../../../../apis/api-services";
import { API_URLS } from "../../../../constants/apis-urls";
import { QUERY_KEYS } from "../../../../constants/query-keys";

// helpers
import { ROOT_IMAGE_URL } from "../../../../utils/config";

const UpdateEmployeeModal = ({ isOpen, onClose, onConfirm, id }) => {
  // states
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    address: "",
    status: "",
    image: null,
  });

  const { data: employeeData, isLoading: isEmployeeDataLoading } = FetchData({
    url: API_URLS.EMPLOYEE_BY_ID + "/" + id,
    key: QUERY_KEYS.EMPLOYEE_BY_ID,
    dependency: true,
    dependencyValue: id,
  });

  // Populate form data when employee data is loaded
  useEffect(() => {
    if (employeeData) {
      setFormData({
        name: employeeData.employee.name || "",
        phone: employeeData.employee.phone || "",
        email: employeeData.employee.email || "",
        department: employeeData.employee.department || "",
        address: employeeData.employee.address || "",
        status: employeeData.employee.status || "",
        image: employeeData.employee.image || null,
      });
    }
  }, [employeeData]);

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

  const { mutate: updateEmployee, isLoading: isUpdateEmployeeLoading } =
    PutData({
      url: API_URLS.EMPLOYEE_UPDATE,
      key: QUERY_KEYS.EMPLOYEE_UPDATE,
      dynamicURL: true,
      onSuccess: () => {
        onClose();
      },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateEmployee({ id: id, formData });
  };

  return (
    <>
      {isOpen && (
        <div className="updateEmployeeModal">
          <div className="updateEmployeeModal_container">
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
                    <>
                      {formData.image !== null ? (
                        <img
                          src={
                            ROOT_IMAGE_URL + "/employeeImages/" + formData.image
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg?t=st=1739985008~exp=1739988608~hmac=37296decbb8c96f885ad069fdde5337c9b607cf3122d90383f7f9f062715063a&w=740"
                          alt=""
                        />
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="updateEmployee_inputSection">
                <div className="input_group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="input_group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="input_group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="input_group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>

                <div className="input_group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="input_group">
                  <label>Status</label>
                  <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="modal_btns">
                <button type="submit" className="primaryBtn">
                  Update
                </button>
                <button className="primaryBtn outline" onClick={onClose}>
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

export default UpdateEmployeeModal;
