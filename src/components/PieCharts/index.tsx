import React, { useRef } from 'react'

import { TransactionProps } from '../History'

import { toBRL } from '@/functions/toBRL';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface PieProps{
  transaction: TransactionProps[],
  text: string,
}
export default function PieChart({ transaction, text }: PieProps) {

  const group = transaction.reduce<{ [key: string]: number }>((groups, transaction: TransactionProps) => {
                const { category, amount } = transaction;
                  if (category && groups[category]) {
                    groups[category] += amount;
                  } else {
                    groups[category] = amount;
                  }
                  return groups;
              }, {})

  const data = Object.entries(group);
  const options: Highcharts.Options = {
    title: {
        text: text,
        style: {
          color: '#FFFF'
        }
    },
    chart: {
      backgroundColor: 'transparent',
      style: {
        color: '#ffff', // Define a cor do texto no gráfico (preto)
      },
    },
    accessibility: {
      enabled: false
    },

    series: [
      {
        type: 'pie',
        data: data,
        dataLabels: {
          enabled: true,
          style: {
            color: '#FFFF', // Define a cor do texto nos dataLabels (preto)
          },
          formatter: function(){
            if(this.point.options.y)
            return `${this.point.options.name} <br/>`+ toBRL(this.point.options.y);
          }
        }
      },
    ],

    tooltip: {
      headerFormat: '',
      pointFormatter: function () {
        if(this.options.y) return `${this.options.name}: ${toBRL(this.options.y)}`;
        return ``
      },
    },
  };
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <div className="text-white p-4 flex justify-center bg-dash rounded-lg">
      <HighchartsReact
      highcharts={Highcharts}
      containerProps={{ style: { width: "100%", height: "100% " } }}
      options={options}
      ref={chartComponentRef}
      />
  </div>
  )
}
