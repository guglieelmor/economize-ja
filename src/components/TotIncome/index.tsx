'use client';
import { toBRL } from '@/functions/toBRL';
import { useStoreSelector } from '@/hooks/useStoreSelector';

export default function TotExpense(props: { flex?: string }) {
  const { totIncome } = useStoreSelector((store) => store.Incomes);
  const { flex } = props;
  const flexClass = flex ? flex : 'row';
  return (
    (totIncome || totIncome == 0) ?
    <div
      className={`flex flex-col md:flex-${flexClass} p-4 items-center border-2 w-full justify-center border-zinc-300 text-center  text-transaction rounded-md bg-white`}
    >
      <span className={'text-xl md:text-2xl font-bold text-transaction'}>
        Total de rendimentos:
      </span>
      <span
        className={'text-2xl px-1 md:text-4xl text-emerald-600 font-semibold'}
      >
        {isNaN(totIncome) ? 'R$ 0.00' : toBRL(totIncome)}
      </span>
    </div>
    : <Skeleton />
  );
}

const Skeleton = () => {
  return(
      <div
      className={`flex flex-col md:flex-row p-4 py-6 items-center bg-skeleton animate-pulse border-2 w-full justify-center border-zinc-300 text-center  text-transaction rounded-md`}
      >
      <span className={'text-xl md:text-2xl font-bold text-transaction'}>
      </span>
      <span className={'text-2xl px-1 md:text-4xl text-red-600 font-semibold h-4'}>
      </span>
    </div>
  )
}

