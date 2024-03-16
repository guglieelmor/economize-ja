'use client';
import { ChangeEvent, useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import ErrorMessage from '../ErrorMessage';

interface FormInputProps {
  name: string;
  label?: string;
  error?: FieldError | undefined;
  register: UseFormRegister<{
    _id: string;
    fullname: string;
    email: string;
    incomeCategories: {
        incomeCategory: string;
    }[];
    expenseCategories: {
        expenseCategory: string;
    }[];
    avatar: File;
}>;
  avatar: string;

}

// export default FormInput;
const supabaseURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/poupa-mais`;

const MediaPicker =  (props: FormInputProps) => {
  const {register} = props;
  const [preview, setPreview] = useState(supabaseURL + '/' + props.avatar);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files || files.length === 0) {
      return
    }
    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)

  }

  return (
    <div key={props.name} className="space-y-1">
      <label htmlFor={props.name} className="block font-medium leading-6 text-teal-500">{props.label}
        <div className="mt-1 flex items-center gap-x-3">
          <img src={preview} className='w-16 h-16 rounded-full cursor-pointer' alt="" />
          <span className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Trocar</span>
        </div>
      </label>
      <input type="file" {...register('avatar')} onChange={ (e) => { register('avatar').onChange(e); handleOnChange(e); }} className='hidden' id="avatar"  />
      {props.error && <ErrorMessage errorMessage={props.error}></ErrorMessage>}
    </div>
  );
};
export default MediaPicker;
