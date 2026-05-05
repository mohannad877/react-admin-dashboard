import axios from 'axios';

export class ApiClientFactory {
  static create(config = {}) {
    const { baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001', headers = {} } = config;
    
    const client = axios.create({ baseURL, headers: { 'Content-Type': 'application/json', ...headers } });
    
    client.interceptors.request.use((req) => {
      const token = localStorage.getItem('auth_token');
      if (token) req.headers.Authorization = `Bearer ${token}`;
      return req;
    });

    client.interceptors.response.use(
      (res) => res,
      (error) => {
        console.error('API Error:', error.response?.data?.message || error.message);
        return Promise.reject(error);
      }
    );

    return client;
  }
}

export const api = ApiClientFactory.create();
