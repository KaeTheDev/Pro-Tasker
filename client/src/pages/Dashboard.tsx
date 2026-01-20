import React from "react";

const mockProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete redesign of company website with modern UI/UX",
    tasksLabel: "3 tasks",
    done: 1,
    inProgress: 1,
    blocked: 1,
    progressPercent: 30,
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Build native iOS and Android applications",
    tasksLabel: "2 tasks",
    done: 1,
    inProgress: 1,
    blocked: 0,
    progressPercent: 50,
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Q1 marketing campaign planning and execution",
    tasksLabel: "1 task",
    done: 0,
    inProgress: 0,
    blocked: 1,
    progressPercent: 10,
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      {/* Header */}
      <div className="flex flex-col items-start mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">My Projects</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track all your projects in one place
        </p>

        <button className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
          <span className="text-lg">＋</span>
          <span>New Project</span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <div
            key={project.id}
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
              <h2 className="text-base font-semibold text-gray-900">
                {project.name}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {project.description}
              </p>
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
