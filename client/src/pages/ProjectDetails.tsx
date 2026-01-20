import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Filter, Plus, Edit2, Trash2 } from "lucide-react";
import api from "../api/axios";
import NewTaskForm from "../components/NewTaskForm";

type TaskStatus = "Done" | "In Progress" | "To Do";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

interface Project {
  _id: string;
  name: string;
  description: string;
  tasks: Task[];
}

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All Tasks");
  const [showTaskForm, setShowTaskForm] = useState(false);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading project...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!project) return null;

  // Safety check for tasks - prevents crash if tasks is undefined
  const tasks = project.tasks || [];
  const filteredTasks =
    filterStatus === "All Tasks" ? tasks : tasks.filter((t) => t.status === filterStatus);

  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-orange-100 text-orange-700";
      case "To Do":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusCount = (status: string) => {
    if (status === "All") return tasks.length;
    return tasks.filter((t) => t.status === status).length;
  };

  const handleCreateTask = async (taskData: { title: string; description: string; status: TaskStatus }) => {
    try {
      const res = await api.post(`/projects/${id}/tasks`, taskData);
      setProject(res.data);
      setShowTaskForm(false);
    } catch (err: any) {
      console.error("Failed to create task:", err);
      alert(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          <span className="text-sm sm:text-base">Back to Dashboard</span>
        </button>

        {/* Project Header */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
              <span className="text-blue-600 text-xl">📁</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
              <p className="text-sm sm:text-base text-gray-600">{project.description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Total Tasks</div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{getStatusCount("All")}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-green-700 mb-1 sm:mb-2">Completed</div>
              <div className="text-2xl sm:text-3xl font-bold text-green-700">{getStatusCount("Done")}</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-orange-700 mb-1 sm:mb-2">In Progress</div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-700">{getStatusCount("In Progress")}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">To Do</div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{getStatusCount("To Do")}</div>
            </div>
          </div>
        </div>

        {/* Filter & Add Task */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div className="flex items-center">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
            >
              <option>All Tasks</option>
              <option>Done</option>
              <option>In Progress</option>
              <option>To Do</option>
            </select>
          </div>
          <button 
            onClick={() => setShowTaskForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 rounded-lg flex items-center justify-center transition-colors shadow-sm text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Add Task
          </button>
        </div>

        {/* Tasks List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <p className="text-gray-500">No tasks found. Click "Add Task" to create one.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task._id} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <div className="flex-1 w-full sm:w-auto mb-3 sm:mb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center mb-2 sm:mb-3">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-0 sm:mr-3">{task.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(task.status)} inline-block w-fit`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">{task.description}</p>
                  </div>
                  <div className="flex items-center sm:ml-4 space-x-2 self-end sm:self-start">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* New Task Form Modal */}
        {showTaskForm && (
          <NewTaskForm 
            onClose={() => setShowTaskForm(false)}
            onSubmit={handleCreateTask}
          />
        )}
      </div>
    </div>
  );
}