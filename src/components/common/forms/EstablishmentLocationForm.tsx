import FormFieldGroup from '@components/common/forms/FormFieldGroup';

type Props = {
  city: string;
  street: string;
  building: string;
  zipCode: string;
  onChange: (field: string, value: string) => void;
};

const EstablishmentLocationForm = ({
  city,
  street,
  building,
  zipCode,
  onChange,
}: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Location</h3>
      <FormFieldGroup
        label="City"
        placeholder="City"
        value={city}
        onChange={value => onChange('city', value)}
      />
      <FormFieldGroup
        label="Street"
        placeholder="Street"
        value={street}
        onChange={value => onChange('street', value)}
      />
      <FormFieldGroup
        label="Building"
        placeholder="Building"
        value={building}
        onChange={value => onChange('building', value)}
      />
      <FormFieldGroup
        label="ZIP Code"
        placeholder="ZIP Code"
        value={zipCode}
        onChange={value => onChange('zipCode', value)}
      />
    </div>
  );
};

export default EstablishmentLocationForm;
