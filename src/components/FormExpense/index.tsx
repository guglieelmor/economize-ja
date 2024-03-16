'use client';

import { FormProvider } from 'react-hook-form';

import InputTransactions from '../InputTransactions';
import SelectTransactions from '../SelectTransactions';
import TextAreaTransactions from '../TextAreaTransactions';

import { useFormExpense } from '@/hooks/useFormExpense';

export default function FormExpense() {
  const {
    formProps,
    handleSubmit,
    handleExpense,
    register,
    errors,
    expenseCategories,
    isLoading
  } = useFormExpense();
  return (
    <FormProvider {...formProps}>
      <form
        className=" space-y-4 md:w-max"
        onSubmit={handleSubmit(handleExpense)}
      >
        <InputTransactions
          {...register('title')}
          label="Titulo:"
          placeholder="Titulo da despesa"
          autoComplete="title"
          type="text"
          error={errors.title}
        />
        <SelectTransactions
          {...register('category')}
          label="Categoria:"
          options={expenseCategories}
          error={errors.category}
        />
        <InputTransactions
          {...register('amount')}
          label="Valor:"
          placeholder="Valor da despesa"
          type="amount"
          error={errors.amount}
        />
        <InputTransactions
          {...register('date')}
          label="Data:"
          placeholder="Data da despesa"
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
            className="group relative flex md:w-full text-base justify-center rounded-3xl bg-red-600 py-2 px-3 font-semibold text-slate-300 hover:bg-red-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? 'Aguarde..' : '+ Adicionar despesa'}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
