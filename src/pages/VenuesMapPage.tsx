import LayoutPage from '@/layoutPage';
import MapComponent from '@/components/common/map/Map';
import MapProvider from '@/components/common/map/MapProvider';
import EstablishmentCard from '@/components/common/EstablishmentCard';
import FiltrationComponent from '@/components/common/FiltrationComponent';
import { ESTABLISHMENT_CARD } from '@/fixtures/establishmentCard.fixture';
import { Button } from '@/components/ui/button';
import { Heart, Search } from 'lucide-react';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group';

const VenuesMapPage = () => {
  return (
    <LayoutPage>
      <div>
        <MapProvider>
          <div className="w-full h-96">
            <MapComponent />
          </div>
        </MapProvider>
        <div className="flex justify-around">
          <div>
            <div className="flex items-center justify-around m-2 gap-2">
              <InputGroup>
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
              </InputGroup>
              <Button className="cursor-pointer" variant={'default'}>
                <Heart color="#f66151" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 m-2">
              {ESTABLISHMENT_CARD.map(establishment => (
                <EstablishmentCard establishment={establishment} />
              ))}
            </div>
          </div>
          <div>
            <FiltrationComponent />
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default VenuesMapPage;
