import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Paperclip, Send, Download, FileText } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { useAuth } from '../../context/AuthContext';
import { Quotation, Message } from '../../types';

interface QuotationDetailsProps {
  quotation: Quotation;
  onBack: () => void;
}

export const QuotationDetails: React.FC<QuotationDetailsProps> = ({ quotation, onBack }) => {
  const { user } = useAuth();
  const { addMessage, getMessagesForQuotation } = useAppState();
  const [newMessage, setNewMessage] = useState('');
  const [showMessaging, setShowMessaging] = useState(false);
  
  const messages = getMessagesForQuotation(quotation.id);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    addMessage({
      quotationId: quotation.id,
      senderId: user.id,
      senderName: user.name,
      senderType: user.type,
      message: newMessage.trim()
    });

    setNewMessage('');
  };

  const handleAttachPDF = () => {
    // Simulate PDF attachment
    alert('PDF attachment functionality would be implemented here');
  };

  const renderMotorInsuranceDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Coverage Type</label>
          <p className="text-lg text-gray-900 capitalize">{quotation.coverageType || 'Not specified'}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600">Estimated Vehicle Value</label>
          <p className="text-lg text-gray-900">{quotation.vehicleValue ? `${parseInt(quotation.vehicleValue).toLocaleString()} TZS` : 'Not specified'}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600">Vehicle Usage</label>
          <p className="text-lg text-gray-900 capitalize">{quotation.vehicleUsage || 'Not specified'}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {quotation.excessBuyBack && (
          <div>
            <label className="block text-sm font-medium text-gray-600">Excess Buy Back</label>
            <p className="text-lg text-green-600">Yes</p>
          </div>
        )}
        
        {quotation.numberOfSeats && (
          <div>
            <label className="block text-sm font-medium text-gray-600">Number of Seats</label>
            <p className="text-lg text-gray-900">{quotation.numberOfSeats}</p>
          </div>
        )}
        
        {quotation.passengerServiceType && (
          <div>
            <label className="block text-sm font-medium text-gray-600">Passenger Service Type</label>
            <p className="text-lg text-gray-900">{quotation.passengerServiceType}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderPropertyInsuranceDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Property Type</label>
          <p className="text-lg text-gray-900 capitalize">{quotation.propertyType || 'Not specified'}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600">Property Value</label>
          <p className="text-lg text-gray-900">{quotation.propertyValue ? `${parseInt(quotation.propertyValue).toLocaleString()} TZS` : 'Not specified'}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Property Location</label>
          <p className="text-lg text-gray-900">{quotation.propertyLocation || 'Not specified'}</p>
        </div>
      </div>
    </div>
  );

  const renderHealthInsuranceDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Who is this for?</label>
          <p className="text-lg text-gray-900 capitalize">{quotation.whoIsThisFor || 'Not specified'}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600">Coverage Level</label>
          <p className="text-lg text-gray-900 capitalize">{quotation.coverageLevel || 'Not specified'}</p>
        </div>
        
        {quotation.whoIsThisFor === 'family' && quotation.numberOfPeople && (
          <div>
            <label className="block text-sm font-medium text-gray-600">Number of Family Members</label>
            <p className="text-lg text-gray-900">{quotation.numberOfPeople}</p>
          </div>
        )}
        
        {quotation.whoIsThisFor === 'group' && quotation.companyName && (
          <div>
            <label className="block text-sm font-medium text-gray-600">Company Name</label>
            <p className="text-lg text-gray-900">{quotation.companyName}</p>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {quotation.ageRange && (
          <div>
            <label className="block text-sm font-medium text-gray-600">Age Range</label>
            <p className="text-lg text-gray-900">{quotation.ageRange}</p>
          </div>
        )}
        
        {quotation.whoIsThisFor === 'group' && quotation.numberOfEmployees && (
          <div>
            <label className="block text-sm font-medium text-gray-600">Number of Employees</label>
            <p className="text-lg text-gray-900">{quotation.numberOfEmployees}</p>
          </div>
        )}
        
        {quotation.whoIsThisFor === 'group' && quotation.industryType && (
          <div>
            <label className="block text-sm font-medium text-gray-600">Industry Type</label>
            <p className="text-lg text-gray-900 capitalize">{quotation.industryType}</p>
          </div>
        )}
        
        {quotation.existingConditions && (
          <div>
            <label className="block text-sm font-medium text-gray-600">Additional Notes</label>
            <p className="text-lg text-gray-900">{quotation.existingConditions}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderGeneralDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Coverage Details</label>
          <p className="text-lg text-gray-900">{quotation.coverageDetails || 'No additional details provided'}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Quotations
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowMessaging(!showMessaging)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Messages ({messages.length})
          </button>
          
          {user?.type === 'employee' && (
            <button
              onClick={handleAttachPDF}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
            >
              <Paperclip className="w-4 h-4 mr-2" />
              Attach PDF
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quotation Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Request Number</label>
                  <p className="text-lg font-semibold text-gray-900">{quotation.requestNumber || `QR-${quotation.id}`}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Client Name</label>
                  <p className="text-lg text-gray-900">{quotation.clientName}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Client Email</label>
                  <p className="text-lg text-gray-900">{quotation.clientEmail || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Product</label>
                  <p className="text-lg text-gray-900">{quotation.product}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Coverage Amount</label>
                  <p className="text-lg font-semibold text-green-600">{quotation.amount.toLocaleString()} TZS</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Status</label>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    quotation.status === 'approved' ? 'bg-green-100 text-green-700' :
                    quotation.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {quotation.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Product-specific details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Product-Specific Details</h3>
              
              {quotation.product === 'Motor Insurance' && renderMotorInsuranceDetails()}
              {quotation.product === 'Property & Fire Insurance' && renderPropertyInsuranceDetails()}
              {quotation.product === 'Health Insurance' && renderHealthInsuranceDetails()}
              {!['Motor Insurance', 'Property & Fire Insurance', 'Health Insurance'].includes(quotation.product) && renderGeneralDetails()}
            </div>
          </div>
        </div>

        {/* Messaging Sidebar */}
        <div className={`lg:col-span-1 ${showMessaging ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Messages
              </h3>
              <p className="text-sm text-gray-600">
                Communication between {user?.type === 'intermediary' ? 'you and underwriting team' : 'intermediary and underwriting team'}
              </p>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto max-h-96">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
                ) : (
                  messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderType === user?.type ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderType === user?.type
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="text-xs opacity-75 mb-1">
                          {message.senderName} • {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                        <p className="text-sm">{message.message}</p>
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map(attachment => (
                              <div key={attachment.id} className="flex items-center text-xs">
                                <FileText className="w-3 h-3 mr-1" />
                                <span>{attachment.name}</span>
                                <Download className="w-3 h-3 ml-1 cursor-pointer" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};