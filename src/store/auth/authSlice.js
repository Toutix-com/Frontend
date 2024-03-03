import { createSlice } from '@reduxjs/toolkit';
import { browserStorage } from '../../constants/storage';

const storedUser =
  JSON.parse(localStorage.getItem(browserStorage.user)) || null;
const isLoggedIn = localStorage.getItem(browserStorage.isLoggedIn)
  ? JSON.parse(localStorage.getItem(browserStorage.isLoggedIn))
  : false;

const initialState = {
  user: storedUser,
  isLoggedIn: Boolean(isLoggedIn),
  isAuthModalOpen: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem(browserStorage.user, JSON.stringify(action.payload));
      localStorage.setItem(browserStorage.isLoggedIn, JSON.stringify(true));
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem(browserStorage.user);
      localStorage.removeItem(browserStorage.isLoggedIn);
    },
    toggleAuthModal: (state, action) => {
      state.isAuthModalOpen = action.payload;
    }
  }
});

export default authSlice.reducer;

export const { setCredentials, logout, toggleAuthModal } = authSlice.actions;
