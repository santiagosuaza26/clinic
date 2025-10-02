import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from '@/components/layout/Navbar';
import LoginPage from '@/pages/auth/LoginPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import UsersPage from '@/pages/users/UsersPage';
import PatientsPage from '@/pages/patients/PatientsPage';
import PatientVisitsPage from '@/pages/visits/PatientVisitsPage';
import MedicalRecordsPage from '@/pages/medical-records/MedicalRecordsPage';
import InventoryPage from '@/pages/inventory/InventoryPage';
import BillingPage from '@/pages/billing/BillingPage';
import AppointmentsPage from '@/pages/appointments/AppointmentsPage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

/**
 * Componente principal de la aplicación
 * Maneja el enrutamiento y la estructura general
 */
function App() {
  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          {/* Ruta pública - Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas protegidas */}
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />

          {/* Gestión de Usuarios - Solo Recursos Humanos */}
          <Route path="/users" element={
            <ProtectedRoute requiredRole="RECURSOS_HUMANOS">
              <UsersPage />
            </ProtectedRoute>
          } />

          {/* Gestión de Pacientes - Personal Administrativo */}
          <Route path="/patients" element={
            <ProtectedRoute requiredRole="PERSONAL_ADMINISTRATIVO">
              <PatientsPage />
            </ProtectedRoute>
          } />

          {/* Visitas de Pacientes - Enfermeras */}
          <Route path="/patient-visits" element={
            <ProtectedRoute requiredRole="ENFERMERA">
              <PatientVisitsPage />
            </ProtectedRoute>
          } />

          {/* Historias Clínicas - Médicos */}
          <Route path="/medical-records" element={
            <ProtectedRoute requiredRole="MEDICO">
              <MedicalRecordsPage />
            </ProtectedRoute>
          } />

          {/* Gestión de Inventario - Soporte de Información */}
          <Route path="/inventory" element={
            <ProtectedRoute requiredRole="SOPORTE_INFORMACION">
              <InventoryPage />
            </ProtectedRoute>
          } />

          {/* Facturación - Personal Administrativo */}
          <Route path="/billing" element={
            <ProtectedRoute requiredRole="PERSONAL_ADMINISTRATIVO">
              <BillingPage />
            </ProtectedRoute>
          } />

          {/* Citas Médicas - Todos los roles médicos */}
          <Route path="/appointments" element={
            <ProtectedRoute>
              <AppointmentsPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Container>
    </div>
  );
}

export default App;