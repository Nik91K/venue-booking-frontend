import { APIProvider } from '@vis.gl/react-google-maps';
import React from 'react';

const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API;

  return <APIProvider apiKey={API_KEY}>{children}</APIProvider>;
};

export default MapProvider;
