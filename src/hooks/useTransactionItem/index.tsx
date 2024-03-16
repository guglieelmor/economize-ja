import { useState } from 'react';
import { useForm } from 'react-hook-form';

// import { TransactionProps } from '../History';

import { TransactionProps } from '@/components/History';

import { useFormExpense } from '@/hooks/useFormExpense';
import { useFormIncome } from '@/hooks/useFormIncome';
import {
  ExpenseCategory
} from '@/store/expenseCategory';
import { IncomeCategory } from '@/store/incomeCategory';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z
  .object({
    title: z.string({ required_error: 'Título é obrigatório.' }),
    amount: z.number(),
    date: z.date(),
    category: z.string().nonempty(),
    description: z
      .string({ required_error: 'Uma breve descrição' })
      .min(5, 'Informe uma breve descrição de pelo menos 5 caracteres.')
      .max(35, 'A descrição não pode ultrapassar 35 caracteres.')
  })
  .refine((fields) => fields.category !== 'selecione', {
    path: ['category'],
    message: 'Por favor, selecione uma opção'
  });
type FormPropsRegister = z.infer<typeof schema>;

export const useTransactionItem = (props: TransactionProps | any) => {
  const { handleIncome, isLoading: incomeLoading } = useFormIncome();
  const { handleExpense, isLoading: expenseLoading } = useFormExpense();
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const loading = props.type == 'expense' ? expenseLoading : incomeLoading;
  const formProps = useForm<FormPropsRegister>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      title: props.title,
      amount: props.amount,
      date: new Date(props.date)
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = formProps;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { expenseCategories } = useFormExpense();
  const { incomeCategories } = useFormIncome();
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const categoryIcon =
    props.type == 'expense'
      ? ExpenseCategory[props.category]
      : IncomeCategory[props.category];

  const categoryOptions = props.type == 'expense'
      ? expenseCategories
      : incomeCategories;

  const indicator = props.type == 'expense' ? 'bg-red-500' : 'bg-green-500';
  const titleDialog =
    props.type == 'expense' ? 'Adicionar despesa' : 'Adicionar rendimento';
  const handleTransaction = (type: string) => {
    if (type == 'expense') {
      return async (data: any) => {
        const expense = await handleExpense(data);
        if (expense) {
          setIsHidden(true);
          handleCloseDialog();
        }
      };
    } else {
      return async (data: any) => {
        const income = await handleIncome(data);
        if (income) {
          setIsHidden(true);
          handleCloseDialog();
        }
      };
    }
  };

  return {
    isHidden,
    categoryIcon,
    categoryOptions,
    indicator,
    handleOpenDialog,
    isDialogOpen,
    handleCloseDialog,
    handleTransaction,
    handleSubmit,
    titleDialog,
    loading,
    formProps,
    register,
    errors
  };
};
