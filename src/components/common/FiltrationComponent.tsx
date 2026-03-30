import { useState } from 'react';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { X, SlidersHorizontal } from 'lucide-react';
import { getAllEstablishmentTypes } from '@api/slices/establishmentTypeSlice';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { useEffect } from 'react';
import { convertError } from '@hooks/logger/errorConverter';
import { addError } from '@api/slices/errorSlice';

type FiltrationProps = {
  onFilter: (filters: { minRating?: number; typeId?: number }) => void;
};

const FiltrationComponent = ({ onFilter }: FiltrationProps) => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState('all');
  const [typeId, setTypeId] = useState<number | undefined>(undefined);
  const { establishmentType, loading, error } = useAppSelector(
    state => state.establishmentType
  );

  useEffect(() => {
    if (error) {
      dispatch(addError(convertError(error)));
    }
  }, [error, dispatch]);

  const handleReset = () => {
    onFilter({});
    setTypeId(undefined);
    setRating('all');
  };

  const handleApplyFilters = () => {
    onFilter({
      minRating: rating === 'all' ? undefined : parseFloat(rating),
      typeId,
    });
  };

  const hasActiveFilters = rating !== 'all';

  useEffect(() => {
    if (establishmentType.length == 0 && !loading && !error) {
      dispatch(getAllEstablishmentTypes());
    }
  }, [dispatch, establishmentType.length, loading, error]);

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
              4.5+
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4.0" id="rating-4.0" />
            <Label htmlFor="rating-4.0" className="font-normal cursor-pointer">
              4.0+
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3.5" id="rating-3.5" />
            <Label htmlFor="rating-3.5" className="font-normal cursor-pointer">
              3.5+
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-3">
        <Label className="text-sm font-medium">Type</Label>
        <RadioGroup
          value={typeId?.toString() ?? 'all'}
          onValueChange={val =>
            setTypeId(val === 'all' ? undefined : parseInt(val))
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="type-all" />
            <Label htmlFor="type-all" className="font-normal cursor-pointer">
              All Types
            </Label>
          </div>
          {establishmentType.map(type => (
            <div key={type.id} className="flex items-center space-x-2">
              <RadioGroupItem
                value={type.id.toString()}
                id={`type-${type.id}`}
              />
              <Label
                htmlFor={`type-${type.id}`}
                className="font-normal cursor-pointer"
              >
                {type.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
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
