import { createSlice } from '@reduxjs/toolkit';
import { browserStorage } from '../../constants/storage';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const userEmail = localStorage.getItem(browserStorage.email)
  ? localStorage.getItem(browserStorage.email)
  : null;
const userID = localStorage.getItem(browserStorage.userID)
  ? localStorage.getItem(browserStorage.userID)
  : null;

const initialState = {
  user: {
    email: userEmail,
    userID: userID
  },
  isLoggedIn: !!userEmail,
  accessToken: cookies.get(browserStorage.accessToken) || null,
  isAuthModalOpen: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      cookies.set(browserStorage.accessToken, action.payload.accessToken, {
        path: '/',
        maxAge: 3600 * 24 * 7
      });
      localStorage.setItem(
        browserStorage.email,
        action.payload.action.payload.user.email
      );
      localStorage.setItem(
        browserStorage.userID,
        action.payload.action.payload.user.userID
      );
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.accessToken = null;
      cookies.remove(browserStorage.accessToken);
      localStorage.removeItem(browserStorage.email);
      localStorage.removeItem(browserStorage.userID);
    },
    toggleAuthModal: (state, action) => {
      state.isAuthModalOpen = action.payload;
    }
  }
});

export default authSlice.reducer;

export const { setCredentials, logout, toggleAuthModal } = authSlice.actions;
