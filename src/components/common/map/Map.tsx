import { Map } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';

type MapProps = {
  center?: { lat: number; lng: number };
  zoom?: number;
  children?: React.ReactNode;
};

const MapComponent: React.FC<MapProps> = ({
  center = { lat: 40.7128, lng: -74.006 },
  zoom = 12,
  children,
}) => {
  const defaultCenter = center;

  const [userCenter, setUserCenter] = useState(defaultCenter);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        setUserCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setUserCenter(center);
      }
    );
  }, [center]);

  return (
    <Map
      style={{ width: '100%', height: '100%' }}
      defaultCenter={userCenter}
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
