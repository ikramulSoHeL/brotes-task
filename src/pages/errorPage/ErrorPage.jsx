import React from "react";
import "./errorPage.scss";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="errorPage">
      <h2>404 Error!!!</h2>
      <span>The page you are looking for does not exist.</span>

      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default ErrorPage;
