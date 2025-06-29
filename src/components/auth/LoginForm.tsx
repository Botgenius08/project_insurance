import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserTypeSelector } from './UserTypeSelector';
import { UserType } from '../../types';

export const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [userType, setUserType] = useState<UserType>('intermediary');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!credentials.username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    if (!credentials.password) {
      setError('Please enter a password');
      return;
    }
    
    try {
      const success = await login(credentials);
      if (!success) {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  };

  const fillCredentials = (username: string, password: string) => {
    setCredentials({ username, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Insurance Platform</h1>
          <p className="text-gray-600">Secure access for intermediaries and employees</p>
        </div>
        
        {/* Test Credentials Section */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center mb-2">
            <Info className="w-4 h-4 text-blue-600 mr-2" />
            <h3 className="text-sm font-medium text-blue-800">Test Credentials</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="font-medium text-blue-700 mb-1">Intermediaries:</p>
                <button
                  type="button"
                  onClick={() => fillCredentials('intermediary1', 'password123')}
                  className="block w-full text-left p-1 hover:bg-blue-100 rounded text-blue-600 hover:text-blue-800"
                >
                  intermediary1
                </button>
                <button
                  type="button"
                  onClick={() => fillCredentials('intermediary2', 'password123')}
                  className="block w-full text-left p-1 hover:bg-blue-100 rounded text-blue-600 hover:text-blue-800"
                >
                  intermediary2
                </button>
              </div>
              <div>
                <p className="font-medium text-blue-700 mb-1">Employees:</p>
                <button
                  type="button"
                  onClick={() => fillCredentials('employee1', 'password123')}
                  className="block w-full text-left p-1 hover:bg-blue-100 rounded text-blue-600 hover:text-blue-800"
                >
                  employee1
                </button>
                <button
                  type="button"
                  onClick={() => fillCredentials('employee2', 'password123')}
                  className="block w-full text-left p-1 hover:bg-blue-100 rounded text-blue-600 hover:text-blue-800"
                >
                  employee2
                </button>
              </div>
            </div>
            <p className="text-blue-600 mt-2">Password for all: <span className="font-mono">password123</span></p>
            <p className="text-blue-500 text-xs">Click any username to auto-fill credentials</p>
          </div>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <UserTypeSelector userType={userType} onChange={setUserType} />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};