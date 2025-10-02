import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import PatientList from '@/components/patients/PatientList';

const PatientsPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Registro de Pacientes
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Módulo para el registro y gestión de pacientes.
        Solo accesible para Personal Administrativo.
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <PatientList />
      </Paper>
    </Box>
  );
};

export default PatientsPage;