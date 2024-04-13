/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { browserStorage } from '../constants/storage';
import { Cookies } from 'react-cookie';
import { showToastError } from './toast';

// Recommended approach to avoid circular import dependency error

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

const publicAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});
const privateAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const cookies = new Cookies();

// Request interceptor to add the access token from the cookie
privateAxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = cookies.get(browserStorage.accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized: Clear cookie and localStorage
      // TODO: Redirect to login page
      cookies.remove(browserStorage.accessToken);
      showToastError('Session expired. Please login again');
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { privateAxiosInstance, publicAxiosInstance };
