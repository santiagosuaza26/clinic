import { ApiService } from './apiService';
import {
  Patient,
  CreatePatientDTO,
  UpdatePatientDTO,
} from '@/types';

/**
 * Servicio para operaciones relacionadas con pacientes
 */
export const patientService = {
  /**
   * Obtener todos los pacientes
   */
  async getAllPatients(): Promise<Patient[]> {
    return ApiService.get<Patient[]>('/patients');
  },

  /**
   * Buscar paciente por cédula
   */
  async getPatientByCedula(cedula: string): Promise<Patient> {
    return ApiService.get<Patient>(`/patients/cedula/${cedula}`);
  },

  /**
   * Buscar paciente por ID
   */
  async getPatientById(patientId: string): Promise<Patient> {
    return ApiService.get<Patient>(`/patients/id/${patientId}`);
  },

  /**
   * Buscar paciente por nombre de usuario
   */
  async getPatientByUsername(username: string): Promise<Patient> {
    return ApiService.get<Patient>(`/patients/username/${username}`);
  },

  /**
   * Crear nuevo paciente
   */
  async createPatient(patientData: CreatePatientDTO): Promise<Patient> {
    return ApiService.post<Patient>('/patients', patientData);
  },

  /**
   * Actualizar paciente existente
   */
  async updatePatient(cedula: string, patientData: UpdatePatientDTO): Promise<Patient> {
    return ApiService.put<Patient>(`/patients/${cedula}`, patientData);
  },

  /**
   * Eliminar paciente por cédula
   */
  async deletePatientByCedula(cedula: string): Promise<void> {
    return ApiService.delete<void>(`/patients/cedula/${cedula}`);
  },

  /**
   * Eliminar paciente por ID
   */
  async deletePatientById(patientId: string): Promise<void> {
    return ApiService.delete<void>(`/patients/id/${patientId}`);
  },

  /**
   * Verificar si paciente tiene seguro médico activo
   */
  async hasActiveInsurance(cedula: string): Promise<boolean> {
    return ApiService.get<boolean>(`/patients/${cedula}/has-active-insurance`);
  },

  /**
   * Obtener edad del paciente
   */
  async getPatientAge(cedula: string): Promise<number> {
    return ApiService.get<number>(`/patients/${cedula}/age`);
  },

};