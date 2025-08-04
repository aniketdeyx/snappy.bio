import axios from 'axios';
import type { AxiosResponse } from 'axios';

// Get API base URL based on environment
const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    // In production, use your Render backend URL
    // Replace 'your-backend-name' with your actual Render service name
    return 'https://snappy-bio.onrender.com/api'; 
  }
  return 'https://snappy-bio.onrender.com/api'; // Development
};

// Create axios instance with default config
const api = axios.create({
  baseURL: getApiBaseUrl(),
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
  links?: LinkItem[];
  bgColor: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  user?: T;
  error?: string;
}


export const authApi = {

  login: async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.post('/auth/login', credentials);
    return response.data;
  },


  register: async (credentials: RegisterCredentials): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.post('/auth/register', credentials);
    return response.data;
  },


  logout: async (): Promise<ApiResponse> => {
    const response: AxiosResponse<ApiResponse> = await api.post('/auth/logout');
    return response.data;
  },


  checkAuth: async (): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.get('/auth/verify');
    return response.data;
  },
};

export const userApi = {

  getProfile: async (): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.get('/user/profile');
    return response.data;
  },


  updateProfile: async (profileData: ProfileUpdateData): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.put('/user/profile', profileData);
    return response.data;
  },

  getPublicProfile: async (username: string): Promise<User> => {
    const response: AxiosResponse<User> = await api.get(`/user/profile/${username}`);
    return response.data;
  },
};

// Upload API calls
export const uploadApi = {

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

export default api;
