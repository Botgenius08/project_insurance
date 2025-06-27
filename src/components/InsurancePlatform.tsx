import React, { useState, useEffect } from 'react';
import { User, FileText, DollarSign, Shield, Bell, CheckCircle, XCircle, Clock, Users, Home, LogOut } from 'lucide-react';

const InsurancePlatform = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Sample data initialization
  useEffect(() => {
    // Initialize sample data
    setQuotations([
      { id: 1, clientName: 'John Doe', product: 'Car Insurance', amount: 1200, status: 'pending', date: '2025-06-20' },
      { id: 2, clientName: 'Jane Smith', product: 'Home Insurance', amount: 800, status: 'approved', date: '2025-06-22' }
    ]);
    
    setPolicies([
      { id: 1, policyNumber: 'POL001', clientName: 'Alice Johnson', product: 'Life Insurance', premium: 2400, status: 'active' },
      { id: 2, policyNumber: 'POL002', clientName: 'Bob Wilson', product: 'Health Insurance', premium: 1800, status: 'pending' }
    ]);
    
    setClaims([
      { id: 1, claimNumber: 'CLM001', clientName: 'Charlie Brown', amount: 5000, status: 'submitted', date: '2025-06-23' },
      { id: 2, claimNumber: 'CLM002', clientName: 'Diana Prince', amount: 3200, status: 'processing', date: '2025-06-21' }
    ]);
    
    setTasks([
      { id: 1, type: 'underwriting', title: 'Review High-Value Policy Application', assignedTo: 'underwriter', priority: 'high', dueDate: '2025-06-26' },
      { id: 2, type: 'finance', title: 'Verify Payment for Policy POL002', assignedTo: 'finance', priority: 'medium', dueDate: '2025-06-27' },
      { id: 3, type: 'quotation', title: 'Complex Commercial Insurance Quote', assignedTo: 'underwriter', priority: 'high', dueDate: '2025-06-25' }
    ]);
    
    setNotifications([
      { id: 1, message: 'New quotation request from intermediary', type: 'info', time: '10 minutes ago' },
      { id: 2, message: 'Policy POL001 requires approval', type: 'warning', time: '1 hour ago' }
    ]);
  }, []);

  const LoginForm = () => {
    const [userType, setUserType] = useState('intermediary');
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleLogin = (e) => {
      e.preventDefault();
      console.log('Login attempt:', { userType, credentials });
      
      // Simple validation - just need something in username field
      if (!credentials.username.trim()) {
        alert('Please enter a username');
        return;
      }
      
      // Simulate login - works with any credentials
      const newUser = {
        id: 1,
        name: credentials.username || 'Demo User',
        type: userType,
        permissions: userType === 'intermediary' ? ['quotations', 'policies', 'claims'] : ['approvals', 'underwriting', 'finance']
      };
      
      console.log('Setting user:', newUser);
      setCurrentUser(newUser);
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
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
              <select 
                value={userType} 
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="intermediary">Intermediary</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  };

  const Dashboard = () => {
    const isIntermediary = currentUser.type === 'intermediary';
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isIntermediary ? 'Intermediary Dashboard' : 'Employee Dashboard'}
        </h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isIntermediary ? (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Quotations</p>
                    <p className="text-2xl font-bold text-blue-600">{quotations.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Policies</p>
                    <p className="text-2xl font-bold text-green-600">{policies.length}</p>
                  </div>
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Open Claims</p>
                    <p className="text-2xl font-bold text-orange-600">{claims.length}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-purple-600">$24,500</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Tasks</p>
                    <p className="text-2xl font-bold text-red-600">{tasks.filter(t => t.status !== 'completed').length}</p>
                  </div>
                  <Clock className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Approvals Needed</p>
                    <p className="text-2xl font-bold text-yellow-600">5</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed Today</p>
                    <p className="text-2xl font-bold text-green-600">8</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Team Members</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {notifications.map(notification => (
              <div key={notification.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Bell className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const QuotationForm = () => {
    const [quotation, setQuotation] = useState({
      clientName: '',
      clientEmail: '',
      product: '',
      coverage: '',
      amount: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newQuotation = {
        ...quotation,
        id: quotations.length + 1,
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
      };
      setQuotations([...quotations, newQuotation]);
      setQuotation({ clientName: '', clientEmail: '', product: '', coverage: '', amount: '' });
      alert('Quotation created successfully!');
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Quotation</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
              <input
                type="text"
                value={quotation.clientName}
                onChange={(e) => setQuotation({...quotation, clientName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
              <input
                type="email"
                value={quotation.clientEmail}
                onChange={(e) => setQuotation({...quotation, clientEmail: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Product</label>
              <select
                value={quotation.product}
                onChange={(e) => setQuotation({...quotation, product: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Product</option>
                <option value="Car Insurance">Car Insurance</option>
                <option value="Home Insurance">Home Insurance</option>
                <option value="Life Insurance">Life Insurance</option>
                <option value="Health Insurance">Health Insurance</option>
                <option value="Business Insurance">Business Insurance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Amount</label>
              <input
                type="number"
                value={quotation.amount}
                onChange={(e) => setQuotation({...quotation, amount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Details</label>
            <textarea
              value={quotation.coverage}
              onChange={(e) => setQuotation({...quotation, coverage: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Describe the coverage details..."
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Create Quotation
          </button>
        </form>
      </div>
    );
  };

  const TaskManagement = () => {
    const handleTaskAction = (taskId, action) => {
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: action === 'approve' ? 'approved' : action === 'complete' ? 'completed' : task.status }
          : task
      ));
    };

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Task Management</h3>
        
        {/* Task Filters */}
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition duration-200">
            All Tasks
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200">
            Underwriting
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200">
            Finance
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200">
            Quotations
          </button>
        </div>
        
        {/* Task List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-800">Assigned Tasks</h4>
          </div>
          <div className="divide-y divide-gray-200">
            {tasks.map(task => (
              <div key={task.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800">{task.title}</h5>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {task.priority} priority
                      </span>
                      <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
                      <span className="text-sm text-gray-500 capitalize">Type: {task.type}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {task.type === 'finance' && (
                      <button
                        onClick={() => handleTaskAction(task.id, 'approve')}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition duration-200"
                      >
                        Approve Payment
                      </button>
                    )}
                    <button
                      onClick={() => handleTaskAction(task.id, 'complete')}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition duration-200"
                    >
                      Complete
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

  const ClaimsManagement = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Claims Management</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            Lodge New Claim
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-800">Recent Claims</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claim #</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {claims.map(claim => (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{claim.claimNumber}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{claim.clientName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">${claim.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        claim.status === 'approved' ? 'bg-green-100 text-green-700' :
                        claim.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{claim.date}</td>
                    <td className="px-4 py-3 text-sm">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-800">Process</button>
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

  const PoliciesManagement = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Policies Management</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            Create New Policy
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-800">Active Policies</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy #</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Premium</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {policies.map(policy => (
                  <tr key={policy.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{policy.policyNumber}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{policy.clientName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{policy.product}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">${policy.premium.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        policy.status === 'active' ? 'bg-green-100 text-green-700' :
                        policy.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {policy.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-800">Renew</button>
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

  const ApprovalsManagement = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Approvals Required</h3>
        
        <div className="grid gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-medium text-gray-800 mb-4">Payment Approvals</h4>
            <div className="space-y-4">
              {[
                { id: 1, type: 'Claim Payment', client: 'John Doe', amount: 5000, description: 'Motor vehicle accident claim' },
                { id: 2, type: 'Premium Refund', client: 'Jane Smith', amount: 1200, description: 'Policy cancellation refund' }
              ].map(approval => (
                <div key={approval.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800">{approval.type}</h5>
                    <p className="text-sm text-gray-600">Client: {approval.client}</p>
                    <p className="text-sm text-gray-600">{approval.description}</p>
                    <p className="text-sm font-medium text-gray-800">Amount: ${approval.amount.toLocaleString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition duration-200">
                      Reject
                    </button>
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition duration-200">
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-medium text-gray-800 mb-4">Policy Approvals</h4>
            <div className="space-y-4">
              {[
                { id: 1, type: 'High Value Policy', client: 'Robert Johnson', amount: 500000, product: 'Commercial Property Insurance' },
                { id: 2, type: 'Special Risk Policy', client: 'Corporate Client Ltd', amount: 1000000, product: 'Directors & Officers Insurance' }
              ].map(approval => (
                <div key={approval.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800">{approval.type}</h5>
                    <p className="text-sm text-gray-600">Client: {approval.client}</p>
                    <p className="text-sm text-gray-600">Product: {approval.product}</p>
                    <p className="text-sm font-medium text-gray-800">Coverage: ${approval.amount.toLocaleString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition duration-200">
                      Review
                    </button>
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition duration-200">
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!currentUser) {
    return <LoginForm />;
  }

  const isIntermediary = currentUser.type === 'intermediary';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Insurance Platform</h1>
                <p className="text-sm text-gray-600">{isIntermediary ? 'Intermediary Portal' : 'Employee Portal'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
              </div>
              <button
                onClick={() => setCurrentUser(null)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm h-screen sticky top-0 overflow-y-auto">
          <div className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            
            {isIntermediary ? (
              <>
                <button
                  onClick={() => setActiveTab('quotations')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'quotations' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Quotations</span>
                </button>
                <button
                  onClick={() => setActiveTab('policies')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'policies' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span>Policies</span>
                </button>
                <button
                  onClick={() => setActiveTab('claims')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'claims' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <DollarSign className="w-5 h-5" />
                  <span>Claims</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'tasks' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Tasks</span>
                </button>
                <button
                  onClick={() => setActiveTab('approvals')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'approvals' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  <span>Approvals</span>
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'quotations' && (
            <div className="space-y-6">
              <QuotationForm />
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Quotations</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {quotations.map(quote => (
                        <tr key={quote.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-700">{quote.clientName}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{quote.product}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">${quote.amount.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              quote.status === 'approved' ? 'bg-green-100 text-green-700' :
                              quote.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {quote.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{quote.date}</td>
                          <td className="px-4 py-3 text-sm">
                            <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                            <button className="text-green-600 hover:text-green-800">Convert</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'policies' && <PoliciesManagement />}
          {activeTab === 'claims' && <ClaimsManagement />}
          {activeTab === 'tasks' && <TaskManagement />}
          {activeTab === 'approvals' && <ApprovalsManagement />}
        </main>
      </div>
    </div>
  );
};

export default InsurancePlatform;
