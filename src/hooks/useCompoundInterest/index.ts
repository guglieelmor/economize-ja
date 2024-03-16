import { date } from "@/functions/date";

interface CompoundInterest {
  currentValue: number;
  monthlyValue: number;
  interestRate: number,
  endGoalValue: number;
  amountMonths?: number;
}
export const useCompoundInterest = ({currentValue, monthlyValue, interestRate, endGoalValue, amountMonths = 0}: CompoundInterest) => {
  const precision = 100000;
  const ciInitialValue = currentValue;

  let jurospush = 0;
  let accumulatedMoney = ciInitialValue;

  let investedMoney = 0;

  let totalInterest = 0;

  let accumulatedMoneyList = [ciInitialValue];
  let investedMoneyList = [ciInitialValue];
  let totalInterestList = [0];
  let interestList = [0];

  let accumulatedMoneyListYear = [ciInitialValue];
  let investedMoneyListYear = [ciInitialValue];
  let totalInterestListYear = [0];
  let interestListYear = [0];
  let indexInterestYear = 0;

  const ciMonthValue = monthlyValue;
  const ciInterestRate = ((Math.pow(interestRate / 100 + 1, 1 / 12) - 1) * 100) / 100;
  let periodMonths = 0;

  if(amountMonths == 0){
    for (let i = 1; accumulatedMoney <= endGoalValue; i++) {
      /* calculo do juros */
      totalInterest =(accumulatedMoney * ciInterestRate * precision) / precision;

      accumulatedMoney = (accumulatedMoney) + (totalInterest);

      /* calcula os juros acumulados */
      jurospush = (jurospush) + (totalInterest);

      /* calcula acumulado de aportes */
      investedMoney = (ciInitialValue) + (ciMonthValue) * i;

      /* soma o aporte mensal OBS: Poder cria uma opção avançada de selecionar*/
      accumulatedMoney = (accumulatedMoney) + (ciMonthValue);

      accumulatedMoneyList = [...accumulatedMoneyList, accumulatedMoney];
      investedMoneyList = [...investedMoneyList, investedMoney];
      interestList = [...interestList, totalInterest];
      totalInterestList = [
        ...totalInterestList,
        accumulatedMoney - investedMoney,
      ];

      if (i % 12 == 0) {
        accumulatedMoneyListYear = [
          ...accumulatedMoneyListYear,
          accumulatedMoney,
        ];
        investedMoneyListYear = [...investedMoneyListYear, investedMoney];
        totalInterestListYear = [
          ...totalInterestListYear,
          accumulatedMoney - investedMoney,
        ];

        interestListYear = [
          ...interestListYear,
          totalInterestListYear[indexInterestYear + 1] -
            totalInterestListYear[indexInterestYear],
        ];

        indexInterestYear++;
      }
      periodMonths = i;
    }
  }else{

    for (let i = 1; i <= amountMonths; i++) {
      /* calculo do juros */
      totalInterest =(accumulatedMoney * ciInterestRate * precision) / precision;

      accumulatedMoney = (accumulatedMoney) + (totalInterest);

      /* calcula os juros acumulados */
      jurospush = (jurospush) + (totalInterest);

      /* calcula acumulado de aportes */
      investedMoney = (ciInitialValue) + (ciMonthValue) * i;

      /* soma o aporte mensal OBS: Poder cria uma opção avançada de selecionar*/
      accumulatedMoney = (accumulatedMoney) + (ciMonthValue);

      accumulatedMoneyList = [...accumulatedMoneyList, accumulatedMoney];
      investedMoneyList = [...investedMoneyList, investedMoney];
      interestList = [...interestList, totalInterest];
      totalInterestList = [
        ...totalInterestList,
        accumulatedMoney - investedMoney,
      ];

      if (i % 12 == 0) {
        accumulatedMoneyListYear = [
          ...accumulatedMoneyListYear,
          accumulatedMoney,
        ];
        investedMoneyListYear = [...investedMoneyListYear, investedMoney];
        totalInterestListYear = [
          ...totalInterestListYear,
          accumulatedMoney - investedMoney,
        ];

        interestListYear = [
          ...interestListYear,
          totalInterestListYear[indexInterestYear + 1] -
            totalInterestListYear[indexInterestYear],
        ];

        indexInterestYear++;
      }
      periodMonths = i;
    }
  }


  const totalAmountInterest = accumulatedMoney - investedMoney;

  const currentDate = new Date();
  const futureDate = new Date(currentDate);

  const currentMonth = futureDate.getMonth();
  futureDate.setMonth(currentMonth + periodMonths);

  if (futureDate.getMonth() !== (currentMonth + 198) % 12) {
    futureDate.setDate(0);
  }

  const estimatedDate = date(futureDate, {
    month: '2-digit',
    year: 'numeric'
  })
  return {
    periodMonths,
    accumulatedMoney,
    investedMoney,
    totalAmountInterest,
    estimatedDate
  }

}
