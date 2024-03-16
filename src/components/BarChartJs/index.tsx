import React from 'react';
import Chart from 'react-apexcharts'

import { GoalsStates } from '@/features/Goals';
import { useBalanceValue } from '@/hooks/useBalanceValue';




// ChartJS.register(ArcElement, Tooltip, Legend);
export default function BarChartJs({goals}: GoalsStates) {

  const { balanceValue, incomes } = useBalanceValue();
  const labels = goals.map((goal) => goal.title);
  const chartData = goals.map((goal) => {
    let currentValue = 0;

    const incomeFilter = incomes.filter((income) => income.category == goal.balanceCategory);
    if(goal.balanceCategory == 'Saldo Total'){
      currentValue = balanceValue + goal.initialValue;
    }else{
      currentValue = incomeFilter.reduce((acc, item) => {
        acc = item.amount
        return acc
      },0) + goal.initialValue;
    }

    const completionPercentage = (((currentValue) * 100) / goal.endGoalValue);
    const percentage = (completionPercentage > 100) ? 100 : completionPercentage;
    return {percentage, goal: goal.endGoalValue, currentValue}
  })


  return (

      <div className="flex w-96 items-center justify-center">
        <Chart width={350} height={350} type='bar'
          series={[{
            name: 'Valor atual',
            data: chartData.map((data) => {
              return Number(data.percentage.toFixed(2))
            })
          },
          ]}
          options={{
              labels: labels,
              chart: {
                stacked: false,
                toolbar: {
                  show: false
                }
              },
              yaxis: {
                max: 100,
                labels: {
                  style: {
                    colors: ['#FFF'],
                  },
                  formatter(val) {
                      return val + '%'
                  },
                },
              },
              xaxis: {
                labels: {
                  style: {
                    colors: '#FFF',
                    fontSize: '10px'
                  },
                  rotate: 0,
                  hideOverlappingLabels: false,
                  trim: true,

                },

              },
              dataLabels: {
                formatter(val) {
                    return val + '%'
                },
              },
              grid: {
                show: false
              },
              tooltip: {
                enabled: true,
                theme: 'dark',
              },
              legend: {
                show: false,
              },


          }}
        />
      </div>
  )
}
