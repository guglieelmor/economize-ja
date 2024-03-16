'use client';
import { toBRL } from '@/functions/toBRL';
import { useStoreSelector } from '@/hooks/useStoreSelector';

export default function TotIncome(props: { flex?: string }) {
  const { totExpenses } = useStoreSelector((store) => store.Expenses);
  const { flex } = props;
  return (
    (totExpenses || totExpenses == 0) ?
    <div
      className={`flex flex-col md:flex-${
        flex ? flex : 'row'
      } p-4 items-center border-2 w-full justify-center border-zinc-300 text-center  text-transaction rounded-md bg-white`}
    >
      <span className={'text-xl md:text-2xl font-bold text-transaction'}>
        Total de despesas:
      </span>
      <span className={'text-2xl px-1 md:text-4xl text-red-600 font-semibold'}>
        {isNaN(totExpenses) ? 'R$ 0.00' : toBRL(totExpenses)}
      </span>
    </div>
    :
    <Skeleton />
  );
}

const Skeleton = () => {
  return(
      <div
      className={`flex flex-col md:flex-row p-4 py-6 items-center border-2 w-full justify-center animate-pulse bg-skeleton border-zinc-300 text-center  text-transaction rounded-md`}
    >
      <span className={'text-xl md:text-2xl font-bold text-transaction'}>
      </span>
      <span className={'text-2xl px-1 md:text-4xl text-red-600 font-semibold'}>

      </span>
    </div>
  )
}
