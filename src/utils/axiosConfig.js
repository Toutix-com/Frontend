/* eslint-disable no-underscore-dangle */
import axios from 'axios';

let store;

// Recommended approach to avoid circular import dependency error
export const injectStore = (_store) => {
  store = _store;
};

export const apiErrorResponse = (error) => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
};

export const publicAxiosInstance = axios.create({
  baseURL: 'https://dxma1-3a04933dcf2c.herokuapp.com/api',
  withCredentials: true
});
export const privateAxiosInstance = axios.create({
  baseURL: 'https://dxma1-3a04933dcf2c.herokuapp.com/api',
  withCredentials: true
});

privateAxiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().auth;

    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      };
    }

    return config;
  },
  (err) => Promise.reject(err)
);
