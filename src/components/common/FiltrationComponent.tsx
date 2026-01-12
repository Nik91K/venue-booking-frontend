import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { X, SlidersHorizontal } from 'lucide-react';
import type { EstablishmentType } from '@/types/establishmentCard';

type FiltrationProps = {
  establishment: EstablishmentType[];
  setEstablishment: React.Dispatch<React.SetStateAction<EstablishmentType[]>>;
};

const FiltrationComponent = ({
  establishment,
  setEstablishment,
}: FiltrationProps) => {
  const [rating, setRating] = useState('all');

  const cuisines = [
    'Italian',
    'Chinese',
    'Japanese',
    'Mexican',
    'Indian',
    'American',
    'French',
    'Thai',
    'Mediterranean',
  ];

  const handleReset = () => {
    setRating('all');
  };

  const handleApplyFilters = () => {
    const numericRating = rating === 'all' ? 0 : parseFloat(rating);
    const filtered = establishment.filter(est => est.rating >= numericRating);
    setEstablishment(filtered);
  };

  const hasActiveFilters = rating !== 'all';

  return (
    <div className="w-3xs bg-(--primary-background-light) rounded-lg p-4 space-y-6">
      <div className="flex items-center justify-between min-h-10">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        {hasActiveFilters && (
          <Button size="sm" onClick={handleReset}>
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Rating</Label>
        <RadioGroup value={rating} onValueChange={setRating}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="rating-all" />
            <Label htmlFor="rating-all" className="font-normal cursor-pointer">
              All Ratings
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4.5" id="rating-4.5" />
            <Label htmlFor="rating-4.5" className="font-normal cursor-pointer">
              4.5+ ⭐
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4.0" id="rating-4.0" />
            <Label htmlFor="rating-4.0" className="font-normal cursor-pointer">
              4.0+ ⭐
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3.5" id="rating-3.5" />
            <Label htmlFor="rating-3.5" className="font-normal cursor-pointer">
              3.5+ ⭐
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-3">
        <Label className="text-sm font-medium">Cuisine Type</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {cuisines.map(cuisine => (
            <div key={cuisine} className="flex items-center space-x-2">
              <Checkbox id={`cuisine-${cuisine}`} />
              <Label
                htmlFor={`cuisine-${cuisine}`}
                className="font-normal cursor-pointer"
              >
                {cuisine}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Button
        className="w-full"
        size="lg"
        variant="secondary"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default FiltrationComponent;
