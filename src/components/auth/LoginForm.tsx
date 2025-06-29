import React, { useState } from 'react';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { checkDemoUsers, createDemoUsers } from '../../utils/checkDemoUsers';

export const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
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

  // Function to check demo users (for debugging)
  const handleCheckDemoUsers = async () => {
    setDebugInfo('Checking demo users...');
    const result = await checkDemoUsers();
    if (result.success) {
      console.log('Demo users found:', result.users);
      setDebugInfo(`Found ${result.users?.length || 0} demo users. Check console for details.`);
    } else {
      console.error('Error checking demo users:', result.error);
      setDebugInfo(`Error: ${result.error}`);
    }
  };

  // Function to create demo users if they don't exist
  const handleCreateDemoUsers = async () => {
    setDebugInfo('Creating demo users...');
    const result = await createDemoUsers();
    if (result.success) {
      setDebugInfo(`Successfully created ${result.created} demo users!`);
    } else {
      setDebugInfo(`Error creating demo users: ${result.error}`);
    }
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
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {debugInfo && (
          <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg text-sm">
            {debugInfo}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Test Credentials:</h3>
          <div className="text-xs text-gray-600 space-y-1">
            <div><strong>Intermediary:</strong> intermediary1 / password123</div>
            <div><strong>Employee:</strong> employee1 / password123</div>
          </div>
          
          <div className="mt-3 space-y-2">
            <button
              type="button"
              onClick={handleCheckDemoUsers}
              className="w-full bg-gray-200 text-gray-700 py-1 px-3 rounded text-xs hover:bg-gray-300 transition duration-200"
            >
              Check Demo Users in Database
            </button>
            <button
              type="button"
              onClick={handleCreateDemoUsers}
              className="w-full bg-green-200 text-green-700 py-1 px-3 rounded text-xs hover:bg-green-300 transition duration-200"
            >
              Create Demo Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};