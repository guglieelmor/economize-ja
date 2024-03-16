'use client'

import React, { useState } from 'react'
import { FieldArrayWithId, FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { TbTrashFilled } from 'react-icons/tb'

import ErrorMessage from '../ErrorMessage'

interface Props {
  newCategories: FieldArrayWithId<{
    fullname: string;
    email: string;
    avatar: File;
    expenseCategories: {
        expenseCategory: string;
    }[];
    _id: string;
}, "expenseCategories", "id">[];
  append: ({ expenseCategory }: {expenseCategory: string}) => void;
  remove: (index: number) => void;
  register: UseFormRegister<{
    expenseCategories: {
        expenseCategory: string;
    }[];
    fullname: string;
    email: string;
    avatar: File;
    _id: string;
    incomeCategories: {
        incomeCategory: string;
    }[];
  }>;
  error:  Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{
    expenseCategory: string;
}>> | undefined)[]> | undefined;
}
export default function ExpenseCategories(props: Props) {

  const { newCategories, append, remove, register, error } = props;
  const [showCategories, setShowCategories] = useState(false);

  const addNewCategory = () => {
    append({ expenseCategory: ''})
  }
  return (
    <div className='flex flex-col'>

      <div className='flex flex-col'>
        <div className="flex justify-between">
          <span className='text-teal-500'>Categorias de despesas</span>
          <button type='button' onClick={() => setShowCategories(state => !state)} className='w-6 h-6 cursor-pointer p-1 text-xl text-bold bg-teal-100 flex items-center justify-center rounded-full text-black'>{showCategories ? '-' : '+'}</button>
        </div>
        {
          showCategories &&
          <>
          <div className="flex flex-col space-y-2 mt-4">
            {
              newCategories.map((field: {id: React.Key, expenseCategory: string}, index: number) => {
                return (
                  <div key={field.id} className='space-y-2'>
                    <div className='flex justify-between p-1 bg-white rounded-md border-2 border-gray-300'>
                            <h1 className='text-blue-400 text-xl'>
                            <input type='text' maxLength={24} {...register(`expenseCategories.${index}.expenseCategory`)} defaultValue={field.expenseCategory} className='w-full border-b-2 p-1 focus:outline-none border-gray-300 text-blue-400 text-xl' />
                          </h1>
                          <TbTrashFilled
                            size={30}
                            className="text-transaction md:text-transaction hover:text-red-400 cursor-pointer"
                            onClick={() => remove(index)}
                          />
                      </div>
                      {error && error[index] && <ErrorMessage errorMessage={error[index]?.expenseCategory}></ErrorMessage>}
                  </div>
                );
              })
            }
          </div>
          <button className='text-green-400 text-right self-end p-4' type='button' onClick={addNewCategory}>Adicionar</button>
          </>
        }

      </div>

    </div>
  )
}
