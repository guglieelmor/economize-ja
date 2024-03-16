'use client';
import { useEffect, useState } from 'react';

import { useStoreSelector } from '@/hooks/useStoreSelector';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export interface DataTransaction {
  date: string;
  expense: number;
  income: number;
}

export default function Dashboard() {
  const { expenses } = useStoreSelector((store) => store.Expenses);
  const { incomes } = useStoreSelector((store) => store.Incomes);
  const [finances, setFinances] = useState<DataTransaction[]>([]);
  let merged = [{_id: '', date: '',type: '', amount: 0}];
  useEffect(() => {
    if (expenses.length > 0 || incomes.length > 0) {
      merged = expenses.concat(incomes);
      const transactions = merged.map((transaction) => {
        return {
          date: transaction.date,
          [transaction.type]: transaction.amount
        };
      });

      const formatedData = transactions
        .sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
        .map((item) => ({
          date: new Date(item.date).toLocaleDateString(),
          income: (item.income as number) || 0,
          expense: (item.expense as number) || 0
        }))
        .reduce<{ [key: string]: DataTransaction }>((acc, item) => {
          const { date, income, expense } = item;
          const existingData = acc[date] || { date, income: 0, expense: 0 };
          const newData = {
            date,
            income: existingData.income + income,
            expense: existingData.expense + expense
          };
          return { ...acc, [date]: newData };
        }, {});

       if(Object.keys(formatedData).includes('Invalid Date')){
         setFinances([{ date: '', income: 0, expense: 0}]);
        }else{
          setFinances(Object.values(formatedData));
        }
    }
  }, [expenses, incomes]);
  const ticks = Array.from(new Set(finances.map((item) => item.date)));
  return (
    <>
    {
    finances.length > 0 &&
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={800} height={400} data={finances}>
          <XAxis
            dataKey="date"
            ticks={ticks }
          />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            name="Rendimentos"
            dataKey="income"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            name="Despesas"
            dataKey="expense"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    }
    {
      (merged.length == 2 && merged[0]?._id == '') &&
      <Skeleton />
    }
    </>
  );
}

const Skeleton = () => {
  return(
    <div className="bg-skeleton h-full w-full animate-pulse"></div>
  )
}
