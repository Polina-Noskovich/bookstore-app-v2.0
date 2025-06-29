import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userName: string | null;
  isLoggedIn: boolean;
}

const savedUser = localStorage.getItem('bookstoreUser');
const initialState: AuthState = savedUser
  ? { userName: JSON.parse(savedUser), isLoggedIn: true }
  : { userName: null, isLoggedIn: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.userName = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('bookstoreUser', JSON.stringify(action.payload));
    },
    logout(state) {
      state.userName = null;
      state.isLoggedIn = false;
      localStorage.removeItem('bookstoreUser');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
