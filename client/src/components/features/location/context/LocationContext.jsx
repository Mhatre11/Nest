import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  return useContext(LocationContext);
};

export const LocationProvider = ({ children }) => {
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
