'use client';

import IncomeItem from '../IncomeItem';

import { useStoreSelector } from '@/hooks/useStoreSelector';

export interface IncomeProps {
  title: string;
  date: string;
  type: string;
  amount: number;
  category: string;
  description: string;
  _id: string;
}
export default function IncomeItems() {
  const { incomes } = useStoreSelector((store) => store.Incomes);
  return (
    <div className="flex flex-col sm:w-full space-y-4 mt-5">
      {incomes?.[0]?.title !== '' ?
        incomes.map((income: IncomeProps) => {
          return (
            <IncomeItem
              amount={income.amount}
              category={income.category}
              title={income.title}
              _id={income._id}
              description={income.description}
              date={income.date}
              key={income._id}
            />
          );
        })
        : Array.from([0, 1, 2, 3, 4]).map(() =>  <Skeleton key={crypto.randomUUID()}/>)
      }
      {
        incomes.length === 0 &&
        <EmptyIncome />
      }
    </div>
  );
}

const Skeleton = () => {

  return(
    <div className="flex justify-between w-full py-10 px-5 border-2 border-zinc-500  rounded-2xl bg-skeleton animate-pulse">
      <div className="flex items-center space-x-8">

      </div>

    </div>
  )
}

const EmptyIncome = () => {

  return(
    <div className="flex flex-col justify-center items-center text-2xl text-white flex-1">
      <h1>Você ainda não possui nenhum rendimento 🙄</h1>
      <h1>Cadastre um rendimento para estar no controle da sua vida financeira 😉!</h1>
    </div>
  )
}

