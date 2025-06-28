import React, { useState } from 'react';
import { Plus, Settings, Users } from 'lucide-react';

export const TreatyManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [treatyType, setTreatyType] = useState('quota_share');
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'quota_share',
    classOfBusiness: [],
    grossRetention: '',
    capacity: '',
    effectiveDate: '',
    expiryDate: '',
    reinsurers: [{ reinsurerCode: '', share: '' }],
    brokerCode: ''
  });

  const [reinsurers] = useState([
    { code: 'MUN001', name: 'Munich Re', country: 'Germany', rating: 'AA-' },
    { code: 'SWI001', name: 'Swiss Re', country: 'Switzerland', rating: 'AA-' },
    { code: 'HAL001', name: 'Hannover Re', country: 'Germany', rating: 'AA-' }
  ]);

  const [brokers] = useState([
    { code: 'AON001', name: 'Aon Benfield', country: 'UK' },
    { code: 'WIL001', name: 'Willis Re', country: 'UK' },
    { code: 'GUY001', name: 'Guy Carpenter', country: 'USA' }
  ]);

  const classOptions = ['Property', 'Motor', 'Marine', 'Aviation', 'Energy', 'Liability', 'Engineering'];

  const addReinsurer = () => {
    setFormData({
      ...formData,
      reinsurers: [...formData.reinsurers, { reinsurerCode: '', share: '' }]
    });
  };

  const removeReinsurer = (index: number) => {
    const newReinsurers = formData.reinsurers.filter((_, i) => i !== index);
    setFormData({ ...formData, reinsurers: newReinsurers });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Treaty configuration saved successfully!');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Treaty Management</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Treaty
        </button>
      </div>

      {/* Treaty Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Configure New Treaty</h4>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Treaty Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Treaty Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="quota_share">Quota Share</option>
                  <option value="surplus">Surplus</option>
                  <option value="facultative_obligatory">Facultative Obligatory</option>
                </select>
              </div>
            </div>

            {/* Class of Business */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class of Business</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {classOptions.map(cls => (
                  <label key={cls} className="flex items-center">
                    <input
                      type="checkbox"
                      value={cls}
                      onChange={(e) => {
                        const newClasses = e.target.checked
                          ? [...formData.classOfBusiness, cls]
                          : formData.classOfBusiness.filter(c => c !== cls);
                        setFormData({...formData, classOfBusiness: newClasses});
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{cls}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Financial Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gross Retention (TZS)</label>
                <input
                  type="number"
                  value={formData.grossRetention}
                  onChange={(e) => setFormData({...formData, grossRetention: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (TZS)</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Reinsurers */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">Reinsurers</label>
                <button
                  type="button"
                  onClick={addReinsurer}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Reinsurer
                </button>
              </div>
              
              {formData.reinsurers.map((reinsurer, index) => (
                <div key={index} className="flex gap-4 mb-2">
                  <select
                    value={reinsurer.reinsurerCode}
                    onChange={(e) => {
                      const newReinsurers = [...formData.reinsurers];
                      newReinsurers[index].reinsurerCode = e.target.value;
                      setFormData({...formData, reinsurers: newReinsurers});
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Reinsurer</option>
                    {reinsurers.map(r => (
                      <option key={r.code} value={r.code}>{r.name} ({r.code})</option>
                    ))}
                  </select>
                  
                  <input
                    type="number"
                    placeholder="Share %"
                    value={reinsurer.share}
                    onChange={(e) => {
                      const newReinsurers = [...formData.reinsurers];
                      newReinsurers[index].share = e.target.value;
                      setFormData({...formData, reinsurers: newReinsurers});
                    }}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  
                  {formData.reinsurers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeReinsurer(index)}
                      className="px-2 py-2 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Broker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Broker (Optional)</label>
              <select
                value={formData.brokerCode}
                onChange={(e) => setFormData({...formData, brokerCode: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Broker</option>
                {brokers.map(b => (
                  <option key={b.code} value={b.code}>{b.name} ({b.code})</option>
                ))}
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
                <input
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
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

            {/* Submit Buttons */}
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
                <Settings className="w-4 h-4 mr-2" />
                Save Treaty
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Existing Treaties */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-medium text-gray-800 mb-4">Active Treaties</h4>
        
        <div className="space-y-4">
          {[
            {
              name: 'Property Quota Share 2025',
              type: 'Quota Share',
              classes: ['Property', 'Engineering'],
              retention: '50,000,000',
              capacity: '500,000,000',
              reinsurers: 3,
              status: 'Active'
            },
            {
              name: 'Motor Surplus 2025',
              type: 'Surplus',
              classes: ['Motor'],
              retention: '25,000,000',
              capacity: '200,000,000',
              reinsurers: 2,
              status: 'Active'
            }
          ].map((treaty, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800">{treaty.name}</h5>
                  <p className="text-sm text-gray-600">Type: {treaty.type}</p>
                  <p className="text-sm text-gray-600">Classes: {treaty.classes.join(', ')}</p>
                  <p className="text-sm text-gray-600">Retention: {treaty.retention} TZS | Capacity: {treaty.capacity} TZS</p>
                  <p className="text-sm text-gray-600">Reinsurers: {treaty.reinsurers}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    {treaty.status}
                  </span>
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition duration-200">
                    Edit
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