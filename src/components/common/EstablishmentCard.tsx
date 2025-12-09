import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapIcon } from 'lucide-react';
import type { EstablishmentCard as EstablishmentCardType } from '@/types/establishmentCard';

interface EstablishmentCardProps {
  establishment: EstablishmentCardType;
}

const EstablishmentCard = ({ establishment }: EstablishmentCardProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative w-full h-48 overflow-hidden bg-gray-200">
        <img
          src={establishment.image}
          alt={establishment.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl text-(--secondary-color) line-clamp-1">
              {establishment.title}
            </h2>
            <Badge variant="secondary" className="whitespace-nowrap">
              {establishment.type}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <MapIcon />
              <p className="line-clamp-1">{establishment.location}</p>
            </div>
            <p className="whitespace-nowrap ml-2">
              {formatTime(establishment.workingHours)}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {establishment.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <Icon size={14} />
                  <span className="text-xs">{feature.title}</span>
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">
                {establishment.rating}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {establishment.reviews} reviews
            </p>
          </div>
          <Button variant="orange">Book</Button>
        </div>
      </div>
    </div>
  );
};

export default EstablishmentCard;
