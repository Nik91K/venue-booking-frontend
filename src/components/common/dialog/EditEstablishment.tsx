import type {
  EstablishmentType,
  UpdateEstablishmentType,
  VenueType,
} from '@/types/establishment';
import { useState } from 'react';
import DialogComponent from '@/components/common/dialog/DialogComponent';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Separator } from '@components/ui/separator';
import EstablishmentLocationForm from '@components/common/forms/EstablishmentLocationForm';
import FormFieldGroup from '@components/common/forms/FormFieldGroup';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

type Props = {
  establishment: EstablishmentType;
  onUpdate: (id: number, data: UpdateEstablishmentType) => void;
  establishmentTypes: VenueType[];
};

export const EditEstablishmentDialog = ({
  establishment,
  onUpdate,
  establishmentTypes,
}: Props) => {
  const [data, setData] = useState({
    name: establishment.name,
    description: establishment.description,
    totalSeats: establishment.totalSeats,
    typeId: establishment.type.id,
    locationDetails: {
      city: establishment.locationDetails?.city,
      street: establishment.locationDetails?.street,
      building: establishment.locationDetails?.building,
      zipCode: establishment.locationDetails?.zipCode,
    },
  });
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);

  const handleSubmit = async () => {
    onUpdate(establishment.id, {
      name: data.name,
      description: data.description,
      totalSeats: Number(data.totalSeats),
      typeId: data.typeId,
      city: data.locationDetails.city,
      street: data.locationDetails.street,
      building: data.locationDetails.building,
      zipCode: data.locationDetails.zipCode,
      coverPhoto,
      photos,
    });
  };

  const handleChange = (field: keyof typeof data, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      locationDetails: {
        ...prev.locationDetails,
        [field]: value,
      },
    }));
  };

  return (
    <DialogComponent
      triggerText="Edit Establishment"
      headerTitle={`Edit ${establishment.name}`}
      headerDescription="Edit the details"
      submitText="Save"
      onSubmit={handleSubmit}
      cancelText="Cancel"
    >
      <form className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Info</h3>

          <FormFieldGroup
            label="Name"
            value={data.name}
            onChange={value => handleChange('name', value)}
            placeholder="Enter the name of the establishment"
          />

          <FormFieldGroup
            label="Description"
            value={data.description}
            onChange={value => handleChange('description', value)}
            placeholder="Enter the description of the establishment"
          />

          <FormFieldGroup
            label="Total Seats"
            value={data.totalSeats.toString()}
            onChange={value => handleChange('totalSeats', value)}
            placeholder="Enter the total number of seats"
          />
        </div>

        <Separator />
        <EstablishmentLocationForm
          city={data.locationDetails?.city ?? ''}
          street={data.locationDetails?.street ?? ''}
          building={data.locationDetails?.building ?? ''}
          zipCode={data.locationDetails?.zipCode ?? ''}
          onChange={handleLocationChange}
        />
        <Separator />
        <div className="space-y-2">
          <Label>Type</Label>
          <Select
            value={String(data.typeId)}
            onValueChange={value =>
              setData(prev => ({ ...prev, typeId: Number(value) }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {establishmentTypes.map(type => (
                <SelectItem key={type.id} value={String(type.id)}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Cover photo</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0] || null;
              setCoverPhoto(file);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Additional photos</Label>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={e => {
              const incoming = Array.from(e.target.files ?? []);
              setPhotos(prev => {
                const existingKeys = new Set(
                  prev.map(file => `${file.name}-${file.size}`)
                );
                const fresh = incoming.filter(
                  f => !existingKeys.has(`${f.name}-${f.size}`)
                );
                return [...prev, ...fresh];
              });
              e.target.value = '';
            }}
          />
          {photos.length > 0 && (
            <ul>
              {photos.map((photo, index) => (
                <li
                  key={`${photo.size}-${photo.name}`}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="truncate text-muted-foreground">
                    {photo.name}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPhotos(prev => prev.filter((_, idx) => idx !== index))
                    }
                    className="text-red-500 hover:text-red-700 shrink-0"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </DialogComponent>
  );
};

export default EditEstablishmentDialog;
