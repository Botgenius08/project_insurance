import React from 'react';
import { UserType } from '../../types';

interface UserTypeSelectorProps {
  userType: UserType;
  onChange: (userType: UserType) => void;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ userType, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
      <select 
        value={userType} 
        onChange={(e) => onChange(e.target.value as UserType)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="intermediary">Intermediary</option>
        <option value="employee">Employee</option>
      </select>
    </div>
  );
};