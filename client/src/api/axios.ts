// import axios from "axios";

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// // intercept requests to automatically attach token
// api.interceptors.request.use((config) => {
//     // Get user from localStorage
//     const user = localStorage.getItem("user");
//     if (user) {
//         // Extract JWT token
//       const token = JSON.parse(user).token;
//        // Ensure headers object exists
//       if (config.headers)
//         // Attach token
//          config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     // Return the modified config to Axios
//     return config;
//   });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Add this for CORS credentials
});

// Intercept requests to automatically attach token
api.interceptors.request.use((config) => {
  // Get user from localStorage
  const user = localStorage.getItem("user");
  if (user) {
    try {
      // Extract JWT token
      const token = JSON.parse(user).token;
      // Only add Authorization header if token exists
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      localStorage.removeItem("user"); // Clean up invalid data
    }
  }
  
  return config;
});

export default api;