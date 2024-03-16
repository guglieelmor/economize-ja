import React, { useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import { FormProvider, useForm} from 'react-hook-form';
import { GiMoneyStack } from 'react-icons/gi'
import { TbFilePencil, TbTrashFilled } from 'react-icons/tb'
import { useDispatch } from 'react-redux';

import Dialog from '../Dialog';
import ErrorMessage from '../ErrorMessage';
import InputTransactions from '../InputTransactions';
import SelectTransactions from '../SelectTransactions';

import { GoalStates, deleteGoals, updateGoal } from '@/features/Goals';
import { toBRL } from '@/functions/toBRL';
import { useBalanceValue } from '@/hooks/useBalanceValue';
import { useCompoundInterest } from '@/hooks/useCompoundInterest';
import { useFormIncome } from '@/hooks/useFormIncome';
import { useStoreSelector } from '@/hooks/useStoreSelector'
import { apiClient } from '@/services/api-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const goalSchema = z.object({
  _id: z.string({}),
  title: z.string({ required_error: 'Título é obrigatório.' })
  .min(3, 'O Título deve conter no mínimo 3 caracteres.'),
  initialValue: z.string(),
  monthlyValue: z.string({
    errorMap: () => {
      return { message: 'Informe um número.' };
    }
  }),
  interestRate: z.coerce.number({
    errorMap: () => {
      return { message: 'Informe um número.' };
    }
  }).min(1, { message: 'Informe um valor maior que zero'}),
  endGoalValue: z.string({
    errorMap: () => {
      return { message: 'Informe um número.' };
    }
  }),
  balanceCategory: z.string().nonempty()
}).transform((data) => ({
  ...data,
  initialValue: Number(data.initialValue),
  monthlyValue: Number(data.monthlyValue),
  endGoalValue: Number(data.endGoalValue)
}))

