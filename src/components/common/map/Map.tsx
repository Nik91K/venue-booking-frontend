import { Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';
import { useMapContext } from '@components/common/map/MapProvider';
import { MapPin } from 'lucide-react';

type MapProps = {
  center?: { lat: number; lng: number };
  zoom?: number;
};

const MapComponent: React.FC<MapProps> = ({
  center = { lat: 40.7128, lng: -74.006 },
  zoom = 12,
}) => {
  const [userCenter, setUserCenter] = useState(center);
  const { establishments, selectedId, setSelectedId } = useMapContext();

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        setUserCenter({ lat: coords.latitude, lng: coords.longitude }),
      () => setUserCenter(center)
    );
  }, [center]);

  const mapped = establishments.filter(est => {
    const lat = Number(est.lat);
    const lng = Number(est.lng);

    return !isNaN(lat) && !isNaN(lng);
  });

  const selected = mapped.find(e => e.id === selectedId);

  return (
    <Map
      style={{ width: '100%', height: '100%' }}
      defaultCenter={userCenter}
      defaultZoom={zoom}
      gestureHandling="greedy"
      mapId="venues-map"
    >
      {mapped.map(est => {
        const lat = Number(est.lat);
        const lng = Number(est.lng);

        return (
          <AdvancedMarker
            key={est.id}
            position={{
              lat,
              lng,
            }}
            onClick={() => setSelectedId(est.id === selectedId ? null : est.id)}
          >
            <div className="bg-white border-2 border-rose-500 rounded-full p-1 shadow-md cursor-pointer hover:scale-110 transition-transform">
              <MapPin className="w-4 h-4 text-rose-500" />
            </div>
          </AdvancedMarker>
        );
      })}

      {selected && selected.lat != null && selected.lng != null && (
        <InfoWindow
          position={{
            lat: Number(selected.lat),
            lng: Number(selected.lng),
          }}
          onCloseClick={() => setSelectedId(null)}
        >
          <div className="p-1 max-w-[200px]">
            <img
              src={selected.coverPhoto}
              alt={selected.name}
              className="w-full h-20 object-cover rounded mb-2"
            />
            <p className="font-semibold text-sm">{selected.name}</p>
            <p className="text-xs text-gray-500">{selected.address}</p>
            <p className="text-xs text-yellow-500 mt-1">{selected.rating}</p>
          </div>
        </InfoWindow>
      )}
    </Map>
  );
};

export default MapComponent;
