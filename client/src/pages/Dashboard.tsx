import React, { useEffect, useState } from "react";
import { getProjects } from "../api/projectService";
import NewProjectForm from "../components/NewProjectForm";

interface Project {
  _id: string;
  name: string;
  description: string;
  tasksLabel: string;
  done: number;
  inProgress: number;
  blocked: number;
  progressPercent: number;
}

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);

  // ✅ Extract fetchProjects so we can call it again after creating a project
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading projects...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      {/* Header */}
      <div className="flex flex-col items-start mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">My Projects</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track all your projects in one place
        </p>

        <button
          onClick={() => setShowNewProjectForm(true)}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          <span className="text-lg">＋</span>
          <span>New Project</span>
        </button>
      </div>

      {/* New Project Form Modal */}
      {showNewProjectForm && (
        <NewProjectForm
          onClose={() => setShowNewProjectForm(false)}
          onProjectCreated={fetchProjects} // ✅ Refresh dashboard after creating
        />
      )}

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col"
          >
            {/* Top row: icon + tasks pill */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <span className="text-blue-600 text-xl">📁</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                {project.tasksLabel}
              </span>
            </div>

            {/* Title + description */}
            <div className="mb-4">
              <h2 className="text-base font-semibold text-gray-900">{project.name}</h2>
              <p className="mt-1 text-sm text-gray-500">{project.description}</p>
            </div>

            {/* Status counts */}
            <div className="flex items-center gap-4 text-xs mb-4">
              <div className="flex items-center gap-1 text-green-500">
                <span className="text-base">✓</span>
                <span>{project.done}</span>
              </div>
              <div className="flex items-center gap-1 text-orange-500">
                <span className="text-base">●</span>
                <span>{project.inProgress}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <span className="text-base">○</span>
                <span>{project.blocked}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-auto">
              <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${project.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;