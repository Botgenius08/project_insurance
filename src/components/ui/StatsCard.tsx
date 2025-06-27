import React from 'react';
import { StatsCardData } from '../../types';

interface StatsCardProps {
  data: StatsCardData;
}

export const StatsCard: React.FC<StatsCardProps> = ({ data }) => {
  const { title, value, icon: Icon, color } = data;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${color.replace('text-', 'text-').replace('-600', '-500')}`} />
      </div>
    </div>
  );
};