// Definiciones de tipos TypeScript para la aplicación de clínica

// Tipos de roles de usuario
export type UserRole =
  | 'RECURSOS_HUMANOS'
  | 'PERSONAL_ADMINISTRATIVO'
  | 'SOPORTE_INFORMACION'
  | 'ENFERMERA'
  | 'MEDICO';

// Tipos de género
export type Gender = 'MASCULINO' | 'FEMENINO' | 'OTRO';

// Estados de póliza de seguro
export type PolicyStatus = 'ACTIVA' | 'INACTIVA';

// Estados de citas
export type AppointmentStatus = 'PROGRAMADA' | 'COMPLETADA' | 'CANCELADA';

// Estados de órdenes médicas
export type OrderStatus = 'PENDIENTE' | 'COMPLETADA' | 'CANCELADA';

// Interfaces base
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Usuario
export interface User extends BaseEntity {
  cedula: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  isActive: boolean;
  birthDate: string;
  address: string;
}

// Paciente
export interface Patient extends BaseEntity {
  cedula: string;
  username: string;
  password?: string;
  fullName: string;
  birthDate: string;
  gender: Gender;
  address: string;
  phoneNumber: string;
  email: string;
  age?: number;
  emergencyContact?: EmergencyContact;
  insurancePolicy?: InsurancePolicy;
}

// Contacto de emergencia
export interface EmergencyContact extends BaseEntity {
  fullName: string;
  relationship: string;
  phoneNumber: string;
}

// Póliza de seguro médico
export interface InsurancePolicy extends BaseEntity {
  companyName: string;
  policyNumber: string;
  status: PolicyStatus;
  expirationDate: string;
  validityDays?: number;
}

// Signos vitales
export interface VitalSigns {
  bloodPressure: string;
  temperature: number;
  pulse: number;
  oxygenLevel: number;
}

// Registro de enfermería
export interface NurseRecord {
  observations: string;
  medicationsAdministered: string[];
  proceduresPerformed: string[];
  vitalSigns: VitalSigns;
}

// Visita de paciente
export interface PatientVisit extends BaseEntity {
  patientId: string;
  patientCedula: string;
  nurseRecord: NurseRecord;
  visitDate: string;
}

// Historia clínica
export interface MedicalRecord extends BaseEntity {
  patientCedula: string;
  doctorCedula: string;
  consultationReason: string;
  symptoms: string;
  diagnosis: string;
  treatment?: string;
  observations?: string;
  recordDate: string;
}

// Medicamento en orden
export interface MedicationOrder {
  orderNumber: string;
  itemNumber: number;
  medicationName: string;
  dosage: string;
  treatmentDuration: string;
  cost: number;
}

// Procedimiento en orden
export interface ProcedureOrder {
  orderNumber: string;
  itemNumber: number;
  procedureName: string;
  numberOfTimes: number;
  frequency: string;
  cost: number;
  requiresSpecialist: boolean;
  specialtyId?: string;
}

// Ayuda diagnóstica en orden
export interface DiagnosticAidOrder {
  orderNumber: string;
  itemNumber: number;
  diagnosticAidName: string;
  quantity: number;
  cost: number;
  requiresSpecialist: boolean;
  specialtyId?: string;
}

// Orden médica completa
export interface Order {
  orderNumber: string;
  patientCedula: string;
  doctorCedula: string;
  creationDate: string;
  status: OrderStatus;
  medications: MedicationOrder[];
  procedures: ProcedureOrder[];
  diagnosticAids: DiagnosticAidOrder[];
}

// Cita médica
export interface Appointment extends BaseEntity {
  patientCedula: string;
  doctorCedula: string;
  appointmentDateTime: string;
  status: AppointmentStatus;
  notes?: string;
}

// Ítem de inventario
export interface InventoryItem extends BaseEntity {
  name: string;
  type: 'MEDICAMENTO' | 'PROCEDIMIENTO' | 'AYUDA_DIAGNOSTICA';
  cost: number;
  stock: number;
  description?: string;
}

