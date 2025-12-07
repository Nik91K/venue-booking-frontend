import type { InputType } from '@/types/common';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import type React from 'react';

type FormTypeProps = {
  type: InputType;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
};

const FormFieldGroup = (data: FormTypeProps) => {
  return (
    <InputGroup>
      <InputGroupInput
        type={data.type}
        placeholder={data.placeholder}
        value={data.value}
        onChange={e => data.onChange(e.target.value)}
      />
      <InputGroupAddon>{data.icon}</InputGroupAddon>
    </InputGroup>
  );
};

export default FormFieldGroup;
