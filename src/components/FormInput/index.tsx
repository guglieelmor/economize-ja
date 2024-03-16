'use client';
import React, { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import ErrorMessage from '../ErrorMessage';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  value?: string;
  placeholder: string;
  accept?: string;
  autoComplete?: string;
  type: string;
  error?: FieldError | undefined;
  className: string;
  defaultValue?: string;
}

// export default FormInput;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { register } = useFormContext();

  return (
    <div key={props.name} className="space-y-1">
      {props.label && (
        <label htmlFor={props.name} className="text-teal-500">
          {props.label}
        </label>
      )}
      <input
        type={props.type}
        accept={props.accept}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        value={props.value}
        defaultValue={props.defaultValue}
        {...register(props.name)}
        className={`${
          props.error ? 'border-2 border-red-400 outline-none' : 'border-1'
        } ${props.className}`}
        ref={ref}
      />
      {props.error && <ErrorMessage errorMessage={props.error}></ErrorMessage>}
    </div>
  );
});
FormInput.displayName = 'FormInput';
export default FormInput;
