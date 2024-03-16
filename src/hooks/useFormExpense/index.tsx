import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useStoreSelector } from '../useStoreSelector';

import { incrementExpenses } from '@/features/Expenses';
import { apiClient } from '@/services/api-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
const schema = z
  .object({
    title: z
      .string({ required_error: 'Título é obrigatório.' })
      .min(3, 'O Título deve conter no mínimo 3 caracteres.')
      .max(30, 'O Título deve conter no máximo 30 caracteres.')
      .trim(),
    category: z.string().nonempty(),
    amount: z
      .coerce.number({
        errorMap: () => {
          return { message: 'Informe um número.' };
        }
      })
      .min(1, 'Informe um valor'),
    date: z.date({
      errorMap: () => {
        return { message: 'Informe uma data valida.' };
      }
    }),
    description: z
      .string({ required_error: 'Uma breve descrição' })
      .min(5, 'A descrição deve conter menos 5 caracteres.')
      .max(35, 'A descrição não pode ultrapassar 35 caracteres.')
  })
  .refine((fields) => fields.category !== 'selecione', {
    path: ['category'],
    message: 'Por favor, selecione uma opção'
  });

type FormPropsRegister = z.infer<typeof schema>;

export const useFormExpense = () => {
  const formProps = useForm<FormPropsRegister>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema)
  });

  const [isLoading, setIsLoading] = useState(false);
  const user = useStoreSelector((store) => store.User);
  const expenseCategories = user.expenseCategories.map((option) => option.expenseCategory);
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = formProps;

  async function handleExpense(data: FormPropsRegister) {
    setIsLoading(true);
    const body = { type: data.category, ...data };
    const r = await apiClient('transactions/expense/', 'POST', body);
    const {
      data: { expense }
    } = await r.json();
    reset();
    setIsLoading(false);
    dispatch(incrementExpenses(expense));
    return expense;
  }

  return {
    formProps,
    errors,
    isLoading,
    expenseCategories,
    handleSubmit,
    handleExpense,
    register
  };
};
