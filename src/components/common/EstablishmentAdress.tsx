import type { LocationDetails } from '@/types/establishment';
import { MapPin, Copy } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { useEffect, useState } from 'react';
import { Button } from '@components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@components/ui/drawer';

type Props = {
  address: string;
  locationDetails: LocationDetails;
};

const AddressField = ({ label, value }: { label: string; value: string }) => (
  <p>
    <span className="text-gray-500">{label}: </span>
    {value}
  </p>
);

const EstablishmentAddress = ({ address, locationDetails }: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const moboleCheck = () => setIsMobile(window.innerWidth < 768);
    moboleCheck();
    window.addEventListener('resize', moboleCheck);
    return () => window.removeEventListener('resize', moboleCheck);
  }, []);

  return (
    <>
      {isMobile ? (
        <Drawer>
          <DrawerTrigger asChild>
            <div className="flex items-start gap-3 cursor-pointer">
              <MapPin className="w-5 h-5 shrink-0 mt-1" />
              <div className="flex flex-col">
                <p className="font-medium">Address</p>
                <p className="text-gray-300">{address}</p>
              </div>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <div className="flex items-center justify-between">
                <DrawerTitle>Full address</DrawerTitle>

                <Button
                  variant="secondary"
                  onClick={() => navigator.clipboard.writeText(address)}
                >
                  <Copy />
                </Button>
              </div>
            </DrawerHeader>

            <div className="px-4 pb-4 text-sm">
              <AddressField label="City" value={locationDetails.city || ''} />
              <AddressField
                label="Street"
                value={locationDetails.street || ''}
              />
              <AddressField
                label="Zip Code"
                value={locationDetails.zipCode || ''}
              />
            </div>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="secondary">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="line-clamp-2 flex-1">{address}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="px-4 pb-4 text-sm">
                <AddressField label="City" value={locationDetails.city || ''} />
                <AddressField
                  label="Street"
                  value={locationDetails.street || ''}
                />
                <AddressField
                  label="Zip Code"
                  value={locationDetails.zipCode || ''}
                />
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};

export default EstablishmentAddress;
