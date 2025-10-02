import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import UserList from '@/components/users/UserList';

/**
 * Página de gestión de usuarios (Recursos Humanos)
 */
const UsersPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Módulo para la gestión completa de usuarios del sistema.
        Solo accesible para Recursos Humanos.
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <UserList />
      </Paper>
    </Box>
  );
};

export default UsersPage;