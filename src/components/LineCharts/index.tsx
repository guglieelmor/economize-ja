import React from 'react'
import { Line } from "react-chartjs-2";


import { TransactionProps } from "@/components/History";


import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, TooltipItem } from "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TotTransactionProps {
    date: string;
    amount: number;
}

interface LineProps{
  transaction: TransactionProps[] | TotTransactionProps[],
  text: string,
  color?: string,
}

export default function LineCharts({ transaction, text, color = 'rgb(75, 192, 192)'}: LineProps) {

  const getDataForChart = (data: TransactionProps[] | TotTransactionProps[]): ChartData<"line"> => {

    const mutableArray = [...data];
    const sortData = mutableArray.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    const labels = sortData.map((item) => new Date(item.date).toLocaleDateString()); // Array com as datas
    const amounts = sortData.map((item) => item.amount); // Array com os valores

    return {
      labels: labels,
      datasets: [
        {
          label: 'Valor',
          data: amounts,
          fill: true,
          borderColor: color,
          tension: 0.1
        }
      ]
    };
  };

  const chartData = getDataForChart(transaction);

  const optionsLineChart = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                // Formate o valor conforme necessário
                label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
              }
              return label;
          },
        }
      }
    },
    elements: {
      point: {
        radius: 6,
        hoverRadius: 8
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: '#999797',
        }
      },
      y: {
        grid: {
          color: '#999797',
        },
        ticks: {
          color: 'white',
          callback: (value: number | string) => Intl.NumberFormat('en', { notation: 'compact'}).format(Number(value)),
        }
      }
    }
  };

  return (
    <div className="h-9/12 p-4 rounded-lg bg-dark-blue text-white flex gap-8 items-center justify-center flex-col">
      <h1 className="text-center text-xl font-bold">{text}</h1>
      <div className="h-92">
        <Line data={chartData} options={optionsLineChart} />
      </div>
    </div>
  )
}
