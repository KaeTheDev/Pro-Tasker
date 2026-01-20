import api from "./axios";

export const getProjects = async () => {
  const response = await api.get("/projects");
  const projects = response.data;

  // Map tasks to stats for Dashboard UI
  return projects.map((project: any) => {
    const done = project.tasks.filter((t: any) => t.status === "done").length;
    const inProgress = project.tasks.filter(
      (t: any) => t.status === "in-progress"
    ).length;
    const blocked = project.tasks.filter(
      (t: any) => t.status === "blocked"
    ).length;
    const progressPercent = project.tasks.length
      ? Math.round((done / project.tasks.length) * 100)
      : 0;

    return {
      _id: project._id,
      name: project.name,
      description: project.description,
      tasksLabel: `${project.tasks.length} task${
        project.tasks.length !== 1 ? "s" : ""
      }`,
      done,
      inProgress,
      blocked,
      progressPercent,
    };
  });
};
