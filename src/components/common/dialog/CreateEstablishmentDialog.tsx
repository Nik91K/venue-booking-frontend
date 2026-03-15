import { createEstablishment } from '@api/slices/establishmentSlice';
import AlertDialogConponent from '@components/common/dialog/AlertDialog';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { useEffect, useState } from 'react';
import FormFieldGroup from '@components/common/FormFieldGroup';
import { establishmentValidation } from '@hooks/validation/useEstablishment';
import { addError } from '@api/slices/errorSlice';
import { convertError } from '@hooks/logger/errorConverter';
import { getAllEstablishmentTypes } from '@api/slices/establishmentTypeSlice';

type Props = {
  triggerText?: string;
  triggerClassName?: string;
  onCreated?: () => void;
};

const CreateEstablishmentDialog = ({
  triggerText = 'Create Establishment',
  triggerClassName,
  onCreated,
}: Props) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    totalSeats: '0',
    typeId: '1',
    featureIds: '',
  });
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  // const { establishments, error, loading } = useAppSelector((state) => state.establishment)
  const { establishmentType, loading } = useAppSelector(
    state => state.establishmentType
  );

  useEffect(() => {
    if (!establishmentType.length && !loading) {
      dispatch(getAllEstablishmentTypes());
    }
  }, [dispatch, establishmentType]);

  const handleSubmit = async () => {
    const validationPayload = {
      name: formData.name,
      description: formData.description,
      totalSeats: Number(formData.totalSeats),
      coverPhoto,
      photos,
      type: Number(formData.typeId),
      address: formData.address,
    };

    const validationErrors = establishmentValidation(validationPayload);
    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        dispatch(
          addError({
            title: `Validation Error: ${field}`,
            message,
            type: 'error',
          })
        );
      });
      return;
    }

    try {
      await dispatch(
        createEstablishment({
          name: formData.name,
          address: formData.address,
          description: formData.description,
          totalSeats: Number(formData.totalSeats),
          typeId: Number(formData.typeId),
          coverPhoto,
          photos,
        })
      );
      onCreated?.();
    } catch (error: any) {
      dispatch(addError(convertError(error)));
    }
  };

  return (
    <AlertDialogConponent
      triggerText={triggerText}
      triggerClassName={triggerClassName}
      title="Create establishment"
      description="Fill out the details"
      actionText="Create"
      onAction={handleSubmit}
      onOpenChange={open => {
        if (!open) {
          setFormData({
            name: '',
            address: '',
            description: '',
            totalSeats: '0',
            typeId: '1',
            featureIds: '',
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

        <FormFieldGroup
          label="Address"
          value={formData.address}
          onChange={value => setFormData(prev => ({ ...prev, address: value }))}
          placeholder="Address"
        />

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
            <select
              value={formData.typeId}
              onChange={e =>
                setFormData(prev => ({ ...prev, typeId: e.target.value }))
              }
              className="w-full border rounded px-2 py-1"
            >
              {establishmentType.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
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
    </AlertDialogConponent>
  );
};

export default CreateEstablishmentDialog;
