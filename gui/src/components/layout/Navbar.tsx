import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  LocalHospital as LocalHospitalIcon,
  Assignment as AssignmentIcon,
  Inventory as InventoryIcon,
  Receipt as ReceiptIcon,
  CalendarToday as CalendarIcon,
  Logout as LogoutIcon,
  MedicalServices as MedicalServicesIcon,
  Healing as HealingIcon,
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Definir menú según el rol del usuario
  const getMenuItems = () => {
    const commonItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: [] },
    ];

    const roleSpecificItems = [];

    switch (user?.role) {
      case 'RECURSOS_HUMANOS':
        roleSpecificItems.push(
          { text: 'Gestión de Usuarios', icon: <PeopleIcon />, path: '/users', roles: ['RECURSOS_HUMANOS'] }
        );
        break;
      case 'PERSONAL_ADMINISTRATIVO':
        roleSpecificItems.push(
          { text: 'Registro de Pacientes', icon: <PersonAddIcon />, path: '/patients', roles: ['PERSONAL_ADMINISTRATIVO'] },
          { text: 'Facturación', icon: <ReceiptIcon />, path: '/billing', roles: ['PERSONAL_ADMINISTRATIVO'] }
        );
        break;
      case 'ENFERMERA':
        roleSpecificItems.push(
          { text: 'Visitas de Pacientes', icon: <HealingIcon />, path: '/patient-visits', roles: ['ENFERMERA'] }
        );
        break;
      case 'MEDICO':
        roleSpecificItems.push(
          { text: 'Historias Clínicas', icon: <MedicalServicesIcon />, path: '/medical-records', roles: ['MEDICO'] }
        );
        break;
      case 'SOPORTE_INFORMACION':
        roleSpecificItems.push(
          { text: 'Gestión de Inventario', icon: <InventoryIcon />, path: '/inventory', roles: ['SOPORTE_INFORMACION'] }
        );
        break;
    }

    // Agregar elementos comunes a todos los roles médicos/administrativos
    if (['PERSONAL_ADMINISTRATIVO', 'ENFERMERA', 'MEDICO'].includes(user?.role || '')) {
      roleSpecificItems.push(
        { text: 'Citas Médicas', icon: <CalendarIcon />, path: '/appointments', roles: ['PERSONAL_ADMINISTRATIVO', 'ENFERMERA', 'MEDICO'] }
      );
    }

    return [...commonItems, ...roleSpecificItems];
  };

  const menuItems = getMenuItems();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" component="div">
          Clínica - {user?.role?.replace('_', ' ')}
        </Typography>
        <Typography variant="body2">
          {user?.fullName}
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleMenuClick(item.path)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <LocalHospitalIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Gestión de Clínica
          </Typography>
          {!isMobile && (
            <>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  startIcon={item.icon}
                  onClick={() => handleMenuClick(item.path)}
                  sx={{
                    mx: 1,
                    backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                  }}
                >
                  {item.text}
                </Button>
              ))}
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ ml: 2 }}
              >
                Salir
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {isMobile && (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Navbar;