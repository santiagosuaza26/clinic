import axios, { AxiosResponse } from 'axios';
import { User, ApiConfig } from '@/types';

// Configuración de la API
const API_CONFIG: ApiConfig = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
};

// Crear instancia de axios
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
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

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface LoginResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * Servicio de autenticación para comunicación con la API
 */
export const authService = {
  /**
   * Iniciar sesión de usuario
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await api.post('/auth/login', credentials);

      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Error en el servidor. Intente nuevamente.');
    }
  },

  /**
   * Obtener información del usuario actual
   */
  async getCurrentUser(token: string): Promise<User> {
    try {
      const response: AxiosResponse<User> = await api.get('/auth/me');

      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Error al obtener información del usuario');
    }
  },

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Ignorar errores en logout
      console.warn('Error during logout:', error);
    } finally {
      localStorage.removeItem('token');
    }
  },

  /**
   * Verificar si el usuario tiene permisos para ver información de pacientes
   */
  async canViewPatientInfo(userCedula: string): Promise<boolean> {
    try {
      const response: AxiosResponse<boolean> = await api.get(`/users/${userCedula}/can-view-patients`);
      return response.data;
    } catch (error: any) {
      throw new Error('Error al verificar permisos de paciente');
    }
  },

  /**
   * Verificar si el usuario puede gestionar usuarios
   */
  async canManageUsers(userCedula: string): Promise<boolean> {
    try {
      const response: AxiosResponse<boolean> = await api.get(`/users/${userCedula}/can-manage-users`);
      return response.data;
    } catch (error: any) {
      throw new Error('Error al verificar permisos de gestión de usuarios');
    }
  },

  /**
   * Verificar si el usuario puede registrar pacientes
   */
  async canRegisterPatients(userCedula: string): Promise<boolean> {
    try {
      const response: AxiosResponse<boolean> = await api.get(`/users/${userCedula}/can-register-patients`);
      return response.data;
    } catch (error: any) {
      throw new Error('Error al verificar permisos de registro de pacientes');
    }
  },

  /**
   * Refrescar token de autenticación
   */
  async refreshToken(): Promise<string> {
    try {
      const response: AxiosResponse<{ token: string }> = await api.post('/auth/refresh');
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      return newToken;
    } catch (error: any) {
      localStorage.removeItem('token');
      throw new Error('Sesión expirada. Por favor inicie sesión nuevamente.');
    }
  },
};

// Configurar interceptor para refresh token automático
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch((err) => {
          throw err;
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await authService.refreshToken();
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);