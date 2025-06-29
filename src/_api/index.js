import axios from "axios";

const API = axios.create({
   baseURL: "http://127.0.0.1:8000/api", //change to your backend domain
});

API.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem("token");
      if (token) {
         config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
   },
   (error) => Promise.reject(error)
);

API.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         localStorage.removeItem("token");
         localStorage.removeItem("user");
         window.location.href = "/login";
      }
      return Promise.reject(error);
   }
);

export default API;
