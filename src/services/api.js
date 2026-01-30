import axios from 'axios';

// Create axios instance with base configuration
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000, // Increased to 30 seconds for Render wake-up time
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
API.interceptors.request.use(
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

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
  logout: () => API.post('/auth/logout'),
  getMe: () => API.get('/auth/me'),
  updatePassword: (passwordData) => API.put('/auth/update-password', passwordData),
};

// Profile API calls
export const profileAPI = {
  createOrUpdate: (profileData) => API.post('/profile', profileData),
  getMyProfile: () => API.get('/profile/my-profile'),
  getProfile: (id) => API.get(`/profile/${id}`),
  getAllProfiles: (params) => API.get('/profile', { params }),
  updateSection: (id, section, data) => API.put(`/profile/section/${id}?section=${section}`, data),
  deleteProfile: (id) => API.delete(`/profile/${id}`),
  getStats: () => API.get('/profile/stats'),
};

// Student API calls
export const studentAPI = {
  // Get student profile
  getProfile: async () => {
    try {
      const response = await API.get('/students/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },

  // Update student profile
  updateProfile: async (profileData) => {
    try {
      const response = await API.put('/students/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  // Get all students (admin)
  getAllStudents: async () => {
    try {
      const response = await API.get('/students/all');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch students' };
    }
  }
};

export default API;
