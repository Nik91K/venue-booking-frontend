import { APIProvider } from '@vis.gl/react-google-maps';
import React from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API;

const MapProvider = ({ children }: { children: React.ReactNode }) => {
  return <APIProvider apiKey={API_KEY}>{children}</APIProvider>;
};

export default MapProvider;
