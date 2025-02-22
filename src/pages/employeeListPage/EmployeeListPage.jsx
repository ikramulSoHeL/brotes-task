import React, { useCallback, useEffect, useState } from "react";
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
import { DeleteData, FetchData } from "../../apis/api-services";

// helpers
import { ROOT_IMAGE_URL } from "../../utils/config";

// components
import EmployeeCardSkeleton from "../../components-ui/skeletons/employeeCardSkeleton/EmployeeCardSkeleton";
import EmployeeInfoModal from "../../components-ui/modals/employeeInfoModal/EmployeeInfoModal";
import ConfirmationModal from "../../components-ui/modals/confirmationModal/ConfirmationModal";
import EmployeeCard from "../../components-ui/employeeCard/EmployeeCard";
import LoadingEmployeeListPage from "../../components-ui/loadingPages/loadingEmployeeListPage/LoadingEmployeeListPage";

const EmployeeListPage = () => {
  // states
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isEmployeeInfoModalOpen, setIsEmployeeInfoModalOpen] = useState(false);
  const [employeeInfoData, setEmployeeInfoData] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // fetch employees
  const { data: employees, isLoading: isEmployeesLoading } = FetchData({
    url: API_URLS.EMPLOYEE_LIST,
    key: QUERY_KEYS.EMPLOYEE_LIST,
  });

  // search
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

  // info modal
  const handleInfoModalOpen = (data) => {
    setIsEmployeeInfoModalOpen(true);
    setEmployeeInfoData(data);
  };
  const handleInfoModalClose = () => {
    setIsEmployeeInfoModalOpen(false);
    setEmployeeInfoData(null);
  };

  // delete employee
  const openDeleteEmployeeModal = (id) => {
    setIsConfirmationModalOpen(true);
    setSelectedEmployeeId(id);
  };
  const closeDeleteEmployeeModal = () => {
    setIsConfirmationModalOpen(false);
    setSelectedEmployeeId(null);
  };
  const { mutate: deleteEmployee, isLoading: isDeleteEmployeeLoading } =
    DeleteData({
      url: API_URLS.EMPLOYEE_DELETE,
      key: QUERY_KEYS.EMPLOYEE_DELETE,
      dynamicURL: true,
      onSuccess: () => {
        closeDeleteEmployeeModal();
      },
    });
  const handleDeleteEmployee = (id) => {
    deleteEmployee({ id: id });
    setIsConfirmationModalOpen(false);
  };

  return (
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
          <>
            <EmployeeCardSkeleton />
            <EmployeeCardSkeleton />
            <EmployeeCardSkeleton />
            <EmployeeCardSkeleton />
            <EmployeeCardSkeleton />
            <EmployeeCardSkeleton />
            <EmployeeCardSkeleton />
            <EmployeeCardSkeleton />
            <EmployeeCardSkeleton />
            <EmployeeCardSkeleton />
            <EmployeeCardSkeleton />
          </>
        ) : employees?.data?.length === 0 ? (
          <div className="empty_data">
            <span>No Employees Found</span>
          </div>
        ) : (
          filteredEmployees?.map((employee, index) => (
            <EmployeeCard
              key={index}
              employee={employee}
              handleInfoModalOpen={handleInfoModalOpen}
              openDeleteEmployeeModal={openDeleteEmployeeModal}
            />
          ))
        )}
      </div>

      <EmployeeInfoModal
        isOpen={isEmployeeInfoModalOpen}
        onClose={handleInfoModalClose}
        employeeData={employeeInfoData}
      />

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={() => handleDeleteEmployee(selectedEmployeeId)}
      />
    </div>
  );
};

export default EmployeeListPage;
