import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

// toast setup
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages import
const EmployeeListPage = lazy(() =>
  import("./pages/employeeListPage/EmployeeListPage")
);
const EmployeeTablePage = lazy(() =>
  import("./pages/employeeTablePage/EmployeeTablePage")
);

import ErrorPage from "./pages/errorPage/ErrorPage";

// components
import AppLayout from "./components/appLayout/AppLayout";
import LoadingEmployeeListPage from "./components-ui/loadingPages/loadingEmployeeListPage/LoadingEmployeeListPage";
import LoadingEmployeeTablePage from "./components-ui/loadingPages/loadingEmployeeTablePage/LoadingEmployeeTablePage";

function App() {
  return (
    <div>
      <ErrorBoundary>
        <AppLayout>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<LoadingEmployeeListPage />}>
                  <EmployeeListPage />
                </Suspense>
              }
            />
            <Route
              path="/employee-table"
              element={
                <Suspense fallback={<LoadingEmployeeTablePage />}>
                  <EmployeeTablePage />
                </Suspense>
              }
            />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AppLayout>
      </ErrorBoundary>

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
