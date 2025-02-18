import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";

import { ROOT_URL } from "../utils/config";

// context
import { useContext } from "react";

// Create a single Axios instance
const axiosInstance = Axios.create({
  baseURL: ROOT_URL, // Replace with your API base URL
});

// Fetch Data
const FetchData = ({
  url,
  searchQuery,
  key,
  optionalKey,
  dependency,
  dependencyValue,
}) => {
  return useQuery({
    queryKey: [key, optionalKey || ""],
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, { params: searchQuery });
      return data;
    },
    enabled: dependency ? !!dependencyValue : true,
  });
};

// Post Data
// const PostData = ({
//   url,
//   key,
//   optionalKey,
//   auth = false,
//   navigateOnSuccess,
//   navigateOnError,
//   resetForm,
//   dynamicURL = false,
//   loginContext = false,
//   onSuccess,
//   onError,
// }) => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const { login } = useContext(AuthContext);

//   return useMutation({
//     mutationFn: async ({ id, formData }) => {
//       const apiUrl = dynamicURL ? `${url}/${id}` : url;
//       const instance = auth ? AxiosAuthInstance : AxiosWithOutAuthInstance;

//       const response = await instance.post(apiUrl, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       return response.data;
//     },
//     onSuccess: (data) => {
//       queryClient.invalidateQueries([key, optionalKey || ""]);
//       toast.success(data?.message || "Operation successful");
//       if (onSuccess) onSuccess();
//       if (resetForm) resetForm();
//       if (navigateOnSuccess) navigate(navigateOnSuccess);
//       if (loginContext) login(data);
//     },
//     onError: (error) => {
//       const errorMsg =
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         "Something went wrong, please try again later";
//       toast.error(errorMsg);
//       if (onError) onError();
//       if (navigateOnError) navigate(navigateOnError);
//     },
//   });
// };

// Put Data
// const PutData = ({
//   url,
//   key,
//   optionalKey,
//   auth = true,
//   navigateOnSuccess,
//   navigateOnError,
//   resetForm,
//   dynamicURL = false,
//   onSuccess,
//   onError,
// }) => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ id, formData }) => {
//       const apiUrl = dynamicURL ? `${url}/${id}` : url;
//       const instance = auth ? AxiosAuthInstance : AxiosWithOutAuthInstance;

//       const response = await instance.put(apiUrl, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       return response.data;
//     },
//     onSuccess: (data) => {
//       queryClient.invalidateQueries([key, optionalKey || ""]);
//       toast.success(data?.message || "Operation successful");
//       if (onSuccess) onSuccess();
//       if (resetForm) resetForm();
//       if (navigateOnSuccess) navigate(navigateOnSuccess);
//     },
//     onError: (error) => {
//       const errorMsg =
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         "Something ";
//       toast.error(errorMsg);
//       if (onError) onError();
//       if (navigateOnError) navigate(navigateOnError);
//     },
//   });
// };

// Delete Data
// const DeleteData = ({
//   url,
//   key,
//   optionalKey,
//   successType,
//   errorType,
//   navigateOnSuccess,
//   navigateOnError,
// }) => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ id }) => {
//       const response = await AxiosAuthInstance.delete(`${url}/${id}`);
//       return response.data;
//     },
//     onSuccess: (data) => {
//       toast.success(data?.message || "Deleted successfully");
//       queryClient.invalidateQueries([key, optionalKey || ""]);
//       if (navigateOnSuccess) navigate(navigateOnSuccess);
//     },
//     onError: (error) => {
//       const errorMsg =
//         error?.response?.data?.error ||
//         error?.response?.data?.message ||
//         "Something went wrong, please try again later.";
//       toast.error(errorMsg);
//       if (navigateOnError) navigate(navigateOnError);
//     },
//   });
// };

export { FetchData };
// export { FetchData, PostData, PutData, DeleteData };
