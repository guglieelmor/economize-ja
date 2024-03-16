import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

export interface expenseCategories {
  expenseCategory: string
}

export interface incomeCategories {
  incomeCategory: string
}
export interface UserState {
  id: string;
  fullname: string;
  email: string;
  avatar: string;
  expenseCategories: expenseCategories[];
  incomeCategories: incomeCategories[];
}
const initialState: UserState = {
  id: '',
  fullname: '',
  email: '',
  avatar: 'avatars/6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws',
  expenseCategories: [
    {expenseCategory: 'Moradia'},
    {expenseCategory: 'Alimentação'},
    {expenseCategory: 'Assinaturas'},
    {expenseCategory: 'Transporte'},
    {expenseCategory: 'Saúde'},
    {expenseCategory: 'Educação'},
    {expenseCategory: 'Dívidas'},
    {expenseCategory: 'Transações'},
    {expenseCategory: 'Outros'},
  ],
  incomeCategories: [
    {incomeCategory: 'Salário'},
    {incomeCategory: 'Freelance'},
    {incomeCategory: 'Investimentos'},
    {incomeCategory: 'Vendas'},
    {incomeCategory: 'Outros'},
  ]
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      if(action.payload.avatar) state.avatar = action.payload.avatar;
      if(action.payload.expenseCategories) state.expenseCategories = action.payload.expenseCategories;
      if(action.payload.incomeCategories) state.incomeCategories = action.payload.incomeCategories;
    }
  }
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
