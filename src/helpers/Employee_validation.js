// validation.js
import { toast } from "react-toastify";

const validateEmployeeForm = (formData) => {
  // Name validation
  if (!formData.name.trim()) {
    toast.error("Name is required");
    return false;
  } else if (formData.name.length < 3) {
    toast.error("Name must be at least 3 characters");
    return false;
  }

  // Phone validation
  const phoneRegex = /^\d{11}$/;
  if (!formData.phone.trim()) {
    toast.error("Phone number is required");
    return false;
  } else if (!phoneRegex.test(formData.phone)) {
    toast.error("Phone number must be 11 digits");
    return false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.error("Invalid email address");
    return false;
  }

  // department validation
  if (!formData.department.trim()) {
    toast.error("Department is required");
    return false;
  }

  // address validation
  if (!formData.address.trim()) {
    toast.error("Address is required");
    return false;
  } else if (formData.address.length < 3) {
    toast.error("Address must be at least 3 characters");
    return false;
  }

  // status validation
  if (!formData.status.trim()) {
    toast.error("Status is required");
    return false;
  }

  return true;
};

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default validateEmployeeForm;
