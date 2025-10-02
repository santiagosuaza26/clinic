import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const AppointmentsPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Citas Médicas
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Módulo para la gestión de citas médicas.
        Accesible para Personal Administrativo, Enfermeras y Médicos.
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Funcionalidades de Citas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Programación de citas <br />
          • Gestión de agenda médica <br />
          • Recordatorios de citas <br />
          • Historial de citas <br />
          • Cancelación y reprogramación
        </Typography>
      </Paper>
    </Box>
  );
};

export default AppointmentsPage;