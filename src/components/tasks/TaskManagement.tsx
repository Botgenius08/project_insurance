import React from 'react';
import { useAppState } from '../../context/AppStateContext';

export const TaskManagement: React.FC = () => {
  const { tasks, updateTask } = useAppState();

  const handleTaskAction = (taskId: number, action: string) => {
    const updates = action === 'approve' ? { status: 'approved' } : 
                   action === 'complete' ? { status: 'completed' } : {};
    updateTask(taskId, updates);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Task Management</h3>
      
      {/* Task Filters */}
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition duration-200">
          All Tasks
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200">
          Underwriting
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200">
          Finance
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200">
          Quotations
        </button>
      </div>
      
      {/* Task List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-800">Assigned Tasks</h4>
        </div>
        <div className="divide-y divide-gray-200">
          {tasks.map(task => (
            <div key={task.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800">{task.title}</h5>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {task.priority} priority
                    </span>
                    <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
                    <span className="text-sm text-gray-500 capitalize">Type: {task.type}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {task.type === 'finance' && (
                    <button
                      onClick={() => handleTaskAction(task.id, 'approve')}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition duration-200"
                    >
                      Approve Payment
                    </button>
                  )}
                  <button
                    onClick={() => handleTaskAction(task.id, 'complete')}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition duration-200"
                  >
                    Complete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};