type FormGoalSchema = z.input<typeof goalSchema>;
export default function GoalsItem(goal: GoalStates) {
  const { incomes } = useStoreSelector((store) => store.Incomes);
  const [alertDialogOpen, setAlerDialogOpen] = useState(false);
  const [editGoalDialogOpen, setEditGoalDialogOpen] = useState(false);
  const { balanceValue } = useBalanceValue();
  const dispatch = useDispatch();

  const formProps = useForm<FormGoalSchema>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(goalSchema),
    defaultValues: {
      _id: goal._id,
      title: goal.title,
      balanceCategory: goal.balanceCategory,
      endGoalValue: goal.endGoalValue.toFixed(2),
      initialValue: goal.initialValue.toFixed(2),
      interestRate: goal.interestRate,
      monthlyValue: goal.monthlyValue.toFixed(2)

    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const { incomeCategories } = useFormIncome();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = formProps;

  let currentValue = 0;

  const incomeFilter = incomes.filter((income) => income.category == goal.balanceCategory);

  if(goal.balanceCategory == 'Saldo Total'){
    currentValue = balanceValue + goal.initialValue;
  }else{
    currentValue = incomeFilter.reduce((acc, item) => {
      acc = item.amount
      return acc
    },0) + goal.initialValue;
  }

  const completionPercentage = (((currentValue) * 100) / goal.endGoalValue);
  const percentage = (completionPercentage > 100) ? 100 : completionPercentage;

  const { estimatedDate } = useCompoundInterest({
    currentValue,
    endGoalValue: goal.endGoalValue,
    interestRate: goal.interestRate,
    monthlyValue: goal.monthlyValue
  });

  async function deleteGoal(id: string) {
    setIsLoading(true);
    const response = await apiClient('transactions/goal/', 'DELETE', id);
    const { data } = await response.json();
    if (data) {
      setIsLoading(false);
      dispatch(deleteGoals(data));
    }
  };

   async function goalUpdate (data: FormGoalSchema) {
    setIsLoading(true);
    const r = await apiClient('transactions/goal', 'PUT', data);
    const { goal, status } = await r.json();
    setIsLoading(false);
    setEditGoalDialogOpen(false);
    if (status == 1) {

      dispatch(updateGoal(goal));
    }
  };

  const datalist = [
    'Total de patrimônio',
    'Total investido em Criptomoedas',
    'Total Investido em Renda Fixa',
    'Total investido em Tesouro Direto',
    'Total investido em Fundos de Investimentos',
    'Total investido em Ações',
    'Total investido no exterior'
  ]

  return (
    <div className="flex flex-col sm:flex-row w-full space-x-4 p-3 px-5 border-2 hover:bg-zinc-300 mx-auto border-zinc-500 rounded-2xl bg-zinc-50">
        <div className="bg-dash flex items-center justify-center rounded-lg px-6">
          <GiMoneyStack size={50} />
        </div>
        <div className="flex flex-col space-y-2 justify-center flex-1 text-transaction">
          <div className="flex flex-col sm:flex-row justify-between text-zinc-700 font-semibold text-lg">
            <h1 >{goal.title}</h1>
            <h1>{percentage.toFixed(2)}% concluído</h1>
          </div>
          <div className="h-4 rounded-lg w-full bg-slate-400 hidden sm:flex items-center">
            <div className={`bg-green-500 h-4 rounded-lg `} style={{ width: `${Math.max(percentage, 1).toFixed(2)}%`}}>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:whitespace-nowrap">
            <p>
              Valor atual: {toBRL(currentValue)}
            </p>
            <p>
              Objetivo: {toBRL(goal.endGoalValue)}
            </p>
            <p>
               { percentage !== 100 &&  `Mês estimado para a conclusão: ${estimatedDate} ` }
               { percentage == 100 &&  `Meta concluída! ` }
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-2">
          <div className='rounded-md border-2 border-zinc-400 text-transaction flex items-center justify-center'>
            <TbFilePencil color='black' size={25}  onClick={() => setEditGoalDialogOpen(true)} />
          </div>
          <div className='rounded-md border-2 border-zinc-400 text-transaction flex items-center justify-center'>
            <TbTrashFilled color='black' size={25} onClick={() => setAlerDialogOpen(true)} />
          </div>
        </div>
        {editGoalDialogOpen && (
          <Dialog
            handleCloseDialog={() => setEditGoalDialogOpen(false)}
            title={`Editar meta`}
            handleSubmit={handleSubmit(goalUpdate)}
            loading={isLoading}
            color="bg-teal-400"
            hoverColor="hover:bg-teal-500"
            action="Salvar"
            key={crypto.randomUUID()}
          >
            <div className="flex flex-col space-y-2 w-full">
              <FormProvider {...formProps}>
                <form className=" space-y-4 md:w-full text-black">
                  <InputTransactions
                    {...register('title')}
                    label="Titulo"
                    type="text"
                    placeholder="Dê um titulo para sua meta"
                    error={errors.title}
                    datalist={datalist}
                    w-full
                  />
                  <InputTransactions
                    {...register('initialValue')}
                    label="Valor inicial"
                    placeholder="0,00"
                    type="amount"
                    w-full
                    error={errors.initialValue}
                  />
                  <InputTransactions
                    {...register('monthlyValue')}
                    label="Aporte mensal"
                    placeholder="0,00"
                    type="amount"
                    error={errors.monthlyValue}
                    w-full
                  />
                  <div className="space-y-1 flex flex-col text-2xl">
                    <label htmlFor={'interestRate'} className="text-teal-500 text-sm md:text-lg">
                      Taxa de juros anuais
                    </label>
                    <CurrencyInput
                      suffix="%"
                      allowNegativeValue={false}
                      className="border-zinc-500 text-sm border-2 p-1 rounded-md text-right"
                      placeholder="0%"
                      decimalSeparator=","
                      decimalsLimit={2}
                      {...register('interestRate')}
                      onValueChange={(value) => {
                        value && setValue('interestRate', Number(value.replace(',', '.')))
                      }}
                      groupSeparator="."

                    />
                    {errors.interestRate && (
                      <ErrorMessage errorMessage={errors.interestRate}></ErrorMessage>
                    )}
                  </div>

                  <InputTransactions
                    {...register('endGoalValue')}
                    label="Valor (R$) final da meta"
                    placeholder="0,00"
                    type="amount"
                    error={errors.endGoalValue}
                    w-full
                  />
                  <SelectTransactions
                    {...register('balanceCategory')}
                    label="Considerar o saldo"
                    options={['Saldo Total', ...incomeCategories]}
                    error={errors.balanceCategory}
                    disableDefaultOption
                  />
                </form>
              </FormProvider>
            </div>
          </Dialog>
        )}
        {alertDialogOpen && (
          <Dialog
            handleCloseDialog={() => setAlerDialogOpen(false)}
            title={`Remover meta`}
            handleSubmit={() => deleteGoal(goal._id)}
            loading={isLoading}
            indicator="bg-red-500"
            color="bg-red-400"
            hoverColor="hover:bg-red-500"
            action="Confirmar"
            key={crypto.randomUUID()}
          >
            <div className="flex flex-col space-y-2 text-black">
              <span className="text-xl font-semibold">{goal.title}</span>
              Você realmente deseja excluir essa meta?
            </div>
          </Dialog>
        )}
    </div>
  )
}
