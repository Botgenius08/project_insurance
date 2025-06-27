import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatsGrid } from './StatsGrid';
import { RecentActivity } from './RecentActivity';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const isIntermediary = user.type === 'intermediary';

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {isIntermediary ? 'Intermediary Dashboard' : 'Employee Dashboard'}
      </h2>
      
      <StatsGrid />
      <RecentActivity />
    </div>
  );
};