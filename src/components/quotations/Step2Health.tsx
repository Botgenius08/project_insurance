import React, { useState, useEffect } from 'react';

interface Step2HealthProps {
  formData: any;
  setFormData: (data: any) => void;
  setStep: (step: number) => void;
}

export const Step2Health: React.FC<Step2HealthProps> = ({ formData, setFormData, setStep }) => {
  // Initialize missing form fields for health insurance
  const [localData, setLocalData] = useState({
    whoIsThisFor: formData.whoIsThisFor || '',
    numberOfPeople: formData.numberOfPeople || '',
    ageRange: formData.ageRange || '',
    existingConditions: formData.existingConditions || '',
    coverageLevel: formData.coverageLevel || '',
    companyName: formData.companyName || '',
    numberOfEmployees: formData.numberOfEmployees || '',
    industryType: formData.industryType || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update parent formData
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculatePremium = () => {
    const {
      whoIsThisFor,
      coverageLevel,
      numberOfPeople,
      numberOfEmployees,
      ageRange
    } = localData;

    if (!whoIsThisFor || !coverageLevel) {
      return <div className="text-gray-400">Please complete all required fields</div>;
    }

    let premium = 0;
    let description = '';

    if (whoIsThisFor === 'individual') {
      const baseRates = {
        basic: 500000,
        standard: 800000,
        premium: 1200000,
        comprehensive: 1800000
      };
      
      premium = baseRates[coverageLevel as keyof typeof baseRates] || 0;
      
      // Age-based adjustments
      if (ageRange) {
        const ageMultipliers = {
          '18-25': 0.9,
          '26-35': 1.0,
          '36-45': 1.1,
          '46-55': 1.3,
          '56-65': 1.5,
          '65+': 1.8
        };
        premium *= ageMultipliers[ageRange as keyof typeof ageMultipliers] || 1.0;
      }
      
      description = 'Individual Health Insurance Plan';
    } else if (whoIsThisFor === 'family') {
      const familyBaseRates = {
        basic: 1200000,
        standard: 1800000,
        premium: 2500000,
        comprehensive: 3500000
      };
      
      premium = familyBaseRates[coverageLevel as keyof typeof familyBaseRates] || 0;
      
      // Family size adjustments
      if (numberOfPeople) {
        const sizeMultipliers = {
          '2': 1.0,
          '3': 1.3,
          '4': 1.5,
          '5': 1.7,
          '6': 1.9,
          '7+': 2.1
        };
        premium *= sizeMultipliers[numberOfPeople as keyof typeof sizeMultipliers] || 1.0;
      }
      
      description = 'Family Health Insurance Plan';
    } else if (whoIsThisFor === 'group') {
      const groupBaseRates = {
        basic: 400000,
        standard: 600000,
        premium: 900000,
        comprehensive: 1300000,
        executive: 1800000
      };
      
      const perPersonRate = groupBaseRates[coverageLevel as keyof typeof groupBaseRates] || 0;
      
      if (numberOfEmployees) {
        const employeeRanges = {
          '1-10': 7,
          '11-25': 18,
          '26-50': 38,
          '51-100': 75,
          '101-250': 175,
          '251-500': 375,
          '500+': 750
        };
        
        const avgEmployees = employeeRanges[numberOfEmployees as keyof typeof employeeRanges] || 0;
        premium = perPersonRate * avgEmployees;
        
        // Volume discounts
        if (avgEmployees > 50) premium *= 0.9;
        if (avgEmployees > 100) premium *= 0.85;
        if (avgEmployees > 250) premium *= 0.8;
      }
      
      description = 'Group Health Insurance Plan';
    }

    if (premium === 0) {
      return <div className="text-green-400 font-medium">Our Team will contact you shortly for a custom quote</div>;
    }

    const vat = premium * 0.18;
    const totalPremium = premium + vat;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700/50 p-4 rounded-md">
            <div className="text-gray-400 text-sm mb-1">Premium</div>
            <div className="text-white text-lg font-semibold">
              {premium.toLocaleString()} TZS
            </div>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-md">
            <div className="text-gray-400 text-sm mb-1">VAT (18%)</div>
            <div className="text-white text-lg font-semibold">
              {vat.toLocaleString()} TZS
            </div>
          </div>
          <div className="bg-green-600/20 border border-green-500 p-4 rounded-md">
            <div className="text-green-400 text-sm mb-1">Total Premium</div>
            <div className="text-green-400 text-lg font-bold">
              {totalPremium.toLocaleString()} TZS
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Insurance Details</h3>
      
      <form className="space-y-6">
        {/* Who is this for */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Who is this for?</label>
          <select
            name="whoIsThisFor"
            value={localData.whoIsThisFor}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select who this is for</option>
            <option value="individual">Individual (Myself)</option>
            <option value="family">Family</option>
            <option value="group">Group/Company</option>
          </select>
        </div>

        {/* Individual Coverage Fields */}
        {localData.whoIsThisFor === 'individual' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                <select
                  name="ageRange"
                  value={localData.ageRange}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select age range</option>
                  <option value="18-25">18-25 years</option>
                  <option value="26-35">26-35 years</option>
                  <option value="36-45">36-45 years</option>
                  <option value="46-55">46-55 years</option>
                  <option value="56-65">56-65 years</option>
                  <option value="65+">65+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Level</label>
                <select
                  name="coverageLevel"
                  value={localData.coverageLevel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select coverage level</option>
                  <option value="basic">Basic Coverage</option>
                  <option value="standard">Standard Coverage</option>
                  <option value="premium">Premium Coverage</option>
                  <option value="comprehensive">Comprehensive Coverage</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pre-existing Medical Conditions</label>
              <textarea
                name="existingConditions"
                value={localData.existingConditions}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Please list any pre-existing medical conditions (optional)"
              />
            </div>
          </div>
        )}

        {/* Family Coverage Fields */}
        {localData.whoIsThisFor === 'family' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Family Members</label>
                <select
                  name="numberOfPeople"
                  value={localData.numberOfPeople}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select number of people</option>
                  <option value="2">2 people</option>
                  <option value="3">3 people</option>
                  <option value="4">4 people</option>
                  <option value="5">5 people</option>
                  <option value="6">6 people</option>
                  <option value="7+">7+ people</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Level</label>
                <select
                  name="coverageLevel"
                  value={localData.coverageLevel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select coverage level</option>
                  <option value="basic">Basic Family Plan</option>
                  <option value="standard">Standard Family Plan</option>
                  <option value="premium">Premium Family Plan</option>
                  <option value="comprehensive">Comprehensive Family Plan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age Range of Family Members</label>
              <input
                type="text"
                name="ageRange"
                value={localData.ageRange}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Adults: 30-35, Children: 5-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pre-existing Medical Conditions (Any Family Member)</label>
              <textarea
                name="existingConditions"
                value={localData.existingConditions}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Please list any pre-existing medical conditions for any family member (optional)"
              />
            </div>
          </div>
        )}

        {/* Group/Company Coverage Fields */}
        {localData.whoIsThisFor === 'group' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company/Organization Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={localData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
                <select
                  name="numberOfEmployees"
                  value={localData.numberOfEmployees}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select number of employees</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-25">11-25 employees</option>
                  <option value="26-50">26-50 employees</option>
                  <option value="51-100">51-100 employees</option>
                  <option value="101-250">101-250 employees</option>
                  <option value="251-500">251-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry Type</label>
                <select
                  name="industryType"
                  value={localData.industryType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select industry type</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="services">Services</option>
                  <option value="retail">Retail</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="finance">Finance & Banking</option>
                  <option value="technology">Technology</option>
                  <option value="construction">Construction</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="mining">Mining</option>
                  <option value="transportation">Transportation</option>
                  <option value="hospitality">Hospitality & Tourism</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Level</label>
                <select
                  name="coverageLevel"
                  value={localData.coverageLevel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select coverage level</option>
                  <option value="basic">Basic Group Plan</option>
                  <option value="standard">Standard Group Plan</option>
                  <option value="premium">Premium Group Plan</option>
                  <option value="comprehensive">Comprehensive Group Plan</option>
                  <option value="executive">Executive Plan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements or Notes</label>
              <textarea
                name="existingConditions"
                value={localData.existingConditions}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Please provide any additional requirements, special considerations, or notes about your group health insurance needs"
              />
            </div>
          </div>
        )}

        {/* Premium Calculation */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Premium Calculation</h4>
          {calculatePremium()}
        </div>

        {/* Information Section */}
        {localData.whoIsThisFor && (
          <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">What's Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-blue-600 font-semibold mb-2">Coverage Benefits:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Inpatient and outpatient services</li>
                  <li>• Emergency medical treatment</li>
                  <li>• Prescription medication coverage</li>
                  <li>• Preventive care and check-ups</li>
                  {localData.whoIsThisFor === 'group' && <li>• Employee wellness programs</li>}
                  {localData.whoIsThisFor === 'family' && <li>• Maternity and pediatric care</li>}
                </ul>
              </div>
              <div>
                <h4 className="text-blue-600 font-semibold mb-2">Additional Services:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• 24/7 medical helpline</li>
                  <li>• Network of approved hospitals</li>
                  <li>• Direct billing arrangements</li>
                  <li>• Quick claims processing</li>
                  {localData.whoIsThisFor === 'individual' && <li>• International coverage options</li>}
                  {localData.whoIsThisFor === 'group' && <li>• Dedicated account management</li>}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
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

export default Step2Health;