'use client';
import { toBRL } from '@/functions/toBRL';
import { useStoreSelector } from '@/hooks/useStoreSelector';

export default function ContentTotValue() {
  const { totExpenses } = useStoreSelector((store) => store.Expenses);
  const { totIncome } = useStoreSelector((store) => store.Incomes);

  const balanceValue = totIncome - totExpenses;
  return (
    !isNaN(balanceValue) ?
    <div className="flex flex-col border-2 w-full sm:w-max sm:mx-auto border-zinc-300  rounded-md bg-white">

      <div className="flex flex-col p-4 border-2 w-full border-zinc-300  text-transaction rounded-md">
        <span
          className={'text-xl md:text-2xl font-bold text-transaction text-center'}
        >
          Saldo total
        </span>{' '}
        <span
          className={`text-2xl px-10 md:text-4xl font-semibold text-center ${
            balanceValue > 0 ? 'text-emerald-400' : 'text-red-500'
          }`}
        >
          {toBRL(balanceValue)}
        </span>
      </div>
    </div>
    : <Skeleton />
  );
}

const Skeleton = () => {

  return(
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col py-6 px-32 border-2 w-32 border-zinc-300 bg-skeleton animate-pulse h-8 text-transaction rounded-md">
        <span
          className={'text-xl md:text-2xl font-bold text-transaction text-center'}
        >
        </span>{' '}
        <span
          className={`text-2xl px-10 md:text-4xl font-semibold`}
        >
        </span>
      </div>
  </div>
  )
}
