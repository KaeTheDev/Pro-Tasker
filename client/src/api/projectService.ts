import api from "./axios";

export const getProjects = async () => {
  try {
    const response = await api.get("/projects");
    return response.data;  // Just return the data - backend is calculating everything
  } catch (err) {
    console.error("Error fetching projects:", err);
    throw err;
  }
};