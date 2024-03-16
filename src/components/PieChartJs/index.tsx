import React from 'react';
import { Pie } from 'react-chartjs-2';

import { TransactionProps } from '../History';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, TooltipItem } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Context} from 'chartjs-plugin-datalabels';

export default function PieChartJs({ transaction, text}: { transaction: TransactionProps[], text: string}) {

  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
  const group = transaction.reduce<{ [key: string]: number }>((groups, transaction: TransactionProps) => {
    const { category, amount } = transaction;
      if (category && groups[category]) {
        groups[category] += amount;
      } else {
        groups[category] = amount;
      }
      return groups;
  }, {})

  const groupKeys = Object.keys(group)
  const data: ChartData<"pie", number[], string> = {
    labels: groupKeys,

    datasets: [
      {
        label: text + ':',
        data: Object.values(group),
        backgroundColor: ['#2caffe','#544fc5',  '#00e272', '#fe6a35'],
        hoverBackgroundColor: ['#45c8ff','#6d68de', '#19fb8b', '#ff834e'],
        borderWidth: 1,
        type: 'pie',
      },
    ],

  };

  const options: any= {
    responsive: true,
    layout: {
      padding: {
        top: 16,
      },
    },
    plugins: {
      legend: {
        align: 'center',
        position: 'bottom',
        labels: {
          padding: 18,
          color: '#FFF'
        }
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"pie">) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              // Formate o valor conforme necessário
              label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed);
            }
            return label;
          },
        },
      },
      datalabels: {
        color: '#ffffff',
        anchor: 'center',
        align: 'center',
        clamp: true,
        font: {
          weight: 'bold',
          size: 12.5,
        },
        padding: {
          bottom: 4,
        },
        textAlign: 'center',
        formatter(value: number, context: Context) {
            const category = groupKeys[context.dataIndex]
            const actuallyCategory = context.chart.legend?.legendItems?.filter((category) => category.hidden === false);
            const totTransaction = actuallyCategory?.map((category) => {
              return group[category.text];
            }).reduce((acc, actuallyValue) => acc + actuallyValue, 0);

            if(totTransaction){
              const perc = Math.floor((value / totTransaction) * 100);
              if(perc >= 7){
                return `${category}\n${perc}%`
              }else{
                return `${perc}%`
              }
            }
        },

      }
    },
  }

  return (
    <div className="bg-dash py-2 rounded-lg text-white flex flex-col">
      <h1 className="text-center text-xl font-bold">{text}</h1>
        <div className="flex h-96 items-center justify-center">
          <Pie data={data} options={options} />
        </div>
    </div>
  )
}
