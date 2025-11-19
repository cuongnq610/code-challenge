import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://interview.switcheo.com/',
  timeout: 1000 * 60,
});

// TODO: Add interceptors if needed
