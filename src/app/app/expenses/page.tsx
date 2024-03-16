import ExpenseItems from '@/components/ExpenseItems';
import FormExpense from '@/components/FormExpense';
import TotExpense from '@/components/TotExpense';
export default function Expenses() {
  return (
    <div className="h-full w-full">
      <div className=" sm:mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col rounded-md p-6 border-2 border-zinc-400 bg-gradient-dark-blue pb-32 lg:w-full">
          <h1 className="text-red-400 tracking-tight text-4xl font-semibold">
            Despesas
          </h1>
          <div className="flex text-white flex-col space-y-4 md:space-x-8 md:flex-row justify-between mt-5 ">
            <TotExpense></TotExpense>
          </div>
          <div className="flex sm:flex-row flex-col sm:space-x-8 mt-5">
            <FormExpense />
            <ExpenseItems></ExpenseItems>
          </div>
        </div>
      </div>
    </div>
  );
}
