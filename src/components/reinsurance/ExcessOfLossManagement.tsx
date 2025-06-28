import React, { useState } from 'react';
import { Plus, Layers } from 'lucide-react';

export const ExcessOfLossManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    netRetention: '',
    annualAggregateLimit: '',
    classOfBusiness: [],
    layers: [{ from: '', to: '', rate: '', reinstatements: '' }]
  });

  const classOptions = ['Property', 'Motor', 'Marine', 'Aviation', 'Energy', 'Liability', 'Engineering'];

  const addLayer = () => {
    setFormData({
      ...formData,
      layers: [...formData.layers, { from: '', to: '', rate: '', reinstatements: '' }]
    });
  };

  const removeLayer = (index: number) => {
    const newLayers = formData.layers.filter((_, i) => i !== index);
    setFormData({ ...formData, layers: newLayers });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Excess of Loss configuration saved successfully!');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Excess of Loss Management</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New XOL Program
        </button>
      </div>

      {/* XOL Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Configure Excess of Loss Program</h4>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Net Retention (TZS)</label>
                <input
                  type="number"
                  value={formData.netRetention}
                  onChange={(e) => setFormData({...formData, netRetention: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Aggregate Limit (TZS)</label>
              <input
                type="number"
                value={formData.annualAggregateLimit}
                onChange={(e) => setFormData({...formData, annualAggregateLimit: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
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

            {/* Layers */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">Layers Configuration</label>
                <button
                  type="button"
                  onClick={addLayer}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Layer
                </button>
              </div>
              
              {formData.layers.map((layer, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">From (TZS)</label>
                    <input
                      type="number"
                      placeholder="From amount"
                      value={layer.from}
                      onChange={(e) => {
                        const newLayers = [...formData.layers];
                        newLayers[index].from = e.target.value;
                        setFormData({...formData, layers: newLayers});
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">To (TZS)</label>
                    <input
                      type="number"
                      placeholder="To amount"
                      value={layer.to}
                      onChange={(e) => {
                        const newLayers = [...formData.layers];
                        newLayers[index].to = e.target.value;
                        setFormData({...formData, layers: newLayers});
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Rate (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Rate"
                      value={layer.rate}
                      onChange={(e) => {
                        const newLayers = [...formData.layers];
                        newLayers[index].rate = e.target.value;
                        setFormData({...formData, layers: newLayers});
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Reinstatements</label>
                    <input
                      type="number"
                      placeholder="Number"
                      value={layer.reinstatements}
                      onChange={(e) => {
                        const newLayers = [...formData.layers];
                        newLayers[index].reinstatements = e.target.value;
                        setFormData({...formData, layers: newLayers});
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-end">
                    {formData.layers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLayer(index)}
                        className="w-full px-2 py-2 text-red-600 hover:text-red-800 border border-red-300 rounded-lg"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
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
                <Layers className="w-4 h-4 mr-2" />
                Save XOL Program
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Existing XOL Programs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-medium text-gray-800 mb-4">Active XOL Programs</h4>
        
        <div className="space-y-4">
          {[
            {
              name: 'Property XOL 2025',
              netRetention: '100,000,000',
              layers: 3,
              aggregateLimit: '1,000,000,000',
              classes: ['Property', 'Engineering'],
              status: 'Active'
            }
          ].map((program, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800">{program.name}</h5>
                  <p className="text-sm text-gray-600">Net Retention: {program.netRetention} TZS</p>
                  <p className="text-sm text-gray-600">Layers: {program.layers}</p>
                  <p className="text-sm text-gray-600">Aggregate Limit: {program.aggregateLimit} TZS</p>
                  <p className="text-sm text-gray-600">Classes: {program.classes.join(', ')}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    {program.status}
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