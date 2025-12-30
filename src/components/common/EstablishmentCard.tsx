import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Heart } from 'lucide-react';
import type { EstablishmentType as EstablishmentCardType } from '@/types/establishmentCard';
import { useState } from 'react';

interface EstablishmentCardProps {
  establishment: EstablishmentCardType;
}

const EstablishmentCard = ({ establishment }: EstablishmentCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col h-full">
      <div className="relative w-full h-48 overflow-hidden bg-gray-200 group">
        <img
          src={establishment.coverPhoto}
          alt={establishment.name}
          className="w-full h-full object-cover transition-transform"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all duration-200 hover:scale-110"
          aria-label="Add to favorites"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="grid gap-3 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
              {establishment.name}
            </h2>
          </div>

          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex items-start gap-1">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p className="line-clamp-2 flex-1">{establishment.address}</p>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <p className="text-xs">Open now • Closes at 10:00 PM</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {establishment.features.slice(0, 3).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 text-xs"
                >
                  <Icon size={12} />
                  <span>{feature.title}</span>
                </Badge>
              );
            })}
            {establishment.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{establishment.features.length - 3}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">
                {establishment.rating}
              </span>
              <span className="text-xs text-gray-500">
                ({establishment.reviews})
              </span>
            </div>
          </div>
          <Button variant="orange" size="sm" className="font-medium">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EstablishmentCard;
