import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  People as PeopleIcon,
  LocalHospital as HospitalIcon,
  Assignment as AssignmentIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';

/**
 * Página principal del dashboard
 */
const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const statsCards = [
    {
      title: 'Total Pacientes',
      value: '0',
      icon: <PeopleIcon />,
      color: '#1976d2',
    },
    {
      title: 'Citas Hoy',
      value: '0',
      icon: <HospitalIcon />,
      color: '#388e3c',
    },
    {
      title: 'Órdenes Pendientes',
      value: '0',
      icon: <AssignmentIcon />,
      color: '#f57c00',
    },
    {
      title: 'Inventario Bajo',
      value: '0',
      icon: <InventoryIcon />,
      color: '#d32f2f',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Bienvenido, {user?.fullName}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      backgroundColor: card.color,
                      borderRadius: 1,
                      p: 1,
                      mr: 2,
                      color: 'white',
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" component="div">
                      {card.value}
                    </Typography>
                    <Typography color="text.secondary">
                      {card.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Actividad Reciente
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aquí se mostrarán las actividades recientes del sistema...
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Accesos Rápidos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Funcionalidades disponibles según su rol...
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;