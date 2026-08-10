import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL 

export const userService = {
  // Authentication
  register: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`);
    return response.data;
  },

  // User operations
  getMe: async () => {
    const response = await axios.get(`${API_BASE_URL}/auth/get-me`);
    return response.data;
  },

  getUserById: async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await axios.get(`${API_BASE_URL}/auth/getAllUsers`);
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await axios.put(`${API_BASE_URL}/auth/update-profile`, userData);
    return response.data;
  },

  deleteProfile: async () => {
    const response = await axios.delete(`${API_BASE_URL}/auth/delete-profile`);
    return response.data;
  },

  // Additional helper methods
  setAuthToken: (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }
};

export default userService;