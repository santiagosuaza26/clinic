import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const BillingPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Facturación
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Módulo para la gestión de facturación y cálculos de copagos.
        Solo accesible para Personal Administrativo.
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Funcionalidades de Facturación
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Cálculo automático de copagos <br />
          • Gestión de pólizas de seguros <br />
          • Generación de facturas <br />
          • Seguimiento de límites anuales <br />
          • Reportes financieros
        </Typography>
      </Paper>
    </Box>
  );
};

export default BillingPage;