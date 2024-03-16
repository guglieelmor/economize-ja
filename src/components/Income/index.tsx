import { toBRL } from '@/functions/toBRL';

interface Income {
  income: string;
  value: number;
}
export default function Income(props: Income) {
  const { income, value } = props;
  return (
    <div className="flex justify-between w-full p-3 border-2 mx-auto border-zinc-500  rounded-2xl bg-zinc-50">
      <span className="text-base md:text-2xl font-medium text-emerald-600">
        {income}
      </span>
      <span className="text-base md:text-2xl font-bold text-emerald-700">
        {toBRL(value)}
      </span>
    </div>
  );
}
