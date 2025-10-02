import { ApiService } from './apiService';
import { User, CreateUserDTO, UpdateUserDTO } from '@/types';

/**
 * Servicio para operaciones relacionadas con usuarios
 */
export const userService = {
  /**
   * Obtener todos los usuarios
   */
  async getAllUsers(): Promise<User[]> {
    return ApiService.get<User[]>('/users');
  },

  /**
   * Buscar usuario por cédula
   */
  async getUserByCedula(cedula: string): Promise<User> {
    return ApiService.get<User>(`/users/cedula/${cedula}`);
  },

  /**
   * Buscar usuario por ID
   */
  async getUserById(userId: string): Promise<User> {
    return ApiService.get<User>(`/users/id/${userId}`);
  },

  /**
   * Buscar usuario por nombre de usuario
   */
  async getUserByUsername(username: string): Promise<User> {
    return ApiService.get<User>(`/users/username/${username}`);
  },

  /**
   * Obtener usuarios por rol
   */
  async getUsersByRole(role: string): Promise<User[]> {
    return ApiService.get<User[]>(`/users/role/${role}`);
  },

  /**
   * Obtener usuarios activos
   */
  async getActiveUsers(): Promise<User[]> {
    return ApiService.get<User[]>('/users/active');
  },

  /**
   * Crear nuevo usuario
   */
  async createUser(userData: CreateUserDTO): Promise<User> {
    return ApiService.post<User>('/users', userData);
  },

  /**
   * Actualizar usuario existente
   */
  async updateUser(cedula: string, userData: UpdateUserDTO): Promise<User> {
    return ApiService.put<User>(`/users/${cedula}`, userData);
  },

  /**
   * Eliminar usuario por cédula
   */
  async deleteUserByCedula(cedula: string): Promise<void> {
    return ApiService.delete<void>(`/users/cedula/${cedula}`);
  },

  /**
   * Eliminar usuario por ID
   */
  async deleteUserById(userId: string): Promise<void> {
    return ApiService.delete<void>(`/users/id/${userId}`);
  },

  /**
   * Activar usuario
   */
  async activateUser(cedula: string): Promise<User> {
    return ApiService.put<User>(`/users/${cedula}/activate`);
  },

  /**
   * Desactivar usuario
   */
  async deactivateUser(cedula: string): Promise<User> {
    return ApiService.put<User>(`/users/${cedula}/deactivate`);
  },

  /**
   * Verificar si usuario puede ver información de pacientes
   */
  async canViewPatientInfo(cedula: string): Promise<boolean> {
    return ApiService.get<boolean>(`/users/${cedula}/can-view-patients`);
  },

  /**
   * Verificar si usuario puede gestionar usuarios
   */
  async canManageUsers(cedula: string): Promise<boolean> {
    return ApiService.get<boolean>(`/users/${cedula}/can-manage-users`);
  },

  /**
   * Verificar si usuario puede registrar pacientes
   */
  async canRegisterPatients(cedula: string): Promise<boolean> {
    return ApiService.get<boolean>(`/users/${cedula}/can-register-patients`);
  },
};