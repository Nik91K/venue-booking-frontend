import type { InputType } from '@/types/common';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@components/ui/input-group';
import type React from 'react';
import { Field, FieldDescription, FieldLabel } from '@components/ui/field';

type FormTypeProps = {
  type?: InputType;
  label?: string;
  description?: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
};

const FormFieldGroup = (data: FormTypeProps) => {
  return (
    <Field>
      {data.label && <FieldLabel>{data.label}</FieldLabel>}

      <InputGroup>
        <InputGroupInput
          type={data.type}
          placeholder={data.placeholder}
          value={data.value}
          onChange={e => data.onChange(e.target.value)}
        />
        {data.leftIcon && <InputGroupAddon>{data.leftIcon}</InputGroupAddon>}
        {data.rightIcon && (
          <InputGroupAddon
            align="inline-end"
            onClick={data.onRightIconClick}
            className={data.onRightIconClick ? 'cursor-pointer' : ''}
          >
            {data.rightIcon}
          </InputGroupAddon>
        )}
      </InputGroup>
      {data.description && (
        <FieldDescription>{data.description}</FieldDescription>
      )}
      {data.error && (
        <FieldDescription className="text-red-500">
          {data.error}
        </FieldDescription>
      )}
    </Field>
  );
};

export default FormFieldGroup;
