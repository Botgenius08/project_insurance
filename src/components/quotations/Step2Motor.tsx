import React, { useState } from 'react';

interface Step2MotorProps {
  formData: any;
  setFormData: (data: any) => void;
  setStep: (step: number) => void;
}

export const Step2Motor: React.FC<Step2MotorProps> = ({ formData, setFormData, setStep }) => {
  // Initialize missing form fields
  const [localData, setLocalData] = useState({
    coverageType: formData.coverageType || '',
    vehicleValue: formData.vehicleValue || '',
    vehicleUsage: formData.vehicleUsage || '',
    excessBuyBack: formData.excessBuyBack || false,
    truck: formData.truck || false,
    trailer: formData.trailer || false,
    numberOfSeats: formData.numberOfSeats || '',
    passengerServiceType: formData.passengerServiceType || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setLocalData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Update parent formData
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const calculatePremium = () => {
    const {
      coverageType,
      vehicleUsage,
      vehicleValue,
      excessBuyBack,
      truck,
      trailer,
      numberOfSeats,
      passengerServiceType
    } = localData;

    const vehicleValueNum = parseFloat(vehicleValue) || 0;
    const numberOfSeatsNum = parseInt(numberOfSeats || '0') || 0;

    if (!coverageType || !vehicleUsage || !vehicleValue) {
      return <div className="text-gray-400">Please complete all required fields</div>;
    }

    if (vehicleUsage === 'passageCarrying') {
      if (!passengerServiceType || !numberOfSeats) {
        return <div className="text-gray-400">Please complete all required fields</div>;
      }
    }

    if (vehicleUsage === 'commercialVehicle') {
      if (truck || trailer) {
        return <div className="text-green-400 font-medium">Our Team will contact you shortly</div>;
      }
      return <div className="text-yellow-400 font-medium">Please select truck and/or trailer options</div>;
    }

    if (['specialVehicle'].includes(vehicleUsage) || coverageType === 'unsure') {
      return <div className="text-green-400 font-medium">Our Team will contact you shortly</div>;
    }

    let premium = 0;

    if (coverageType === 'comprehensive') {
      switch (vehicleUsage) {
        case 'privateCars':
          premium = Math.max(vehicleValueNum * 0.035, 250000);
          break;
        case 'privateTwoCycle':
          premium = vehicleValueNum * 0.05;
          break;
        case 'bodaboda':
          premium = (vehicleValueNum * 0.05) + 15000;
          break;
        case 'bajaji':
          premium = Math.max((vehicleValueNum * 0.06) + 45000, 125000);
          break;
        case 'passageCarrying':
          switch (passengerServiceType) {
            case 'publicTaxis':
              premium = Math.max((vehicleValueNum * 0.055) + (15000 * numberOfSeatsNum), 500000);
              break;
            case 'daladalacity':
              premium = Math.max((vehicleValueNum * 0.08) + (15000 * numberOfSeatsNum), 500000);
              break;
            case 'busesUpcountry':
              premium = Math.max((vehicleValueNum * 0.08) + (30000 * numberOfSeatsNum), 500000);
              break;
            case 'busesPrivate':
              premium = Math.max((vehicleValueNum * 0.05) + (10000 * numberOfSeatsNum), 500000);
              break;
            case 'busesSchool':
              premium = Math.max((vehicleValueNum * 0.05) + (7500 * numberOfSeatsNum), 500000);
              break;
            default:
              return <div className="text-green-400 font-medium">Our Team will contact you shortly</div>;
          }
          break;
        default:
          return <div className="text-green-400 font-medium">Our Team will contact you shortly</div>;
      }
      if (excessBuyBack) {
        premium = premium * 1.10;
      }
    } else if (coverageType === 'thirdParty') {
      switch (vehicleUsage) {
        case 'privateCars':
          premium = 100000;
          break;
        case 'privateTwoCycle':
          premium = 50000;
          break;
        case 'bodaboda':
          premium = 50000 + 15000;
          break;
        case 'bajaji':
          premium = 75000 + 45000;
          break;
        case 'passageCarrying':
          switch (passengerServiceType) {
            case 'publicTaxis':
              premium = 15000 * numberOfSeatsNum;
              break;
            case 'daladalacity':
              premium = 15000 * numberOfSeatsNum;
              break;
            case 'busesUpcountry':
              premium = 30000 * numberOfSeatsNum;
              break;
            case 'busesPrivate':
              premium = 10000 * numberOfSeatsNum;
              break;
            case 'busesSchool':
              premium = 7500 * numberOfSeatsNum;
              break;
            default:
              return <div className="text-green-400 font-medium">Our Team will contact you shortly</div>;
          }
          break;
        default:
          return <div className="text-green-400 font-medium">Our Team will contact you shortly</div>;
      }
    } else if (coverageType === 'thirdPartyFire') {
      if (vehicleUsage === 'passageCarrying') {
        return <div className="text-green-400 font-medium">Not available for Passenger Carrying</div>;
      }
      switch (vehicleUsage) {
        case 'privateCars':
          premium = 100000 + (vehicleValueNum * 0.02);
          break;
        case 'privateTwoCycle':
          premium = Math.max(50000 + (vehicleValueNum * 0.035), 100000);
          break;
        case 'bodaboda':
          premium = Math.max(65000 + (vehicleValueNum * 0.035), 100000);
          break;
        case 'bajaji':
          premium = Math.max(75000 + (vehicleValueNum * 0.035), 100000);
          break;
        default:
          return <div className="text-green-400 font-medium">Our Team will contact you shortly</div>;
      }
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
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Motor Insurance Details</h3>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Coverage Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Type</label>
            <select
              name="coverageType"
              value={localData.coverageType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Coverage Type</option>
              <option value="comprehensive">Comprehensive</option>
              <option value="thirdParty">Third Party</option>
              <option value="thirdPartyFire">Third Party, Fire & Theft</option>
              <option value="unsure">Not Sure (Need Advice)</option>
            </select>
          </div>

          {/* Vehicle Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Vehicle Value (TZS)</label>
            <input
              type="number"
              name="vehicleValue"
              value={localData.vehicleValue}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Vehicle Usage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Usage</label>
            <select
              name="vehicleUsage"
              value={localData.vehicleUsage}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Vehicle Usage</option>
              <option value="privateCars">Private Cars</option>
              <option value="commercialVehicle">Commercial Vehicle</option>
              <option value="passageCarrying">Passenger Carrying</option>
              <option value="privateTwoCycle">Private Two Cycle</option>
              <option value="bodaboda">Bodaboda</option>
              <option value="bajaji">Bajaji</option>
              <option value="specialVehicle">Special Vehicle (Tractors etc)</option>
            </select>
          </div>
        </div>

        {/* Excess Buy Back - Only show for Comprehensive */}
        {localData.coverageType === 'comprehensive' && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="excessBuyBack"
              name="excessBuyBack"
              checked={localData.excessBuyBack}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="excessBuyBack" className="ml-2 text-sm text-gray-700">
              Excess buy back
            </label>
          </div>
        )}

        {/* Passenger Service Type - Only show for Passage Carrying */}
        {localData.vehicleUsage === 'passageCarrying' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Passenger Service Type</label>
              <select
                name="passengerServiceType"
                value={localData.passengerServiceType || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Service Type</option>
                <option value="publicTaxis">Public Taxis, private hire, tour operators</option>
                <option value="daladalacity">Buses - Daladala within the city</option>
                <option value="busesUpcountry">Buses - Up country</option>
                <option value="busesPrivate">Buses - Private</option>
                <option value="busesSchool">Buses - School</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Seats</label>
              <input
                type="number"
                name="numberOfSeats"
                value={localData.numberOfSeats || ''}
                onChange={handleInputChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        )}

        {/* Commercial Vehicle Options */}
        {localData.vehicleUsage === 'commercialVehicle' && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Commercial Vehicle Type</h4>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="truck"
                  name="truck"
                  checked={localData.truck}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="truck" className="ml-2 text-sm text-gray-700">
                  Truck
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="trailer"
                  name="trailer"
                  checked={localData.trailer}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="trailer" className="ml-2 text-sm text-gray-700">
                  Trailer
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Premium Calculation */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Premium Calculation</h4>
          {calculatePremium()}
        </div>

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

export default Step2Motor;