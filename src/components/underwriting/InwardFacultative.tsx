import React, { useState } from 'react';
import { Plus, Save } from 'lucide-react';

export const InwardFacultative: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    insuredName: '',
    leaderInsurer: '',
    totalSumInsured: '',
    facultativeShare: '',
    classOfBusiness: '',
    inceptionDate: '',
    expiryDate: '',
    premium: '',
    commission: ''
  });

  const [facultativePolicies] = useState([
    {
      id: 1,
      policyNumber: 'FAC-2025-001',
      insuredName: 'Oil & Gas Corporation',
      leaderInsurer: 'International Re',
      totalSumInsured: 2000000000,
      facultativeShare: 25,
      classOfBusiness: 'Energy',
      status: 'active',
      inceptionDate: '2025-01-01'
    }
  ]);

  const generatePolicyNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `FAC-${year}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const policyNumber = generatePolicyNumber();
    alert(`Facultative policy created with number: ${policyNumber}`);
    setShowForm(false);
    setFormData({
      insuredName: '',
      leaderInsurer: '',
      totalSumInsured: '',
      facultativeShare: '',
      classOfBusiness: '',
      inceptionDate: '',
      expiryDate: '',
      premium: '',
      commission: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Inward Facultative Management</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Facultative Policy
        </button>
      </div>

      {/* New Policy Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Create New Facultative Policy</h4>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insured Name</label>
                <input
                  type="text"
                  value={formData.insuredName}
                  onChange={(e) => setFormData({...formData, insuredName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leader Insurer</label>
                <input
                  type="text"
                  value={formData.leaderInsurer}
                  onChange={(e) => setFormData({...formData, leaderInsurer: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Sum Insured (TZS)</label>
                <input
                  type="number"
                  value={formData.totalSumInsured}
                  onChange={(e) => setFormData({...formData, totalSumInsured: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facultative Participation Share (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.facultativeShare}
                  onChange={(e) => setFormData({...formData, facultativeShare: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class of Business</label>
                <select
                  value={formData.classOfBusiness}
                  onChange={(e) => setFormData({...formData, classOfBusiness: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Class</option>
                  <option value="Property">Property</option>
                  <option value="Motor">Motor</option>
                  <option value="Marine">Marine</option>
                  <option value="Aviation">Aviation</option>
                  <option value="Energy">Energy</option>
                  <option value="Liability">Liability</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Premium (TZS)</label>
                <input
                  type="number"
                  value={formData.premium}
                  onChange={(e) => setFormData({...formData, premium: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inception Date</label>
                <input
                  type="date"
                  value={formData.inceptionDate}
                  onChange={(e) => setFormData({...formData, inceptionDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Create Policy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Existing Facultative Policies */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-medium text-gray-800 mb-4">Existing Facultative Policies</h4>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy #</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Insured</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leader Insurer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Sum Insured (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Our Share (%)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {facultativePolicies.map(policy => (
                <tr key={policy.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{policy.policyNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.insuredName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.leaderInsurer}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.totalSumInsured.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.facultativeShare}%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.classOfBusiness}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition duration-200">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};