import LayoutPage from '@/layoutPage';
import MapComponent from '@/components/common/map/Map';
import MapProvider from '@/components/common/map/MapProvider';

const VenuesMapPage = () => {
  return (
    <LayoutPage>
      <MapProvider>
        <div className="w-6xl h-96">
          <MapComponent />
        </div>
      </MapProvider>
    </LayoutPage>
  );
};

export default VenuesMapPage;
