import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// intercept requests to automatically attach token
api.interceptors.request.use((config) => {
    // Get user from localStorage
    const user = localStorage.getItem("user");
    if (user) {
        // Extract JWT token
      const token = JSON.parse(user).token;
       // Ensure headers object exists
      if (config.headers)
        // Attach token
         config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Return the modified config to Axios
    return config;
  });

export default api;