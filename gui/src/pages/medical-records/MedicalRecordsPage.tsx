import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const MedicalRecordsPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Historias Clínicas
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Módulo para la gestión de historias clínicas y órdenes médicas.
        Solo accesible para Médicos.
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Funcionalidades Médicas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Crear y actualizar historias clínicas <br />
          • Registrar diagnósticos y tratamientos <br />
          • Generar órdenes médicas (medicamentos, procedimientos, ayudas diagnósticas) <br />
          • Seguimiento de evolución del paciente <br />
          • Resultados de pruebas y exámenes
        </Typography>
      </Paper>
    </Box>
  );
};

export default MedicalRecordsPage;