// Cálculo de facturación
export interface BillingCalculation {
  patientCedula: string;
  orderSummaries: OrderSummary[];
  subtotal: number;
  copayment: number;
  insuranceCoverage: number;
  total: number;
  hasExceededAnnualLimit: boolean;
}

// Resumen de orden para facturación
export interface OrderSummary {
  orderNumber: string;
  medications: MedicationSummary[];
  procedures: ProcedureSummary[];
  diagnosticAids: DiagnosticAidSummary[];
}

// Resumen de medicamento
export interface MedicationSummary {
  name: string;
  dosage: string;
  cost: number;
}

// Resumen de procedimiento
export interface ProcedureSummary {
  name: string;
  cost: number;
}

// Resumen de ayuda diagnóstica
export interface DiagnosticAidSummary {
  name: string;
  cost: number;
}

// Factura
export interface Invoice extends BaseEntity {
  invoiceNumber: string;
  patientCedula: string;
  doctorCedula: string;
  billingCalculation: BillingCalculation;
  issueDate: string;
  dueDate: string;
}

// Estadísticas del dashboard
export interface DashboardStats {
  totalPatients: number;
  totalUsers: number;
  totalAppointments: number;
  totalOrders: number;
  monthlyRevenue: number;
  activePatients: number;
}

// Estado de autenticación
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Configuración de API
export interface ApiConfig {
  baseURL: string;
  timeout: number;
}

// Respuesta de error de API
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// DTOs para creación (sin campos automáticos)
export interface CreateUserDTO {
  cedula: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  birthDate: string;
  address: string;
}

// DTOs para formularios (más flexibles)
export interface CreatePatientFormDTO {
  cedula: string;
  username: string;
  password: string;
  fullName: string;
  birthDate: string;
  gender: Gender;
  address: string;
  phoneNumber: string;
  email: string;
  emergencyContact?: {
    fullName: string;
    relationship: string;
    phoneNumber: string;
  };
  insurancePolicy?: {
    companyName: string;
    policyNumber: string;
    status: PolicyStatus;
    expirationDate: string;
  };
}

export interface CreateEmergencyContactFormDTO {
  fullName: string;
  relationship: string;
  phoneNumber: string;
}

export interface CreateInsurancePolicyFormDTO {
  companyName: string;
  policyNumber: string;
  status: PolicyStatus;
  expirationDate: string;
}

export interface CreateEmergencyContactDTO {
  fullName: string;
  relationship: string;
  phoneNumber: string;
}

// Tipos específicos para el componente PatientList
export interface PatientFormDataDTO {
  cedula: string;
  username: string;
  password: string;
  fullName: string;
  birthDate: string;
  gender: Gender;
  address: string;
  phoneNumber: string;
  email: string;
  emergencyContact?: CreateEmergencyContactDTO;
  insurancePolicy?: CreateInsurancePolicyDTO;
}

export type CreatePatientDTO = Omit<Patient, keyof BaseEntity>;
export type CreateAppointmentDTO = Omit<Appointment, keyof BaseEntity>;
export type CreateOrderDTO = Omit<Order, 'orderNumber' | 'creationDate' | 'status' | keyof BaseEntity>;
export type CreateInventoryItemDTO = Omit<InventoryItem, keyof BaseEntity>;
export type CreateMedicalRecordDTO = Omit<MedicalRecord, keyof BaseEntity>;
export type CreatePatientVisitDTO = Omit<PatientVisit, keyof BaseEntity>;
export type CreateInsurancePolicyDTO = Omit<InsurancePolicy, keyof BaseEntity>;

// DTOs para actualización
export type UpdateUserDTO = Partial<CreateUserDTO> & { cedula: string };
export type UpdatePatientDTO = Partial<CreatePatientDTO> & { cedula: string };
export type UpdateAppointmentDTO = Partial<CreateAppointmentDTO> & { id: string };
export type UpdateInventoryItemDTO = Partial<CreateInventoryItemDTO> & { id: string };
export type UpdateInsurancePolicyDTO = Partial<CreateInsurancePolicyDTO> & { id: string };