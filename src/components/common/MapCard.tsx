import { motion } from 'motion/react';
import MapComponent from '@components/common/map/Map';
import MapProvider from '@components/common/map/MapProvider';
import { fadeInUp } from '@/lib/motion';
import { defaultViewport } from '@/lib/motion';
import { cn } from '@/lib/utils';

type MapCardProps = {
  mapLabel?: string;
  caption?: string;
  className?: string;
};

export const MapCard = ({
  mapLabel = 'Google Maps Integration',
  caption = 'Live availability · Real venues',
  className,
}: MapCardProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      custom={1}
      variants={fadeInUp}
      className={cn(
        'rounded-xl border p-6 flex flex-col gap-4 border-1 border-stale-900',
        className
      )}
    >
      <div className="w-full rounded-lg overflow-hidden relative flex items-center justify-center aspect-3/2">
        <MapProvider>
          <div className="w-full h-full">
            <MapComponent />
          </div>
        </MapProvider>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase px-4 py-2 rounded">
          {mapLabel}
        </div>
      </div>
      {caption && (
        <p className="text-center text-xs text-muted-foreground tracking-wide uppercase">
          {caption}
        </p>
      )}
    </motion.div>
  );
};
