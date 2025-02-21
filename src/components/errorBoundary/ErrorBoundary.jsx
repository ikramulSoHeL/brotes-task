import React, { Component } from "react";
import "./errorBoundary.scss";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error_boundary">
          <h1>Something went wrong!!!</h1>

          <Link to="/">Go to Home</Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
