import axios from "axios";
import Cookies from "js-cookie";

const axiosPrivate = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

// Attach token from cookies if available
axiosPrivate.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        if (token && config.headers) {
            // Only set if not already explicitly provided
            if (!config.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosPrivate;