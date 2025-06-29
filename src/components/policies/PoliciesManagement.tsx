import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, Download, RefreshCw, AlertTriangle, Clock } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const PoliciesManagement: React.FC = () => {
  const { policies } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'active' | 'renewing' | 'lapsed' | 'pending'>('active');

  // Filter policies by status and search term
  const filteredPolicies = useMemo(() => {
    let filtered = policies.filter(policy => policy.status === activeTab);
    
    if (searchTerm) {
      filtered = filtered.filter(policy => 
        policy.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [policies, activeTab, searchTerm]);

  // Get counts for each status
  const statusCounts = useMemo(() => {
    return {
      active: policies.filter(p => p.status === 'active').length,
      renewing: policies.filter(p => p.status === 'renewing').length,
      lapsed: policies.filter(p => p.status === 'lapsed').length,
      pending: policies.filter(p => p.status === 'pending').length,
    };
  }, [policies]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'renewing':
        return 'bg-yellow-100 text-yellow-700';
      case 'lapsed':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'active':
        return <Eye className="w-4 h-4" />;
      case 'renewing':
        return <RefreshCw className="w-4 h-4" />;
      case 'lapsed':
        return <AlertTriangle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Policies Management</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          Create New Policy
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by client name or policy number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {(['active', 'renewing', 'lapsed', 'pending'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {getTabIcon(tab)}
                <span className="capitalize">{tab} Policies</span>
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  activeTab === tab ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {statusCounts[tab]}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Policies Table */}
        <div className="p-6">
          {filteredPolicies.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                {getTabIcon(activeTab)}
              </div>
              <p className="text-gray-500">
                {searchTerm 
                  ? `No ${activeTab} policies found matching "${searchTerm}"`
                  : `No ${activeTab} policies found`
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy #</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Premium (TZS)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sum Insured (TZS)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPolicies.map(policy => (
                    <tr key={policy.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{policy.policyNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{policy.clientName}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{policy.product}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{policy.premium.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {policy.sumInsured ? policy.sumInsured.toLocaleString() : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{policy.expiryDate}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(policy.status)}`}>
                          {policy.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-800 flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            Certificate
                          </button>
                          {policy.status === 'renewing' && (
                            <button className="text-purple-600 hover:text-purple-800 flex items-center">
                              <RefreshCw className="w-4 h-4 mr-1" />
                              Renew
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Policies</p>
              <p className="text-2xl font-bold text-green-600">{statusCounts.active}</p>
            </div>
            <Eye className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Renewing Policies</p>
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.renewing}</p>
            </div>
            <RefreshCw className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lapsed Policies</p>
              <p className="text-2xl font-bold text-red-600">{statusCounts.lapsed}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Policies</p>
              <p className="text-2xl font-bold text-blue-600">{statusCounts.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};