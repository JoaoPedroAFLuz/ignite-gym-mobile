import { AppError } from '@utils/AppError';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.12.55:3333',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }

    return Promise.reject(error);
  }
);

export { api };
