import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineLocationMarker, HiSearch } from 'react-icons/hi';
import { useDeliveryLocation } from '../../../../context/LocationContext';
import { Button } from '../../../common/Button/Button';

const LocationModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { updateLocation } = useDeliveryLocation();

  // Mock locations data - replace with API call
  const locations = [
    { id: '1', area: 'Koramangala', pincode: '560034' },
    { id: '2', area: 'Indiranagar', pincode: '560038' },
    { id: '3', area: 'HSR Layout', pincode: '560102' },
    { id: '4', area: 'Whitefield', pincode: '560066' },
  ];

  const filteredLocations = locations.filter(
    location => 
      location.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.pincode.includes(searchQuery)
  );

  const handleLocationSelect = (location) => {
    updateLocation(location);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg max-w-md w-full">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Select Your Location
            </h3>
            
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                placeholder="Search for area or pincode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredLocations.map((location) => (
                <button
                  key={location.id}
                  className="w-full p-3 flex items-center text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => handleLocationSelect(location)}
                >
                  <HiOutlineLocationMarker className="text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{location.area}</p>
                    <p className="text-sm text-gray-500">{location.pincode}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                variant="secondary"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LocationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LocationModal;
