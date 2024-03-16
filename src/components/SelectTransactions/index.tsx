'use client';
import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import ErrorMessage from '../ErrorMessage';

interface SelectTransactionsProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  error?: FieldError;
  options: Array<string>;
  disableDefaultOption?: boolean;
}

// export default SelectTransactions;

const SelectTransactions = forwardRef<
  HTMLSelectElement,
  SelectTransactionsProps
>((props, ref) => {
  const { register } = useFormContext();

  return (
    <div key={props.name} className="space-y-1 text-xl">
      {props.label && (
        <label htmlFor={props.name} className="text-sm md:text-base text-teal-500">
          {props.label}
        </label>
      )}
      <select
        {...register(`${props.name}`)}
        className={'block border-zinc-500 text-sm md:text-base border-2 md:w-full p-1 rounded-md'}
        ref={ref}
      >
        {!props.disableDefaultOption && (
          <option value={'selecione'}>Selecione uma opção</option>
        )}
        {props.options.map((option) => {
          return (
            <option key={crypto.randomUUID()} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      {props.error && <ErrorMessage errorMessage={props.error}></ErrorMessage>}
    </div>
  );
});
SelectTransactions.displayName = 'SelectTransactions';
export default SelectTransactions;
