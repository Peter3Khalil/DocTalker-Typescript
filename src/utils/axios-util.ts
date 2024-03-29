import axios from 'axios';
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

client.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error.response.data);
  },
);

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error)
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }

    return error.response.message || error.response.data;
  },
);

export default client;
