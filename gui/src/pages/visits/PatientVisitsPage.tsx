import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const PatientVisitsPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Visitas de Pacientes
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Módulo para el registro de visitas y signos vitales.
        Solo accesible para Enfermeras.
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Funcionalidades de Enfermería
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Registro de signos vitales (presión arterial, temperatura, pulso, oxígeno) <br />
          • Administración de medicamentos <br />
          • Procedimientos realizados <br />
          • Observaciones de atención <br />
          • Registro de visitas de pacientes
        </Typography>
      </Paper>
    </Box>
  );
};

export default PatientVisitsPage;