import axios from 'axios';
import type { AxiosResponse } from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // Include cookies with all requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for API responses
export interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
  profileImage?: string;
  links: LinkItem[];
  appearance?: {
    bgColor: string;
  };
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
}

export interface ProfileUpdateData {
  username: string;
  bio: string;
  profileImage?: string;
  links: LinkItem[];
  bgColor: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  user?: T;
  error?: string;
}

// Auth API calls
export const authApi = {
  /**
   * Login user with email and password
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * Register new user
   */
  register: async (credentials: RegisterCredentials): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.post('/auth/register', credentials);
    return response.data;
  },

  /**
   * Logout current user
   */
  logout: async (): Promise<ApiResponse> => {
    const response: AxiosResponse<ApiResponse> = await api.post('/auth/logout');
    return response.data;
  },

  /**
   * Check if user is authenticated
   */
  checkAuth: async (): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.get('/auth/check');
    return response.data;
  },
};

// User/Profile API calls
export const userApi = {
  /**
   * Get current user's profile
   */
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.get('/user/profile');
    return response.data;
  },

  /**
   * Update current user's profile
   */
  updateProfile: async (profileData: ProfileUpdateData): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.put('/user/profile', profileData);
    return response.data;
  },

  /**
   * Get public profile by username
   */
  getPublicProfile: async (username: string): Promise<User> => {
    const response: AxiosResponse<User> = await api.get(`/user/profile/${username}`);
    return response.data;
  },
};

// Upload API calls
export const uploadApi = {
  /**
   * Upload profile image
   */
  uploadImage: async (imageFile: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response: AxiosResponse<{ url: string }> = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Export the main axios instance for custom requests if needed
export default api;
