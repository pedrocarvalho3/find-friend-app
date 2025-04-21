import React, { createContext, useContext, useState } from "react";

type LocationContextType = {
  state: string;
  city: string;
  setState: (value: string) => void;
  setCity: (value: string) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");

  return (
    <LocationContext.Provider value={{ state, city, setState, setCity }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
