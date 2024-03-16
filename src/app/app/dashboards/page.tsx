
'use client';

import { BiDownArrowCircle, BiHistory, BiUpArrowCircle } from 'react-icons/bi';
import { MdAttachMoney } from 'react-icons/md';

import BalanceCharts from '@/components/BalanceCharts';
import { TransactionProps } from '@/components/History';
// import LineCharts from '@/components/LineCharts';
import PieChartJs from '@/components/PieChartJs';
// import PieChart from '@/components/PieCharts';

import { toBRL } from '@/functions/toBRL';
import { useStoreSelector } from '@/hooks/useStoreSelector';
import { emerald, red} from 'tailwindcss/colors'

export default function Dashboards() {
  const { incomes, totIncome } = useStoreSelector((store) => store.Incomes);
  const { expenses, totExpenses} = useStoreSelector((store) => store.Expenses);
  const merged = expenses.concat(incomes);
  const balanceValue = totIncome - totExpenses;
  const mostRecentTransaction = merged.sort((a: TransactionProps, b: TransactionProps) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  })[0];
  return (
      <div className=" md:mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col rounded-md pl-6 p-6 border-2 border-zinc-400 bg-gradient-dark-blue lg:w-full">
          <h1 className="text-teal-400 tracking-tight text-4xl font-semibold">
            Painel Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-700 h-[8rem] rounded-lg w-42 p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className='text-base text-gray-50 semi-bold'>Saldo total</span>
                    <MdAttachMoney size={25} color='white'/>
                  </div>
                  <span className='text-xl font-semibold text-white'>
                    {isNaN(balanceValue) ? 'R$ 0.00' : toBRL(balanceValue)}
                  </span>
              </div>

              <div className="bg-dash h-[8rem] rounded-lg w-42 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className='text-base text-gray-100'>Despesas totais</span>
                  <BiDownArrowCircle color={red['500']} size={25}/>
                </div>
                <span className='text-xl font-semibold text-red-500'>
                  {isNaN(totExpenses) ? 'R$ 0.00' : toBRL(totExpenses)}
                </span>
              </div>

              <div className="bg-zinc-600 h-[8rem] rounded-lg w-42 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className='text-base text-gray-100'>Última transação</span>
                  <BiHistory color='white' size={20} />
                </div>
                  {
                    mostRecentTransaction?.type == 'expense' &&
                    <span className='text-lg font-semibold text-white'>
                      {isNaN(mostRecentTransaction.amount) ? 'R$ 0.00' : toBRL(-mostRecentTransaction.amount)}
                    </span>
                  }
                  {
                    mostRecentTransaction?.type == 'income' &&
                    <span className='text-lg font-semibold text-white'>
                      {isNaN(mostRecentTransaction.amount) ? 'R$ 0.00' : toBRL(mostRecentTransaction.amount)}
                    </span>
                  }
                  {
                    mostRecentTransaction == undefined &&
                    <span className='text-lg font-semibold text-white'>
                      R$ 0.00
                    </span>
                  }
              </div>

              <div className="bg-dash h-[8rem] rounded-lg w-42 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className='text-base text-gray-100'>Rendimentos totais</span>
                  <BiUpArrowCircle color={emerald['600']} size={25}/>
                </div>
                <span className='text-xl font-semibold text-money'>
                  {isNaN(totIncome) ? 'R$ 0.00' : toBRL(totIncome)}
                </span>
              </div>
            </div>
            <BalanceCharts text='Movimentação de saldo' merged={merged}/>
            <PieChartJs transaction={incomes} text='Rendimentos' />
            <PieChartJs transaction={expenses} text='Despesas' />
          </div>

        </div>
      </div>
  )
}

