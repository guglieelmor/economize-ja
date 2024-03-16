'use client';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaCommentDots } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { TbTrashFilled } from 'react-icons/tb';
import { useDispatch } from 'react-redux';

import Dialog from '../Dialog';
import InputTransactions from '../InputTransactions';
import SelectTransactions from '../SelectTransactions';
import TextAreaTransactions from '../TextAreaTransactions';

import { deleteIncomes, updateIncome } from '@/features/Incomes';
import { formatDateISOToBR } from '@/functions/formatDateISO';
import { toBRL } from '@/functions/toBRL';
import { useFormIncome } from '@/hooks/useFormIncome';
import { useTransactionItem } from '@/hooks/useTransactionItem';
import { apiClient } from '@/services/api-client';
import { IncomeCategory } from '@/store/incomeCategory';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface IncomeItem {
  title: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  _id: string;
}
const schema = z
  .object({
    _id: z.string(),
    type: z.string(),
    title: z
      .string({ required_error: 'Título é obrigatório.' })
      .min(3, 'O Título deve conter no mínimo 3 caracteres.')
      .max(50, 'O Título deve conter no máximo 50 caracteres.')
      .trim(),
    category: z.string().nonempty(),
    amount: z
      .string({
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
      .min(5, 'Informe uma breve descrição de pelo menos 5 caracteres.')
      .max(35, 'A descrição não pode ultrapassar 35 caracteres.')
  })
  .refine((fields) => fields.category !== 'selecione', {
    path: ['category'],
    message: 'Por favor, selecione uma opção'
  });

type FormPropsUpdate = z.infer<typeof schema>;

export default function IncomeItem(props: IncomeItem) {
  const formProps = useForm<FormPropsUpdate>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      _id: props._id,
      title: props.title,
      type: 'income',
      amount: props.amount.toFixed(2),
      category: props.category,
      date: new Date(`${props.date}`),
      description: props.description
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const { incomeCategories } = useFormIncome();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = formProps;

  const dispatch = useDispatch();
  const deleteItem = async (id: string) => {
    setIsLoading(true);
    const response = await apiClient('transactions/income/', 'DELETE', id);
    const { data } = await response.json();
    if (data) {
      setIsLoading(false);
      dispatch(deleteIncomes(data));
    }
  };

  const incomeUpdate = async (data: FormPropsUpdate) => {
    setIsLoading(true);
    const r = await apiClient('transactions/income', 'PUT', data);
    const { income, status } = await r.json();
    setIsLoading(false);
    handleCloseDialog();
    if (status == 1) {
      const update = {
        _id: income._id as string,
        title: income.title as string,
        date: income.date as string,
        type: income.type as string,
        amount: parseFloat(income.amount) as number,
        category: income.category as string,
        description: income.description as string
      };

      dispatch(updateIncome(update));
    }
  };

  const { handleCloseDialog, handleOpenDialog, isDialogOpen } =
    useTransactionItem(props);
  return (
    <div className="flex justify-between w-full p-3 px-5 border-2 hover:bg-zinc-300 mx-auto border-zinc-500  rounded-2xl bg-zinc-50">
      <div className="flex items-center space-x-8" onClick={handleOpenDialog}>
        {props.category && (IncomeCategory[props.category] || IncomeCategory['Outros'])}
        <div className="flex flex-col ml-2 space-y-2 text-transaction text-lg">
          <div className="flex items-center gap-2">
            <div className="rounded-full w-3 h-3 bg-green-500"></div>
            <span className="font-semibold md:text-xl">{props.title}</span>
          </div>
          <div className="flex md:flex-row flex-col md:space-x-4 md:whitespace-nowrap">
            <span>{toBRL(props.amount)}</span>
            <span className="flex items-center">
              <MdDateRange />
              {formatDateISOToBR(props.date)}
            </span>
            <span className="flex items-center gap-1">
              <FaCommentDots />
              {props.description}
            </span>
          </div>
        </div>
      </div>
      <div
        onClick={() => setAlertDialogOpen(true)}
        className="sm:flex hidden items-center sm:mr-5 md:bg-black-blue md:p-4 rounded-full text-white"
      >
        <TbTrashFilled
          size={30}
          className="text-transaction md:text-white cursor-pointer hover:text-red-400"
        ></TbTrashFilled>
      </div>
      {isDialogOpen && (
        <Dialog
          title="Atualizar rendimento"
          loading={isLoading}
          indicator="bg-green-500"
          handleCloseDialog={handleCloseDialog}
          handleSubmit={handleSubmit(incomeUpdate)}
          action="Atualizar"
        >
          <FormProvider {...formProps}>
            <form className=" space-y-4 md:w-max">
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
                label="Selecione uma categoria:"
                options={incomeCategories}
                error={errors.category}
                disableDefaultOption={true}
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
            </form>
          </FormProvider>
        </Dialog>
      )}
      {alertDialogOpen && (
        <Dialog
          handleCloseDialog={() => setAlertDialogOpen(false)}
          title={`Remover rendimento`}
          handleSubmit={() => deleteItem(props._id)}
          loading={isLoading}
          indicator="bg-red-500"
          color="bg-red-400"
          hoverColor="hover:bg-red-500"
          action="Confirmar"
          key={crypto.randomUUID()}
        >
          <div className="flex flex-col space-y-2">
            <span className="text-xl font-semibold">{props.title}</span>
            Você realmente deseja excluir esse rendimento?
          </div>
        </Dialog>
      )}
    </div>
  );
}
