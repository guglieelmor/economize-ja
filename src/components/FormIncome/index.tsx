'use client';
import { FormProvider } from 'react-hook-form';

import InputTransactions from '../InputTransactions';
import SelectTransactions from '../SelectTransactions';
import TextAreaTransactions from '../TextAreaTransactions';

import { useFormIncome } from '@/hooks/useFormIncome';

export default function FormIncome() {
  const { errors, formProps, handleIncome, handleSubmit, isLoading, register, incomeCategories } =
    useFormIncome();

  return (
    <FormProvider {...formProps}>
      <form
        className=" space-y-4 md:w-max"
        onSubmit={handleSubmit(handleIncome)}
      >
        <InputTransactions
          {...register('title')}
          label="Titulo:"
          placeholder="Titulo do rendimento"
          autoComplete="title"
          type="text"
          error={errors.title}
        />
        <SelectTransactions
          {...register('category')}
          label="Categoria:"
          options={incomeCategories}
          error={errors.category}
        />
        <InputTransactions
          {...register('amount')}
          label="Valor:"
          placeholder="Valor do rendimento"
          type="amount"
          error={errors.amount}
        />
        <InputTransactions
          {...register('date')}
          label="Data:"
          placeholder="Data do rendimento"
          autoComplete="date"
          type="date"
          error={errors.date}
        />
        <TextAreaTransactions
          {...register('description')}
          label="Descrição:"
          placeholder="Uma breve descrição"
          autoComplete=""
          error={errors.description}
        />
        <div className="flex justify-center md:justify-start">
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex md:w-full text-sm justify-center
                      rounded-3xl bg-teal-500 py-2 px-3 font-semibold text-slate-700
                      hover:bg-teal-500 hover:text-white focus-visible:outline
                      focus-visible:outline-2 focus-visible:outline-offset-2
                      focus-visible:outline-indigo-600"
          >
            {isLoading ? 'Aguarde..' : '+ Adicionar rendimento'}
          </button>
        </div>
      </form>
    </FormProvider>
    );
}

// const SkeletonForm = () => {
//   return(
//     <form className="bg-skeleton animate-pulse py-72 px-36 w-64 "></form>
//   )
// }
