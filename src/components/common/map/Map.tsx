import { Map } from '@vis.gl/react-google-maps';
import React from 'react';

type MapProps = {
  center?: { lat: number; lng: number };
  zoom?: number;
  children?: React.ReactNode;
};

const MapComponent: React.FC<MapProps> = ({
  center = { lat: 40.7128, lng: -74.006 }, // Default center (New York)
  zoom = 12,
  children,
}) => {
  return (
    <Map
      tyle={{ width: '100%', height: '100%' }}
      defaultCenter={center}
      defaultZoom={zoom}
      gestureHandling="greedy"
      disableDefaultUI={false}
      options={{
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      }}
    >
      {children}
    </Map>
  );
};

export default MapComponent;
