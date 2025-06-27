// Step2Motor.tsx
import React from 'react';

interface Step2MotorProps {
  formData: any;
  setFormData: (data: any) => void;
  setStep: (step: number) => void;
}

export const Step2Motor: React.FC<Step2MotorProps> = ({ formData, setFormData, setStep }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Motor Insurance Details</h3>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Type</label>
            <select
              value={formData.coverageType}
              onChange={(e) => setFormData({...formData, coverageType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Coverage Type</option>
              <option value="comprehensive">Comprehensive</option>
              <option value="third-party">Third Party</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Vehicle Value (TZS)</label>
            <input
              type="number"
              value={formData.vehicleValue}
              onChange={(e) => setFormData({...formData, vehicleValue: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Usage</label>
            <select
              value={formData.vehicleUsage}
              onChange={(e) => setFormData({...formData, vehicleUsage: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Vehicle Usage</option>
              <option value="private">Private</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};