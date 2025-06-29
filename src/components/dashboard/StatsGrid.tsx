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

  const isIntermediary = user.user_type === 'intermediary';

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
      title: 'Total Premium',
      value: `${policies.reduce((sum, policy) => sum + policy.premium, 0).toLocaleString()} TZS`,
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
      title: 'Total Quotations',
      value: quotations.length,
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Active Policies',
      value: policies.filter(p => p.status === 'active').length,
      icon: Shield,
      color: 'text-green-600'
    },
    {
      title: 'Claims Processing',
      value: claims.filter(c => c.status === 'processing').length,
      icon: CheckCircle,
      color: 'text-yellow-600'
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