'use client';

import Expense from '@/components/Expense';
import History from '@/components/History';
import Salary from '@/components/Salary';
import Transactions from '@/components/Transactions';
import Welcome from '@/components/Welcome';

export default function App() {
  return (
    <div className="h-full w-full">
      <div className=" md:mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col pb-5 px-2">
          <Welcome />
          <span className="text-xl text-zinc-400">
            Confira seus rendimentos
          </span>
        </div>
        <div className="flex flex-col rounded-md p-6 border-2 border-zinc-400 bg-gradient-dark-blue pb-32 lg:w-full">
          <h1 className="text-teal-400 tracking-tight text-4xl font-semibold">
            Todas as transações
          </h1>
          <div className="flex text-white flex-col space-y-4 md:space-x-8 md:flex-row justify-between mt-5 ">
            <Transactions />
            <div className="flex flex-col w-full">
              <History />
              <Salary></Salary>
              <Expense></Expense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
