
'use client'
import { useState } from "react";
import CurrencyInput from 'react-currency-input-field';
import { FormProvider, useForm } from "react-hook-form";

import BarChartJs from "@/components/BarChartJs";
import Dialog from "@/components/Dialog";
import ErrorMessage from "@/components/ErrorMessage";
import GoalsItems from "@/components/GoalsItems";
import InputTransactions from "@/components/InputTransactions";
import SelectTransactions from "@/components/SelectTransactions";

import { incrementGoals } from "@/features/Goals";
import { useStoreSelector } from "@/hooks/useStoreSelector";
import { apiClient } from "@/services/api-client";
import { store } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const goalSchema = z.object({
  title: z.string({ required_error: 'Título é obrigatório.' })
  .min(3, 'O Título deve conter no mínimo 3 caracteres.'),
  initialValue: z.coerce.number({
    errorMap: () => {
      return { message: 'Informe um número.' };
    }
  }),
  monthlyValue: z.coerce.number({
    errorMap: () => {
      return { message: 'Informe um número.' };
    }
  }),
  interestRate: z.coerce.number({
    errorMap: () => {
      return { message: 'Informe um número.' };
    }
  }).min(1, { message: 'Informe um valor maior que zero'}),
  endGoalValue: z.coerce.number({
    errorMap: () => {
      return { message: 'Informe um número.' };
    }
  }),
  balanceCategory: z.string().nonempty()
})

type FormGoalSchema = z.infer<typeof goalSchema>;
export type GoalState = z.infer<typeof goalSchema>;
export default function Goals() {
  const { goals } = useStoreSelector((store) => store.Goals);
  const [ newGoalDialogOpen, setNewGoalDialogOpen] = useState(false);
  const [ isLoading, setIsLoading] = useState(false);

  const user = useStoreSelector((store) => store.User);
  const incomeCategories = user.incomeCategories.map((option) => option.incomeCategory);

  const form = useForm<FormGoalSchema>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(goalSchema),
    defaultValues: {
      initialValue: 0,
    }
  })

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = form;

  const datalist = [
    'Total de patrimônio',
    'Total investido em Criptomoedas',
    'Total Investido em Renda Fixa',
    'Total investido em Tesouro Direto',
    'Total investido em Fundos de Investimentos',
    'Total investido em Ações',
    'Total investido no exterior'
  ]

  async function handleCreateNewGoal (data: FormGoalSchema) {
    setIsLoading(true);
    const r = await apiClient('transactions/goal/', 'POST', data);
    const {
      data: { goal }
    } = await r.json();
    reset();
    setIsLoading(false);
    store.dispatch(incrementGoals(goal));
    setNewGoalDialogOpen(false)
  }


  return (
      <div className=" md:mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col rounded-md pl-6 p-6 border-2 border-zinc-400 bg-gradient-dark-blue lg:w-full">
          <div className="flex flex-col">
            <div className="flex text-white justify-between items-center">
              <h1 className="text-4xl text-teal-400 font-semibold">Metas em andamento</h1>
              <div>
                <button
                    type="button"
                    onClick={() => setNewGoalDialogOpen(true)}
                    className="flex md:w-full text-sm justify-center
                              rounded-3xl bg-teal-500 py-2 px-3 font-semibold text-slate-700
                              hover:bg-teal-500 hover:text-white"
                  >
                    Adicionar Meta +
                </button>
              </div>
            </div>
            <div className="flex mt-5 sm:space-x-4 flex-col sm:flex-row">
              <div className="bg-dash rounded-lg text-white flex flex-col">
                <BarChartJs goals={goals}/>
              </div>
              {
                goals[0]?._id === '' && <SkeletonGoals />
              }
              {
                goals.length === 0 ? <EmptyGoals /> :
                <GoalsItems goals={goals} />
              }
            </div>
          </div>

        </div>
        {
        newGoalDialogOpen && (
          <Dialog
            handleCloseDialog={() => setNewGoalDialogOpen(false)}
            title={`Criar meta`}
            handleSubmit={handleSubmit(handleCreateNewGoal)}
            loading={isLoading}
            color="bg-teal-400"
            hoverColor="hover:bg-teal-500"
            action="Salvar"
            key={crypto.randomUUID()}
          >
            <div className="flex flex-col space-y-2 w-full">
              <FormProvider {...form}>
                <form className=" space-y-4 md:w-full">
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
                      // value={watch('interestRate')}
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
        )
        }
      </div>
  )
}

const SkeletonGoals = () => {

  return(
    <div className="flex flex-1 flex-col text-white space-y-2 wtf">
      {
        Array.from([0, 1, 2]).map(() => {

          return (
            <div key={crypto.randomUUID()} className="flex w-full py-10 space-x-4 p-3 px-5 border-2 hover:bg-zinc-300 mx-auto border-zinc-500 rounded-2xl bg-skeleton animate-pulse">
                <div className="bg-dash flex items-center justify-center rounded-lg px-6"></div>
                <div className="flex flex-col space-y-2 justify-center flex-1 text-transaction">
                  <div className="flex justify-between text-zinc-700 font-semibold text-lg"></div>
                  <div className="h-4 rounded-lg w-full bg-slate-400 flex items-center"></div>
                  <div className="flex justify-between whitespace-nowrap">
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-2">
                  <div className='rounded-md border-2 border-zinc-400 text-transaction'>

                  </div>
                  <div className='rounded-md border-2 border-zinc-400 text-transaction'>
                  </div>
                </div>
            </div>
          )
        })
      }

    </div>
  );
}

const EmptyGoals = () => {

  return(
    <div className="flex flex-col justify-center items-center text-2xl text-white flex-1">
      <h1>Você ainda não possui nenhuma meta 🙄</h1>
      <h1>Inicie uma meta para transformar seus sonhos em objetivos 😉!</h1>
    </div>
  )
}

