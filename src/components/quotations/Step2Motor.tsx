import React from 'react';

type Step2MotorProps = {
  formData: {
    vehicleValue: string;
    vehicleUsage: string;
    coverageType: string;
    excessBuyBack?: boolean;
    truck?: boolean;
    trailer?: boolean;
    numberOfSeats?: string;
    passengerServiceType?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setStep: (step: number) => void;
};

const Step2Motor: React.FC<Step2MotorProps> = ({ formData, onChange, setStep }) => {
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // Add safety check for onChange function
    if (typeof onChange !== 'function') {
      console.error('onChange prop is not a function');
      return;
    }

    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      // Create a proper synthetic event for checkbox with string value
      const syntheticEvent = {
        target: {
          name,
          value: checked.toString(), // Convert boolean to string
          type,
          checked // Keep the checked property for compatibility
        }
      } as any; // Use any to avoid strict type checking issues
      onChange(syntheticEvent);
    } else {
      onChange(e);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Motor Insurance Details</h3>
      
      <div className="space-y-4">
        <div className="mb-4">
          <label htmlFor="coverageType" className="block text-sm font-medium text-gray-700 mb-1">
            Coverage Type
          </label>
          <select
            id="coverageType"
            name="coverageType"
            value={formData.coverageType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select coverage type</option>
            <option value="comprehensive">Comprehensive (Full Coverage)</option>
            <option value="thirdParty">Third Party Only</option>
            <option value="thirdPartyFire">Third Party, Fire & Theft</option>
            <option value="unsure">Not Sure (Need Advice)</option>
          </select>
        </div>

        {/* Excess Buy Back - Only show for Comprehensive coverage */}
        {formData.coverageType === 'comprehensive' && (
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="excessBuyBack"
                name="excessBuyBack"
                checked={formData.excessBuyBack || false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="excessBuyBack" className="ml-3 text-sm font-medium text-gray-700">
                Excess buy back
              </label>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="vehicleValue" className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Vehicle Value (TZS)
            </label>
            <input
              type="number"
              id="vehicleValue"
              name="vehicleValue"
              value={formData.vehicleValue}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter estimated value"
            />
          </div>
          
          <div>
            <label htmlFor="vehicleUsage" className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Usage
            </label>
            <select
              id="vehicleUsage"
              name="vehicleUsage"
              value={formData.vehicleUsage}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select vehicle usage</option>
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

        {/* Passenger Service Type - Only show for Passenger Carrying */}
        {formData.vehicleUsage === 'passageCarrying' && (
          <div className="mt-4">
            <label htmlFor="passengerServiceType" className="block text-sm font-medium text-gray-700 mb-1">
              Passenger Service Type
            </label>
            <select
              id="passengerServiceType"
              name="passengerServiceType"
              value={formData.passengerServiceType || ''}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select passenger service type</option>
              <option value="publicTaxis">Public Taxis, private hire, tour operators</option>
              <option value="daladalacity">Buses - Daladala within the city</option>
              <option value="busesUpcountry">Buses - Up country</option>
              <option value="busesPrivate">Buses - Private</option>
              <option value="busesSchool">Buses - School</option>
            </select>
          </div>
        )}

        {/* Number of Seats - Only show for Passenger Carrying */}
        {formData.vehicleUsage === 'passageCarrying' && (
          <div className="mt-4">
            <label htmlFor="numberOfSeats" className="block text-sm font-medium text-gray-700 mb-1">
              Number of seats
            </label>
            <input
              type="number"
              id="numberOfSeats"
              name="numberOfSeats"
              value={formData.numberOfSeats || ''}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter number of seats"
            />
          </div>
        )}

        {/* Commercial Vehicle Options - Only show for Commercial Vehicle */}
        {formData.vehicleUsage === 'commercialVehicle' && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-gray-800 font-medium mb-3">Commercial Vehicle Type</h4>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="truck"
                  name="truck"
                  checked={formData.truck || false}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="truck" className="ml-3 text-sm font-medium text-gray-700">
                  Truck
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="trailer"
                  name="trailer"
                  checked={formData.trailer || false}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="trailer" className="ml-3 text-sm font-medium text-gray-700">
                  Trailer
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Premium Calculation Section */}
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Premium Calculation
          </h3>
          {renderPremiumCalculation()}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition duration-200 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
          >
            Next Step
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  function renderPremiumCalculation() {
    const { coverageType, vehicleUsage, vehicleValue, excessBuyBack, truck, trailer, numberOfSeats, passengerServiceType } = formData;
    const vehicleValueNum = parseFloat(vehicleValue) || 0;
    const numberOfSeatsNum = parseInt(numberOfSeats || '0') || 0;

    // If any required field is missing, show message to complete form
    if (!coverageType || !vehicleUsage || !vehicleValue) {
      return (
        <div className="text-gray-500 italic flex items-center">
          <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Please fill in all fields above to see premium calculation
        </div>
      );
    }

    // Special handling for Passenger Carrying - check for required fields
    if (vehicleUsage === 'passageCarrying') {
      if (!passengerServiceType || !numberOfSeats) {
        return (
          <div className="text-gray-500 italic flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Please fill in all fields above to see premium calculation
          </div>
        );
      }
    }

    // Special handling for Commercial Vehicle
    if (vehicleUsage === 'commercialVehicle') {
      // If truck or trailer is selected, show contact message
      if (truck || trailer) {
        return (
          <div className="text-blue-600 font-medium flex items-center bg-blue-100 p-3 rounded-md">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Our Team will contact you shortly, Please proceed to the next step
          </div>
        );
      }
      // If commercial vehicle is selected but no truck/trailer option chosen
      return (
        <div className="text-amber-600 font-medium flex items-center bg-amber-100 p-3 rounded-md">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          Please select truck and/or trailer options above to proceed
        </div>
      );
    }

    // Check for other unsupported combinations (excluding passageCarrying now)
    if (['specialVehicle'].includes(vehicleUsage) || coverageType === 'unsure') {
      return (
        <div className="text-blue-600 font-medium flex items-center bg-blue-100 p-3 rounded-md">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Our Team will contact you shortly, Please proceed to the next step
        </div>
      );
    }

    let premium = 0;

    // Calculate premium based on coverage type and vehicle usage
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
              return (
                <div className="text-blue-600 font-medium flex items-center bg-blue-100 p-3 rounded-md">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Our Team will contact you shortly, Please proceed to the next step
                </div>
              );
          }
          break;
        default:
          return (
            <div className="text-blue-600 font-medium flex items-center bg-blue-100 p-3 rounded-md">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Our Team will contact you shortly, Please proceed to the next step
            </div>
          );
      }
      
      // Apply 10% loading if Excess Buy Back is selected
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
              return (
                <div className="text-blue-600 font-medium flex items-center bg-blue-100 p-3 rounded-md">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Our Team will contact you shortly, Please proceed to the next step
                </div>
              );
          }
          break;
        default:
          return (
            <div className="text-blue-600 font-medium flex items-center bg-blue-100 p-3 rounded-md">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Our Team will contact you shortly, Please proceed to the next step
          </div>
        );
      }
    } else if (coverageType === 'thirdPartyFire') {
      if (vehicleUsage === 'passageCarrying') {
        return (
          <div className="text-red-600 font-medium flex items-center bg-red-100 p-3 rounded-md">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            We don't cover Passenger Carrying for Third Party, Fire & Theft
          </div>
        );
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
          return (
            <div className="text-blue-600 font-medium flex items-center bg-blue-100 p-3 rounded-md">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Our Team will contact you shortly, Please proceed to the next step
          </div>
        );
      }
    }

    const vat = premium * 0.18;
    const totalPremium = premium + vat;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
            <div className="text-gray-500 text-sm mb-1 font-medium">Premium</div>
            <div className="text-gray-800 text-lg font-bold">
              {premium.toLocaleString()} TZS
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
            <div className="text-gray-500 text-sm mb-1 font-medium">VAT (18%)</div>
            <div className="text-gray-800 text-lg font-bold">
              {vat.toLocaleString()} TZS
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg shadow-md">
            <div className="text-blue-100 text-sm mb-1 font-medium">Total Premium</div>
            <div className="text-white text-lg font-bold">
              {totalPremium.toLocaleString()} TZS
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Step2Motor;