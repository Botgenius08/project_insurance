import React from 'react';
import { Bell } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const RecentActivity: React.FC = () => {
  const { notifications } = useAppState();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.slice(0, 5).map(notification => (
            <div key={notification.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Bell className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-800">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};