import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

interface AuthState {
  isAuthenticated: number;
}
const initialState: AuthState = {
  isAuthenticated: 0
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAuthenticated: (state: AuthState, action: PayloadAction<number>) => {
      state.isAuthenticated = action.payload;
    }
  }
});

export const { setAuthenticated } = authSlice.actions;
export const authReducer = authSlice.reducer;
