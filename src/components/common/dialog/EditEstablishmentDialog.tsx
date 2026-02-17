import type {
  EstablishmentType,
  UpdateEstablishmentType,
} from '@/types/establishment';
import { useEffect, useState } from 'react';
import AlertDialogConponent from '@components/common/dialog/AlertDialog';

import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Label } from '@components/ui/label';
import { Separator } from '@components/ui/separator';

type Props = {
  establishment: EstablishmentType;
  onUpdate: (id: number, data: UpdateEstablishmentType) => void;
};

export const EditEstablishmentDialog = ({ establishment, onUpdate }: Props) => {
  const [data, setData] = useState<UpdateEstablishmentType | null>(null);

  useEffect(() => {
    setData({
      name: establishment.name,
      description: establishment.description,
      totalSeats: establishment.totalSeats,
      coverPhoto: establishment.coverPhoto,
      photos: establishment.photos,
      type: establishment.type,
      address: establishment.address,
      locationDetails: establishment.locationDetails ?? {
        city: '',
        street: '',
        building: '',
        zipCode: '',
      },
    });
  }, [establishment]);

  const handleChange = <K extends keyof UpdateEstablishmentType>(
    field: K,
    value: UpdateEstablishmentType[K]
  ) => {
    setData(prev => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleLocationChange = (
    field: keyof NonNullable<UpdateEstablishmentType['locationDetails']>,
    value: string
  ) => {
    setData(data => {
      if (!data) return data;
      return {
        ...data,
        locationDetails: {
          city: data.locationDetails?.city ?? '',
          street: data.locationDetails?.street ?? '',
          building: data.locationDetails?.building ?? '',
          zipCode: data.locationDetails?.zipCode ?? '',
          [field]: value,
        },
      };
    });
  };

  const handleSubmit = () => {
    if (data) {
      onUpdate(establishment.id, data);
    }
  };

  if (!data) return null;

  return (
    <AlertDialogConponent
      triggerText="Edit Establishment"
      title={`Edit ${establishment.name}`}
      description="Edit the details"
      actionText="Save"
      onAction={handleSubmit}
      triggerClassName="w-full text-center"
    >
      <form className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Info</h3>

          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={data.name}
              onChange={e => handleChange('name', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={data.description}
              onChange={e => handleChange('description', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Total Seats</Label>
            <Input
              type="number"
              value={data.totalSeats}
              onChange={e => handleChange('totalSeats', Number(e.target.value))}
            />
          </div>
        </div>

        <Separator />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Location</h3>

          <Input
            placeholder="Address"
            value={data.address}
            onChange={e => handleChange('address', e.target.value)}
          />

          <Input
            placeholder="City"
            value={data.locationDetails?.city ?? ''}
            onChange={e => handleLocationChange('city', e.target.value)}
          />

          <Input
            placeholder="Street"
            value={data.locationDetails?.street ?? ''}
            onChange={e => handleLocationChange('street', e.target.value)}
          />

          <Input
            placeholder="Building"
            value={data.locationDetails?.building ?? ''}
            onChange={e => handleLocationChange('building', e.target.value)}
          />

          <Input
            placeholder="Zip Code"
            value={data.locationDetails?.zipCode ?? ''}
            onChange={e => handleLocationChange('zipCode', e.target.value)}
          />
        </div>
        <Separator />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Media</h3>

          <Input
            placeholder="Cover photo URL"
            value={data.coverPhoto}
            onChange={e => handleChange('coverPhoto', e.target.value)}
          />

          <Textarea
            placeholder="Photos (comma separated)"
            value={data.photos.join(', ')}
            onChange={e =>
              handleChange(
                'photos',
                e.target.value.split(',').map(p => p.trim())
              )
            }
          />
        </div>
      </form>
    </AlertDialogConponent>
  );
};

export default EditEstablishmentDialog;
