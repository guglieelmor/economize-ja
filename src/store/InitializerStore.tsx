'use client';
import { useRef } from "react";

import { ExpenseProps } from "@/components/ExpenseItems";
import { IncomeProps } from "@/components/IncomeItems";

import { store } from "./store";

import { setExpenses } from "@/features/Expenses";
import { setIncomes } from "@/features/Incomes";
import { UserState, setUser } from "@/features/User";

interface Props {
  incomes: IncomeProps[]
  expenses: ExpenseProps[]
  user: UserState;
}
export default function InitializerStore (props : Props) {
  const initializer = useRef(false);

  if(!initializer.current) {
    store.dispatch(setIncomes(props.incomes))
    store.dispatch(setExpenses(props.expenses))
    store.dispatch(setUser(props.user))
    initializer.current = true
  }

  return null;
}
