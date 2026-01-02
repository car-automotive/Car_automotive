import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors (backend not running)
    if (!error.response) {
      console.warn('Backend server may not be running:', error.message);
      // Don't redirect on network errors - just let the request fail
      return Promise.reject(error);
    }

    // Only redirect on 401 if we have a token (user was logged in)
    if (error.response?.status === 401 && localStorage.getItem('token')) {
      localStorage.removeItem('token')
      // Only redirect if not already on login/register page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login'
      }
    }
    // Don't crash on other errors - let components handle them
    return Promise.reject(error)
  }
)

export default api

