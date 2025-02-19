import React, { useEffect, useState } from "react";
import "./employeeListPage.scss";

// icons
import { BiLogoFacebook } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import { BiLogoLinkedin } from "react-icons/bi";
import { TiSocialSkypeOutline } from "react-icons/ti";
import { GoInfo } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

// api services
import { API_URLS } from "../../constants/apis-urls";
import { QUERY_KEYS } from "../../constants/query-keys";
import { FetchData } from "../../apis/api-services";

// helpers
import { ROOT_IMAGE_URL } from "../../utils/config";

// components
import AppLayout from "../../components/appLayout/AppLayout";

const EmployeeListPage = () => {
  // states
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // fetch brands
  const { data: employees, isLoading: isEmployeesLoading } = FetchData({
    url: API_URLS.EMPLOYEE_LIST,
    key: QUERY_KEYS.EMPLOYEE_LIST,
  });

  useEffect(() => {
    if (employees?.data) {
      const filter = employees.data.filter((employee) => {
        const fullName = employee.name || "";
        return (
          fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.email?.toLowerCase().includes(searchQuery.toLowerCase()) // Use optional chaining for email
        );
      });
      setFilteredEmployees(filter);
    } else {
      // If employees.data is null or undefined, set filteredEmployees to an empty array
      setFilteredEmployees([]);
    }
  }, [searchQuery, employees]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <AppLayout>
      <div className="employeeListPage">
        <div className="pageHeader">
          <span>Employee List</span>

          <div className="employee_search">
            <input
              type="text"
              placeholder="Search Employee...."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="employee_listContainer">
          {isEmployeesLoading ? (
            <div>Loading...</div>
          ) : (
            filteredEmployees?.map((employee) => (
              <div key={employee._id} className="employee_card">
                <div className="card_actions">
                  <div className="card_action">
                    <GoInfo />
                  </div>
                  <div className="card_action">
                    <RiDeleteBin6Line />
                  </div>
                </div>

                <div className="card_image">
                  <div className="card_imageDiv">
                    {employee?.image === null ? (
                      <img
                        src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                        alt="Employee Profile"
                      />
                    ) : (
                      <img
                        src={
                          ROOT_IMAGE_URL + "/employeeImages/" + employee?.image
                        }
                        alt="Employee Profile"
                      />
                    )}
                  </div>
                </div>

                <div className="employee_info">
                  <h2>{employee?.name}</h2>
                  <p>{employee?.department}</p>
                  <p>{employee?.email}</p>
                  <p>{employee?.phone}</p>
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
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default EmployeeListPage;
