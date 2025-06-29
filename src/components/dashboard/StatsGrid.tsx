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

  // Filter data for intermediary to show only their own data
  const getIntermediaryStats = () => {
    // For demo purposes, we'll simulate filtering by intermediary
    // In a real app, this would filter by user.id or similar identifier
    const userQuotations = quotations; // In real app: quotations.filter(q => q.createdBy === user.id)
    const userPolicies = policies.filter(p => p.status === 'active'); // Only active policies
    const userClaims = claims.filter(c => c.status !== 'approved' && c.status !== 'rejected'); // Open claims
    
    // Calculate total premium for active policies
    const totalPremium = userPolicies.reduce((sum, policy) => sum + policy.premium, 0);

    return {
      quotations: userQuotations.length,
      activePolicies: userPolicies.length,
      openClaims: userClaims.length,
      totalPremium: totalPremium
    };
  };

  const intermediaryStats: StatsCardData[] = (() => {
    const stats = getIntermediaryStats();
    
    return [
      {
        title: 'Active Quotations',
        value: stats.quotations,
        icon: FileText,
        color: 'text-blue-600'
      },
      {
        title: 'Active Policies',
        value: stats.activePolicies,
        icon: Shield,
        color: 'text-green-600'
      },
      {
        title: 'Open Claims',
        value: stats.openClaims,
        icon: DollarSign,
        color: 'text-orange-600'
      },
      {
        title: 'Total Premium',
        value: `${stats.totalPremium.toLocaleString()} TZS`,
        icon: DollarSign,
        color: 'text-purple-600'
      }
    ];
  })();

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