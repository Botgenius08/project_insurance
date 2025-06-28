import React, { useState } from 'react';
import { FileText, Download, Calendar, DollarSign, TrendingUp, BarChart3, Calculator, Database, Settings } from 'lucide-react';

export const AccountingFeatures: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2025-01');
  const [activeModule, setActiveModule] = useState('general-ledger');

  // Unified Ledger Data
  const [ledgerEntries] = useState([
    {
      id: 1,
      date: '2025-01-15',
      reference: 'POL-2025-001',
      description: 'Premium Income - Motor Insurance',
      account: '4100',
      accountName: 'Premium Income',
      debit: 0,
      credit: 15000000,
      currency: 'TZS',
      exchangeRate: 1,
      project: 'MOTOR-2025',
      costCenter: 'UW001'
    },
    {
      id: 2,
      date: '2025-01-15',
      reference: 'POL-2025-001',
      description: 'Commission Expense',
      account: '6200',
      accountName: 'Commission Expense',
      debit: 3750000,
      credit: 0,
      currency: 'TZS',
      exchangeRate: 1,
      project: 'MOTOR-2025',
      costCenter: 'UW001'
    },
    {
      id: 3,
      date: '2025-01-15',
      reference: 'CLM-2025-001',
      description: 'Claims Paid - Property',
      account: '5100',
      accountName: 'Claims Expense',
      debit: 8500000,
      credit: 0,
      currency: 'TZS',
      exchangeRate: 1,
      project: 'PROP-2025',
      costCenter: 'CL001'
    }
  ]);

  // Multi-currency support
  const [currencies] = useState([
    { code: 'TZS', name: 'Tanzanian Shilling', rate: 1.0000, symbol: 'TZS' },
    { code: 'USD', name: 'US Dollar', rate: 2400.0000, symbol: '$' },
    { code: 'EUR', name: 'Euro', rate: 2600.0000, symbol: '€' },
    { code: 'GBP', name: 'British Pound', rate: 3000.0000, symbol: '£' },
    { code: 'KES', name: 'Kenyan Shilling', rate: 18.5000, symbol: 'KSh' }
  ]);

  // Chart of Accounts
  const [chartOfAccounts] = useState([
    { code: '1000', name: 'Cash and Bank', type: 'Asset', category: 'Current Assets' },
    { code: '1100', name: 'Accounts Receivable', type: 'Asset', category: 'Current Assets' },
    { code: '1200', name: 'Prepaid Expenses', type: 'Asset', category: 'Current Assets' },
    { code: '1500', name: 'Fixed Assets', type: 'Asset', category: 'Non-Current Assets' },
    { code: '2000', name: 'Accounts Payable', type: 'Liability', category: 'Current Liabilities' },
    { code: '2100', name: 'Accrued Expenses', type: 'Liability', category: 'Current Liabilities' },
    { code: '2500', name: 'Technical Reserves', type: 'Liability', category: 'Insurance Reserves' },
    { code: '3000', name: 'Share Capital', type: 'Equity', category: 'Capital' },
    { code: '3100', name: 'Retained Earnings', type: 'Equity', category: 'Reserves' },
    { code: '4100', name: 'Premium Income', type: 'Income', category: 'Insurance Revenue' },
    { code: '4200', name: 'Investment Income', type: 'Income', category: 'Investment Revenue' },
    { code: '5100', name: 'Claims Expense', type: 'Expense', category: 'Insurance Expenses' },
    { code: '5200', name: 'Reinsurance Expense', type: 'Expense', category: 'Insurance Expenses' },
    { code: '6100', name: 'Operating Expenses', type: 'Expense', category: 'Operating Expenses' },
    { code: '6200', name: 'Commission Expense', type: 'Expense', category: 'Operating Expenses' }
  ]);

  // Budget data
  const [budgetData] = useState([
    { account: '4100', accountName: 'Premium Income', budget: 1200000000, actual: 450000000, variance: -750000000 },
    { account: '5100', accountName: 'Claims Expense', budget: 600000000, actual: 125000000, variance: 475000000 },
    { account: '6200', accountName: 'Commission Expense', budget: 180000000, actual: 67500000, variance: 112500000 }
  ]);

  const generateReport = (reportType: string) => {
    alert(`Generating ${reportType} for ${selectedPeriod}...`);
  };

  const processAutomation = (processType: string) => {
    alert(`Processing ${processType}...`);
  };

  const renderGeneralLedger = () => (
    <div className="space-y-6">
      {/* Unified Ledger */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2" />
          Unified Ledger
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Debit (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credit (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost Center</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ledgerEntries.map(entry => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{entry.date}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{entry.reference}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{entry.account} - {entry.accountName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{entry.description}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{entry.debit ? entry.debit.toLocaleString() : '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{entry.credit ? entry.credit.toLocaleString() : '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{entry.project}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{entry.costCenter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trial Balance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Trial Balance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Assets & Expenses</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Cash and Bank:</span>
                <span className="font-medium">125,000,000 TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Accounts Receivable:</span>
                <span className="font-medium">89,500,000 TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Claims Expense:</span>
                <span className="font-medium">125,000,000 TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Commission Expense:</span>
                <span className="font-medium">67,500,000 TZS</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>Total Debits:</span>
                <span className="text-blue-600">407,000,000 TZS</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Liabilities, Equity & Income</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Technical Reserves:</span>
                <span className="font-medium">180,000,000 TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Share Capital:</span>
                <span className="font-medium">100,000,000 TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Premium Income:</span>
                <span className="font-medium">450,000,000 TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Investment Income:</span>
                <span className="font-medium">25,000,000 TZS</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>Total Credits:</span>
                <span className="text-green-600">755,000,000 TZS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMultiCurrency = () => (
    <div className="space-y-6">
      {/* Currency Management */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Multi-Currency Management
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Currency Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Currency Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exchange Rate (to TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symbol</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currencies.map(currency => (
                <tr key={currency.code} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{currency.code}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{currency.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{currency.rate.toFixed(4)}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{currency.symbol}</td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">Update Rate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Currency Conversion */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Currency Conversion</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Currency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>{currency.code} - {currency.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Currency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>{currency.code} - {currency.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Convert
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBudgeting = () => (
    <div className="space-y-6">
      {/* Budget vs Actual */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Budget vs Actual Analysis
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actual (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variance (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variance %</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {budgetData.map(item => {
                const variancePercent = ((item.actual - item.budget) / item.budget * 100).toFixed(1);
                const isPositive = item.variance > 0;
                
                return (
                  <tr key={item.account} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.account} - {item.accountName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.budget.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.actual.toLocaleString()}</td>
                    <td className={`px-4 py-3 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {item.variance.toLocaleString()}
                    </td>
                    <td className={`px-4 py-3 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {variancePercent}%
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        Math.abs(parseFloat(variancePercent)) <= 10 ? 'bg-green-100 text-green-700' :
                        Math.abs(parseFloat(variancePercent)) <= 25 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {Math.abs(parseFloat(variancePercent)) <= 10 ? 'On Track' :
                         Math.abs(parseFloat(variancePercent)) <= 25 ? 'Caution' : 'Alert'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-blue-600">1,980,000,000 TZS</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Actual</p>
              <p className="text-2xl font-bold text-green-600">642,500,000 TZS</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Budget Utilization</p>
              <p className="text-2xl font-bold text-purple-600">32.4%</p>
            </div>
            <Calculator className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderFixedAssets = () => (
    <div className="space-y-6">
      {/* Fixed Assets Register */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Fixed Assets Management
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Asset Categories</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Buildings:</span>
                <span className="font-medium">500,000,000 TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Computer Equipment:</span>
                <span className="font-medium">45,000,000 TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Furniture & Fixtures:</span>
                <span className="font-medium">25,000,000 TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Motor Vehicles:</span>
                <span className="font-medium">80,000,000 TZS</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>Total Cost:</span>
                <span className="text-blue-600">650,000,000 TZS</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Depreciation Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Accumulated Depreciation:</span>
                <span className="font-medium">125,000,000 TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Current Year Depreciation:</span>
                <span className="font-medium">32,500,000 TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Net Book Value:</span>
                <span className="font-medium">525,000,000 TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Depreciation Rate:</span>
                <span className="font-medium">5-20% p.a.</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => processAutomation('Asset Depreciation')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Depreciation
          </button>
          <button
            onClick={() => generateReport('Fixed Assets Register')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 flex items-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            Assets Register
          </button>
        </div>
      </div>
    </div>
  );

  const renderAutomation = () => (
    <div className="space-y-6">
      {/* Process Automation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Financial Process Automation
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Automated Processes</h4>
            
            <div className="space-y-3">
              <button
                onClick={() => processAutomation('Bank Reconciliation')}
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium text-gray-800">Bank Statement Reconciliation</h5>
                    <p className="text-sm text-gray-600">Automated matching of bank transactions</p>
                  </div>
                  <Settings className="w-5 h-5 text-gray-400" />
                </div>
              </button>
              
              <button
                onClick={() => processAutomation('Asset Depreciation')}
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium text-gray-800">Asset Depreciation</h5>
                    <p className="text-sm text-gray-600">Monthly depreciation calculation</p>
                  </div>
                  <Calculator className="w-5 h-5 text-gray-400" />
                </div>
              </button>
              
              <button
                onClick={() => processAutomation('Cost Apportionment')}
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium text-gray-800">Cost Apportionment</h5>
                    <p className="text-sm text-gray-600">Automatic cost center allocation</p>
                  </div>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Scheduled Reports</h4>
            
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium text-gray-800">Daily Cash Position</h5>
                    <p className="text-sm text-gray-600">Automated at 9:00 AM daily</p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Active</span>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium text-gray-800">Monthly Trial Balance</h5>
                    <p className="text-sm text-gray-600">Generated on 1st of each month</p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Active</span>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium text-gray-800">Quarterly Financial Statements</h5>
                    <p className="text-sm text-gray-600">Auto-generated quarterly</p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReporting = () => (
    <div className="space-y-6">
      {/* Dynamic Reporting */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Dynamic Financial Reporting
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Standard Reports</h4>
            
            <div className="space-y-2">
              <button
                onClick={() => generateReport('Trial Balance')}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <h5 className="font-medium text-gray-800">Trial Balance</h5>
                <p className="text-sm text-gray-600">Real-time account balances</p>
              </button>
              
              <button
                onClick={() => generateReport('Profit & Loss')}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <h5 className="font-medium text-gray-800">Profit & Loss Statement</h5>
                <p className="text-sm text-gray-600">Income and expense analysis</p>
              </button>
              
              <button
                onClick={() => generateReport('Balance Sheet')}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <h5 className="font-medium text-gray-800">Balance Sheet</h5>
                <p className="text-sm text-gray-600">Financial position statement</p>
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Insurance Reports</h4>
            
            <div className="space-y-2">
              <button
                onClick={() => generateReport('Technical Account')}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <h5 className="font-medium text-gray-800">Technical Account</h5>
                <p className="text-sm text-gray-600">Underwriting results</p>
              </button>
              
              <button
                onClick={() => generateReport('Solvency Report')}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <h5 className="font-medium text-gray-800">Solvency Report</h5>
                <p className="text-sm text-gray-600">Capital adequacy analysis</p>
              </button>
              
              <button
                onClick={() => generateReport('Regulatory Returns')}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <h5 className="font-medium text-gray-800">Regulatory Returns</h5>
                <p className="text-sm text-gray-600">TIRA compliance reports</p>
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Management Reports</h4>
            
            <div className="space-y-2">
              <button
                onClick={() => generateReport('Cash Flow Statement')}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <h5 className="font-medium text-gray-800">Cash Flow Statement</h5>
                <p className="text-sm text-gray-600">Cash movement analysis</p>
              </button>
              
              <button
                onClick={() => generateReport('Budget Variance')}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <h5 className="font-medium text-gray-800">Budget Variance Report</h5>
                <p className="text-sm text-gray-600">Budget vs actual analysis</p>
              </button>
              
              <button
                onClick={() => generateReport('KPI Dashboard')}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <h5 className="font-medium text-gray-800">KPI Dashboard</h5>
                <p className="text-sm text-gray-600">Key performance indicators</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Period Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">SunSystems-Inspired Accounting Features</h3>
        <div className="flex items-center space-x-4">
          <Calendar className="w-5 h-5 text-gray-500" />
          <input
            type="month"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Module Navigation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'general-ledger', name: 'General Ledger', icon: Database },
            { id: 'multi-currency', name: 'Multi-Currency', icon: DollarSign },
            { id: 'budgeting', name: 'Budgeting', icon: BarChart3 },
            { id: 'fixed-assets', name: 'Fixed Assets', icon: Settings },
            { id: 'automation', name: 'Automation', icon: Settings },
            { id: 'reporting', name: 'Reporting', icon: FileText }
          ].map(module => {
            const IconComponent = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  activeModule === module.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {module.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Content */}
      {activeModule === 'general-ledger' && renderGeneralLedger()}
      {activeModule === 'multi-currency' && renderMultiCurrency()}
      {activeModule === 'budgeting' && renderBudgeting()}
      {activeModule === 'fixed-assets' && renderFixedAssets()}
      {activeModule === 'automation' && renderAutomation()}
      {activeModule === 'reporting' && renderReporting()}
    </div>
  );
};