import { toBRL } from '@/functions/toBRL';
import { useStoreSelector } from '@/hooks/useStoreSelector';

export default function Expense() {
  const { expenses } = useStoreSelector((store) => store.Expenses);
  const amounts = expenses.map((item) => item.amount);
  const minAmount = Math.min(...amounts);
  const maxAmount = Math.max(...amounts);
  return (
    minAmount && maxAmount ?
    <>
      <div className="text-violet-300 flex justify-between text-xl items-center">
        <span>Miníma</span>
        <span className="text-3xl font-semibold">Despesas</span>
        <span>Máxima</span>
      </div>
      <div className="flex flex-col py-4 space-y-2">
        <div className="flex justify-between w-full p-3 border-2 mx-auto border-zinc-500  rounded-2xl bg-zinc-100">
          <span className="text-base md:text-2xl font-bold whitespace-nowrap text-transaction">
            {toBRL(minAmount)}
          </span>
          <span className="text-base md:text-2xl font-bold whitespace-nowrap text-transaction">
            {toBRL(maxAmount)}
          </span>
        </div>
      </div>
    </>
    : <Skeleton />
  );
}

const Skeleton = () => {
  return(
    <>
    <div className="text-violet-300 flex justify-between text-xl items-center">
      <span>Minímo</span>
      <span className="text-3xl font-semibold">Ganhos</span>
      <span>Máximo</span>
    </div>
    <div className="flex flex-col py-4 space-y-2">
      <div className="flex justify-between w-full p-3 border-2 mx-auto border-zinc-500  rounded-2xl bg-skeleton animate-pulse">
        <span className="text-base md:text-2xl font-bold whitespace-nowrap text-transaction h-8 w-32">
        </span>
        <span className="text-base md:text-2xl font-bold whitespace-nowrap text-transaction h-8 w-32">
        </span>
      </div>
    </div>
  </>
  )
}

