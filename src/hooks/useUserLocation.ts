import { useEffect, useState } from 'react';

export const useUserLocation = () => {
  const [coords, setCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos =>
      setCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
    );
  }, []);
  return coords;
};
