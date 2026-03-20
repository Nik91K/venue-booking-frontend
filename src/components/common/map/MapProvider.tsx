import { APIProvider } from '@vis.gl/react-google-maps';
import React, { createContext, useContext, useState } from 'react';
import type { EstablishmentType } from '@/types/establishment';

type MapContextType = {
  establishments: EstablishmentType[];
  setEstablishments: (e: EstablishmentType[]) => void;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
};

const MapContext = createContext<MapContextType | null>(null);

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API;

export const useMapContext = () => {
  const ctx = useContext(MapContext);
  if (!ctx) {
    throw new Error('useMapContext must be used within MapProvider');
  }
  return ctx;
};

const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [establishments, setEstablishments] = useState<EstablishmentType[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <MapContext.Provider
      value={{ establishments, setEstablishments, selectedId, setSelectedId }}
    >
      <APIProvider apiKey={API_KEY}>{children}</APIProvider>
    </MapContext.Provider>
  );
};

export default MapProvider;
