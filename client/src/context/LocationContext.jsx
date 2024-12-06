import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

const useLocation = () => {
  return useContext(LocationContext);
};

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    const savedLocation = localStorage.getItem('userLocation');
    return savedLocation ? JSON.parse(savedLocation) : null;
  });

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem('userLocation', JSON.stringify(newLocation));
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        updateLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export { useLocation, LocationProvider };
