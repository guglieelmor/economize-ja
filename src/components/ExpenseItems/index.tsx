'use client';

import ExpenseItem from '../ExpenseItem';

import { useStoreSelector } from '@/hooks/useStoreSelector';

export interface ExpenseProps {
  title: string;
  date: string;
  type: string;
  amount: number;
  category: string;
  description: string;
  _id: string;
}
export default function ExpenseItems() {
  const { expenses } = useStoreSelector((store) => store.Expenses);

  return (
    <div className="flex flex-col sm:w-full space-y-4 mt-5">
      {expenses?.[0]?.title !== '' ?
        expenses.map((expense: ExpenseProps) => {
          return (
            <ExpenseItem
              amount={expense.amount}
              category={expense.category}
              title={expense.title}
              _id={expense._id}
              description={expense.description}
              date={expense.date}
              key={expense._id}
            />
          );
        }) : Array.from([0, 1, 2, 3, 4]).map(() =>  <Skeleton key={crypto.randomUUID()}/>)
      }
      {
        expenses.length === 0
         && <EmptyExpense />
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

const EmptyExpense = () => {

  return(
    <div className="flex flex-col justify-center items-center text-2xl text-white flex-1">
      <h1>Você ainda não possui nenhuma despesa 🙄</h1>
      <h1>Cadastre uma despesa para estar no controle da sua vida financeira 😉!</h1>
    </div>
  )
}

