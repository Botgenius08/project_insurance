import React from 'react';
import { FileText, Shield, DollarSign, Users, Clock, CheckCircle } from 'lucide-react';
import { StatsCard } from '../ui';
import { useAuth } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';
import { StatsCardData } from '../../types';

export const StatsGrid: React.FC = () => {
  const { user } = useAuth();
  const { quotations, policies, claims, tasks } = useAppState();
  
  if (!user) return null;

  const isIntermediary = user.type === 'intermediary';

  const intermediaryStats: StatsCardData[] = [
    {
      title: 'Active Quotations',
      value: quotations.length,
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Active Policies',
      value: policies.length,
      icon: Shield,
      color: 'text-green-600'
    },
    {
      title: 'Open Claims',
      value: claims.length,
      icon: DollarSign,
      color: 'text-orange-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$24,500',
      icon: DollarSign,
      color: 'text-purple-600'
    }
  ];

  const employeeStats: StatsCardData[] = [
    {
      title: 'Pending Tasks',
      value: tasks.filter(t => t.status !== 'completed').length,
      icon: Clock,
      color: 'text-red-600'
    },
    {
      title: 'Approvals Needed',
      value: 5,
      icon: CheckCircle,
      color: 'text-yellow-600'
    },
    {
      title: 'Completed Today',
      value: 8,
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Team Members',
      value: 12,
      icon: Users,
      color: 'text-blue-600'
    }
  ];

  const stats = isIntermediary ? intermediaryStats : employeeStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} data={stat} />
      ))}
    </div>
  );
};