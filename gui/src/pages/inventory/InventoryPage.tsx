import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const InventoryPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestión de Inventario
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Módulo para la gestión de medicamentos, procedimientos y ayudas diagnósticas.
        Solo accesible para Soporte de Información.
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Funcionalidades de Inventario
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Gestión de medicamentos <br />
          • Procedimientos disponibles <br />
          • Ayudas diagnósticas <br />
          • Control de stock <br />
          • Mantenimiento de inventario
        </Typography>
      </Paper>
    </Box>
  );
};

export default InventoryPage;