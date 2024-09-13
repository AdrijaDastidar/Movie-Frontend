// Configures Axios to use a base URL and custom serialization for query parameters.
import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:5173/api/v1/";

// Create axios instance
const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});

// Add request interceptor to set common headers
privateClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("actkn")}`
    }
  };
});

// Add response interceptor to handle error responses
privateClient.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
}, (err) => {
  throw err.response.data;
});

export default privateClient;