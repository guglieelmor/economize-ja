import React from 'react'
import { Line } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, TooltipItem } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, Legend,ChartDataLabels );

interface TransactionProps {
    date: string;
    amount: number;
    type: string;
}

interface DataTransaction {
  date: string;
  amount: number;
}

interface LineProps{
  merged: TransactionProps[],
  text: string,
}

export default function BalanceCharts({ merged, text }: LineProps) {

  const transactions = merged.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  })
  .map((transaction) => {

    if(transaction.type == 'income'){
    return {
      date: transaction.date,
      amount: transaction.amount
    };
    }else{
      return {
        date: transaction.date,
        amount: -transaction.amount
      };
    }
  });

  const totTransactions =
  transactions
  .reduce<{ [key: string]: DataTransaction }>((acc: any, item) =>
    {
      const { date, amount } = item;
      const existingData = acc[date] || { date, amount: 0};
      const newData = {
        date,
        amount: existingData.amount + amount
      };

      return { ...acc, [date]: newData };
    }
  , {});

  const objTransacitons = Object.values(totTransactions);

  const totAmounts = objTransacitons.reduce<any>((acc, item, index) => {
  const { date, amount} = item;
  acc.amount += amount;
  const data = {
    date,
    amount: acc.amount
  }


  return { ...acc, [index]:data}
  },{amount: 0});
  delete totAmounts.amount;

  const getDataForChart = (data: TransactionProps[]): ChartData<"line"> => {
    const labels = data.map((item) => new Date(item.date).toLocaleDateString()); // Array com as datas
    const amounts = data.map((item) => item.amount); // Array com os valores

    return {
      labels: labels,
      datasets: [
        {
          label: 'Saldo',
          data: amounts,
          fill: 'start',
          tension: 0.3,
          // backgroundColor: 'rgb(29, 146, 146, 0.1)',

          backgroundColor(context) {
              const bgColor = [
                'rgb(120, 154, 76, 0.8)',
                'rgb(91, 119, 75, 0.7)',
                'rgb(49, 70, 74, 0.6)',
                'rgb(34, 53, 73, 0.5)',
              ]

              if(!context.chart.chartArea){
                return
              }

              const { ctx, chartArea: {top, bottom} } = context.chart;

              const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);

              const colorTranches = 1 / (bgColor.length - 1);

              for(let i = 0; i < bgColor.length - 1; i++){
                gradientBg.addColorStop(0 + i * colorTranches, bgColor[i])
              }


              return gradientBg;
          },

          borderColor:  'rgb(148, 204, 90)',
          borderWidth: 4,
          pointBorderColor: 'rgb(148, 204, 90)',
          pointBackgroundColor: 'rgb(148, 204, 90)',
          pointBorderWidth: 0.5,

        }
      ]
    };
  };

  const chartData = getDataForChart(Object.values(totAmounts));
  const optionsLineChart = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        display: false, // Desabilita os data labels para todos os tipos de gráficos
      },
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
        radius: 4,
        hoverRadius: 6,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#ffffff',
          display: false,
        },
        beginAtZero: true,
        ticks: {
          color: 'white'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#999797',
          display: false,
        },
        ticks: {
          color: 'rgb(148, 204, 90)',
          callback: (value: number | string) => Intl.NumberFormat('en', { notation: 'compact'}).format(Number(value)),
        }
      }
    },
  };

  return (
    <div className="bg-dash rounded-lg p-4 text-white flex gap-2 items-center flex-col">
      <h1 className="text-left text-xl font-bold">{text}</h1>
      <div className="w-full h-full bg-transparent p-1 rounded-lg">
        {merged.length > 0
          &&
          <Line data={chartData} options={optionsLineChart} />
        }
      </div>
    </div>
  )
}
