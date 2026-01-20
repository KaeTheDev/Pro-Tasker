import api from "./axios";

export const getProjects = async () => {
  const response = await api.get("/projects");

  try {
    return response.data.map((project: any) => {
      
      // Ensure tasks is an array
      const tasks = Array.isArray(project.tasks) ? project.tasks : [];

      // Count statuses
      const done = tasks.filter((t: any) => t.status === "done").length;
      const inProgress = tasks.filter((t: any) => t.status === "in-progress").length;
      const blocked = tasks.filter((t: any) => t.status === "blocked").length;

      const progressPercent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

      return {
        _id: project._id,
        name: project.name,
        description: project.description,
        tasksLabel: `${tasks.length} task${tasks.length !== 1 ? "s" : ""}`,
        done,
        inProgress,
        blocked,
        progressPercent,
      };
    });
  } catch (err) {
    console.error("MAPPING ERROR:", err);
    throw err;
  }
};