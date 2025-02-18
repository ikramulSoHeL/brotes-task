import React from "react";
import "./employeeListPage.scss";

// api services
import { API_URLS } from "../../constants/apis-urls";
import { QUERY_KEYS } from "../../constants/query-keys";
import { FetchData } from "../../apis/api-services";

// components
import AppLayout from "../../components/appLayout/AppLayout";

const EmployeeListPage = () => {
  // fetch brands
  const { data: employees, isLoading: isEmployeesLoading } = FetchData({
    url: API_URLS.EMPLOYEE_LIST,
    key: QUERY_KEYS.EMPLOYEE_LIST,
  });

  console.log(employees);

  return (
    <AppLayout>
      <div className="employeeListPage">
        <div className="pageHeader">
          <span>Employee List</span>

          <div className="pageHeader_actions">
            <button className="btn btn-primary">Add New</button>
          </div>
        </div>

        <div className="employee_listContainer">
          {isEmployeesLoading ? (
            <div>Loading...</div>
          ) : (
            employees?.data.map((employee) => (
              <div key={employee._id} className="employee_card">
                <span>{employee.name}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default EmployeeListPage;
