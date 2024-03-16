import { toBRL } from '@/functions/toBRL';

interface Expense {
  expense: string;
  value: number;
}
export default function Expenses(props: Expense) {
  const { expense, value } = props;
  return (
    <div className="flex justify-between w-full p-3 border-2 mx-auto border-zinc-500  rounded-2xl bg-zinc-100">
      <span className="text-base md:text-2xl font-medium text-red-600">
        {expense}
      </span>
      <span className="text-base md:text-2xl font-bold whitespace-nowrap text-red-700">
        {toBRL(value)}
      </span>
    </div>
  );
}
