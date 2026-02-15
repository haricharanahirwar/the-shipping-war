/**
 * API Client Utility for Frontend
 * Automatically attaches JWT token to requests
 */

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login if token is actually invalid/expired
    // Don't redirect on other 401 errors (like wrong credentials during login)
    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.message || '';
      const errorCode = error.response?.data?.code || '';
      
      // Only clear session if token is expired or invalid
      if (errorCode === 'TOKEN_EXPIRED' || errorMessage.includes('token') || errorMessage.includes('Token')) {
        console.log('Token expired or invalid, logging out...');
        localStorage.clear();
        window.dispatchEvent(new Event('authStateChanged'));
        
        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
