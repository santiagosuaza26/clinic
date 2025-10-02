import axios, { AxiosResponse } from 'axios';
import { ApiConfig } from '@/types';

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

/**
 * Servicio base para comunicación con la API
 * Proporciona métodos comunes y manejo de errores
 */
export class ApiService {
  /**
   * Realizar petición GET
   */
  static async get<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await api.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en la petición');
    }
  }

  /**
   * Realizar petición POST
   */
  static async post<T>(url: string, data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await api.post(url, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en la petición');
    }
  }

  /**
   * Realizar petición PUT
   */
  static async put<T>(url: string, data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await api.put(url, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en la petición');
    }
  }

  /**
   * Realizar petición DELETE
   */
  static async delete<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await api.delete(url);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en la petición');
    }
  }

  /**
   * Manejar errores de API
   */
  static handleError(error: any): string {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
    return 'Error desconocido en la comunicación con el servidor';
  }
}

export default api;