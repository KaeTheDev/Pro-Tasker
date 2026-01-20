import { useState } from 'react';
import { ArrowLeft, Filter, Plus, Edit2, Trash2 } from 'lucide-react';

type TaskStatus = 'Done' | 'In Progress' | 'To Do';

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export default function ProjectDetailsPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Design homepage mockup',
      description: 'Create high-fidelity mockup for homepage',
      status: 'Done'
    },
    {
      id: 2,
      title: 'Implement navigation',
      description: 'Build responsive navigation component',
      status: 'In Progress'
    },
    {
      id: 3,
      title: 'Set up authentication',
      description: 'Implement user login and registration',
      status: 'To Do'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('All Tasks');

  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-orange-100 text-orange-700';
      case 'To Do':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusCount = (status: string): number => {
    if (status === 'All') return tasks.length;
    return tasks.filter(task => task.status === status).length;
  };

  const filteredTasks = filterStatus === 'All Tasks' 
    ? tasks 
    : tasks.filter(task => task.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button className="flex items-center text-gray-600 hover:text-gray-900 mb-6 sm:mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          <span className="text-sm sm:text-base">Back to Dashboard</span>
        </button>

        {/* Project header card */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Website Redesign</h1>
              <p className="text-sm sm:text-base text-gray-600">Complete redesign of company website with modern UI/UX</p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Total Tasks</div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{getStatusCount('All')}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-green-700 mb-1 sm:mb-2">Completed</div>
              <div className="text-2xl sm:text-3xl font-bold text-green-700">{getStatusCount('Done')}</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-orange-700 mb-1 sm:mb-2">In Progress</div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-700">{getStatusCount('In Progress')}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">To Do</div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{getStatusCount('To Do')}</div>
            </div>
          </div>
        </div>

        {/* Filters and Add Task button */}
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
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 rounded-lg flex items-center justify-center transition-colors shadow-sm text-sm sm:text-base">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Add Task
          </button>
        </div>

        {/* Tasks list */}
        <div className="space-y-3 sm:space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
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
          ))}
        </div>
      </div>
    </div>
  );
}