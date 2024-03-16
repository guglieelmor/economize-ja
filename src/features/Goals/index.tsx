import { GoalState } from '@/app/app/goals/page';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

export interface GoalStates extends GoalState {
  _id: string;
  createdAt: string;
}
export interface GoalsStates {
  goals: GoalStates[];
}
const initialState: GoalsStates = {
  goals: [
    {
      _id: '',
      title: '',
      initialValue: 0,
      endGoalValue: 1,
      interestRate: 0,
      monthlyValue: 0,
      balanceCategory: 'Saldo total',
      createdAt: '',
    }
  ],
};

export const goalsSlice = createSlice({
  name: 'Goal',
  initialState,
  reducers: {
    setGoals: (
      state: GoalsStates,
      action: PayloadAction<GoalStates[]>
    ) => {
      state.goals = action.payload;
    },
    incrementGoals: (
      state: GoalsStates,
      action: PayloadAction<GoalStates>
    ) => {
      if(state.goals[0]._id === ''){
        state.goals[0] = action.payload
        return;
      }
      state.goals.push(action.payload);
    },
    updateGoal: (
      state: GoalsStates,
      action: PayloadAction<GoalStates>
    ) => {
      const update = action.payload;
      state.goals = state.goals.map((goal) => {
        if (goal._id == update._id) {
          return update;
        }
        return goal;
      });
    },
    deleteGoals: (
      state: GoalsStates,
      action: PayloadAction<GoalStates>
    ) => {
      state.goals = state.goals.filter(
        (goal) => goal._id !== action.payload._id
      );
    }
  }
});

export const { setGoals, incrementGoals, deleteGoals, updateGoal } =
  goalsSlice.actions;
export const goalsReducer = goalsSlice.reducer;
