import { useState } from "react";
import { Route, Routes } from "react-router-dom";

// toast setup
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages import
import EmployeeListPage from "./pages/employeeListPage/EmployeeListPage";
import EmployeeTablePage from "./pages/employeeTablePage/EmployeeTablePage";
import ErrorPage from "./pages/errorPage/ErrorPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EmployeeListPage />} />
        <Route path="/employee-table" element={<EmployeeTablePage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide} // Set the default transition type (Slide)
        limit={2} // Limit to 3 toast notifications at a time
        transitionDuration={800} // Set the transition duration in milliseconds (default is 300ms)
        style={{ zIndex: 10000000 }}
      />
    </div>
  );
}

export default App;
