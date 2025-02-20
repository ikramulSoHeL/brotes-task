import React, { useEffect, useMemo, useState } from "react";
import "./employeeTablePage.scss";

// icons
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { GoInfo } from "react-icons/go";

// helpers
import { ROOT_IMAGE_URL } from "../../utils/config";

// api services
import { DeleteData, FetchData } from "../../apis/api-services";
import { API_URLS } from "../../constants/apis-urls";
import { QUERY_KEYS } from "../../constants/query-keys";

// components
import AppLayout from "../../components/appLayout/AppLayout";
import DataTable from "../../components-ui/data_table/DataTable";
import CreateEmployeeModal from "./components/createEmployeeModal/CreateEmployeeModal";
import ConfirmationModal from "../../components-ui/modals/confirmationModal/ConfirmationModal";
import UpdateEmployeeModal from "./components/updateEmployeeModal/UpdateEmployeeModal";

const EmployeeTablePage = () => {
  // states
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isCreateEmployeeModalOpen, setIsCreateEmployeeModalOpen] =
    useState(false);
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // create employee
  const handleCreateEmployeeModalOpen = () => {
    setIsCreateEmployeeModalOpen(true);
  };
  const handleCreateEmployeeModalClose = () => {
    setIsCreateEmployeeModalOpen(false);
  };

  // update employee
  const handleEditEmployeeModalOpen = (id) => {
    setIsEditEmployeeModalOpen(true);
    setSelectedEmployeeId(id);
  };
  const handleEditEmployeeModalClose = () => {
    setIsEditEmployeeModalOpen(false);
    setSelectedEmployeeId(null);
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

  // fetch employees data
  const { data: employees, isLoading: isEmployeesLoading } = FetchData({
    url: API_URLS.EMPLOYEE_LIST,
    key: QUERY_KEYS.EMPLOYEE_LIST,
  });

  // Filter employees based on search term and selected filters
  const filteredEmployees = employees?.data.filter((employee) => {
    const matchesSearchTerm =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !selectedStatus || employee.status === selectedStatus;

    const matchesDepartment =
      !selectedDepartment || employee.department === selectedDepartment;

    return matchesSearchTerm && matchesStatus && matchesDepartment;
  });

  const columns = [
    {
      accessorKey: "image",
      header: "Profile Picture",
      cell: (info) => {
        return (
          <div className="table_image">
            {info.row.original.image === null ? (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s"
                alt=""
              />
            ) : (
              <img
                src={
                  ROOT_IMAGE_URL + "/employeeImages/" + info.row.original.image
                }
                alt=""
              />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "",
      header: "Actions",
      cell: (info) => {
        return (
          <div className="table_actions">
            <button className="table_iconBtn">
              <GoInfo />
            </button>

            <button className="table_iconBtn">
              <CiEdit
                onClick={() =>
                  handleEditEmployeeModalOpen(info.row.original._id)
                }
              />
            </button>

            <button
              className="table_iconBtn"
              onClick={() => openDeleteEmployeeModal(info.row.original._id)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <AppLayout>
      <div className="employeeTablePage">
        <div className="pageHeader">
          <span>Employee Table</span>

          <button
            onClick={handleCreateEmployeeModalOpen}
            className="primaryBtn"
          >
            Add New
          </button>
        </div>

        {isEmployeesLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="employee_tableContainer">
            <div className="table_filterContainer">
              <div className="table_select">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  {[
                    ...new Set(
                      employees?.data.map((employee) => employee.status)
                    ),
                  ].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="table_select">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  {[
                    ...new Set(
                      employees?.data.map((employee) => employee.department)
                    ),
                  ].map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="table_search">
                <input
                  type="text"
                  placeholder="Search Employee...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <DataTable data={filteredEmployees} columns={columns} />
          </div>
        )}

        <CreateEmployeeModal
          isOpen={isCreateEmployeeModalOpen}
          onClose={handleCreateEmployeeModalClose}
        />

        <UpdateEmployeeModal
          isOpen={isEditEmployeeModalOpen}
          onClose={handleEditEmployeeModalClose}
          onConfirm={() => handleEditEmployeeModalClose()}
          id={selectedEmployeeId}
        />

        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={() => handleDeleteEmployee(selectedEmployeeId)}
        />
      </div>
    </AppLayout>
  );
};

export default EmployeeTablePage;
