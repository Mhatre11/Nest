import React, { useState } from 'react';
import { Modal, TextInput, Button } from 'flowbite-react';
import { HiOutlineSearch, HiOutlineLocationMarker } from 'react-icons/hi';
import { useLocation } from '../../context/LocationContext';

const LocationModal = ({ isOpen, onClose }) => {
  const locationContext = useLocation();
  
  // Return early if context is not initialized
  if (!locationContext) {
    console.error('Location context not initialized');
    return null;
  }

  const { updateLocation } = locationContext;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Mock locations data - replace with your actual locations data or API call
  const locations = [
    { id: 1, area: 'Andheri West', city: 'Mumbai', pincode: '400053' },
    { id: 2, area: 'Bandra West', city: 'Mumbai', pincode: '400050' },
    { id: 3, area: 'Powai', city: 'Mumbai', pincode: '400076' },
    { id: 4, area: 'Malad West', city: 'Mumbai', pincode: '400064' },
    { id: 5, area: 'Thane West', city: 'Thane', pincode: '400601' },
  ];

  const filteredLocations = locations.filter(location => 
    location.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.pincode.includes(searchQuery)
  );

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      updateLocation(selectedLocation);
      onClose();
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <Modal.Header>Select Delivery Location</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="text-gray-400" />
            </div>
            <TextInput
              type="text"
              placeholder="Enter area or pincode"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Locations List */}
          <div className="max-h-60 overflow-y-auto space-y-2">
            {filteredLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className={`w-full p-3 text-left rounded-lg transition-colors duration-200 ${
                  selectedLocation?.id === location.id
                    ? 'bg-blue-50 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <HiOutlineLocationMarker className="text-xl text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">{location.area}</p>
                    <p className="text-sm text-gray-500">
                      {location.city}, {location.pincode}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="w-full">
          <Button
            gradientDuoTone="greenToBlue"
            className="w-full"
            onClick={handleConfirm}
            disabled={!selectedLocation}
          >
            Confirm Location
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default LocationModal;
