import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { useState } from 'react';
import FormFieldGroup from '@components/common/forms/FormFieldGroup';
import EstablishmentLocationForm from '@components/common/forms/EstablishmentLocationForm';
import { Separator } from '@components/ui/separator';
import type { CreateEstablishmentType, VenueType } from '@/types/establishment';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import DialogComponent from '@components/common/dialog/DialogComponent';

type Props = {
  triggerText?: string;
  establishmentTypes: VenueType[];
  onCreated: (data: CreateEstablishmentType) => void;
};

const CreateEstablishmentDialog = ({
  establishmentTypes,
  onCreated,
}: Props) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    totalSeats: '0',
    typeId: 1,
    locationDetails: { city: '', street: '', building: '', zipCode: '' },
  });
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);

  const handleSubmit = () => {
    onCreated({
      name: formData.name,
      description: formData.description,
      totalSeats: Number(formData.totalSeats),
      typeId: formData.typeId,
      coverPhoto,
      photos,
      city: formData.locationDetails.city,
      street: formData.locationDetails.street,
      building: formData.locationDetails.building,
      zipCode: formData.locationDetails.zipCode,
    });
  };

  const handleLocationChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      locationDetails: { ...prev.locationDetails, [field]: value },
    }));
  };

  return (
    <DialogComponent
      triggerClassName="w-auto"
      headerTitle="Create establishment"
      headerDescription="Fill out the details"
      triggerText="Create Establishment"
      onSubmit={handleSubmit}
      cancelText="Cancel"
      onOpenChange={open => {
        if (!open) {
          setFormData({
            name: '',
            description: '',
            totalSeats: '0',
            typeId: 1,
            locationDetails: {
              city: '',
              street: '',
              building: '',
              zipCode: '',
            },
          });
          setCoverPhoto(null);
          setPhotos([]);
        }
      }}
    >
      <form className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <FormFieldGroup
          label="Name"
          value={formData.name}
          onChange={value => setFormData(prev => ({ ...prev, name: value }))}
          placeholder="Name"
        />

        <Separator />
        <EstablishmentLocationForm
          city={formData.locationDetails?.city ?? ''}
          street={formData.locationDetails?.street ?? ''}
          building={formData.locationDetails?.building ?? ''}
          zipCode={formData.locationDetails?.zipCode ?? ''}
          onChange={handleLocationChange}
        />
        <Separator />

        <FormFieldGroup
          label="Description"
          value={formData.description}
          onChange={value =>
            setFormData(prev => ({ ...prev, description: value }))
          }
          placeholder="Description"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormFieldGroup
            label="Total seats"
            value={formData.totalSeats}
            onChange={value =>
              setFormData(prev => ({ ...prev, totalSeats: value }))
            }
            placeholder="Total seats"
            type="number"
          />

          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={String(formData.typeId)}
              onValueChange={value =>
                setFormData(prev => ({ ...prev, typeId: Number(value) }))
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

export default CreateEstablishmentDialog;
