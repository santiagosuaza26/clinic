import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { User, UserRole, CreateUserDTO } from '@/types';
import { userService } from '@/services/userService';

/**
 * Componente para mostrar y gestionar la lista de usuarios
 */
const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<CreateUserDTO>({
    cedula: '',
    username: '',
    password: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    role: 'PERSONAL_ADMINISTRATIVO',
    birthDate: '',
    address: '',
  });

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await userService.getAllUsers();
      setUsers(usersData);
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormData({
      cedula: '',
      username: '',
      password: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      role: 'PERSONAL_ADMINISTRATIVO',
      birthDate: '',
      address: '',
    });
    setDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      cedula: user.cedula,
      username: user.username,
      password: '', // No mostrar contraseña actual
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      birthDate: user.birthDate,
      address: user.address,
    });
    setDialogOpen(true);
  };

  const handleDeleteUser = async (cedula: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
      try {
        await userService.deleteUserByCedula(cedula);
        await loadUsers(); // Recargar lista
      } catch (error: any) {
        setError(error.message || 'Error al eliminar usuario');
      }
    }
  };

  const handleSaveUser = async () => {
    try {
      if (editingUser) {
        // Actualizar usuario existente
        await userService.updateUser(editingUser.cedula, formData);
      } else {
        // Crear nuevo usuario
        await userService.createUser(formData);
      }
      setDialogOpen(false);
      await loadUsers(); // Recargar lista
    } catch (error: any) {
      setError(error.message || 'Error al guardar usuario');
    }
  };

  const handleInputChange = (field: keyof CreateUserDTO) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const getRoleLabel = (role: UserRole): string => {
    const roleLabels: Record<UserRole, string> = {
      RECURSOS_HUMANOS: 'Recursos Humanos',
      PERSONAL_ADMINISTRATIVO: 'Personal Administrativo',
      SOPORTE_INFORMACION: 'Soporte de Información',
      ENFERMERA: 'Enfermera',
      MEDICO: 'Médico',
    };
    return roleLabels[role];
  };

  const getRoleColor = (role: UserRole): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    const roleColors: Record<UserRole, any> = {
      RECURSOS_HUMANOS: 'error',
      PERSONAL_ADMINISTRATIVO: 'primary',
      SOPORTE_INFORMACION: 'info',
      ENFERMERA: 'success',
      MEDICO: 'warning',
    };
    return roleColors[role];
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <Typography>Cargando usuarios...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">
          Gestión de Usuarios
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateUser}
        >
          Nuevo Usuario
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cédula</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.cedula}</TableCell>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      <Chip
                        label={getRoleLabel(user.role)}
                        color={getRoleColor(user.role)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.isActive ? 'Activo' : 'Inactivo'}
                        color={user.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEditUser(user)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteUser(user.cedula)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Diálogo para crear/editar usuario */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Cédula"
              value={formData.cedula}
              onChange={handleInputChange('cedula')}
              disabled={!!editingUser}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nombre Completo"
              value={formData.fullName}
              onChange={handleInputChange('fullName')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nombre de Usuario"
              value={formData.username}
              onChange={handleInputChange('username')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              helperText="Mínimo 8 caracteres, incluir mayúscula, número y carácter especial"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Teléfono"
              value={formData.phoneNumber}
              onChange={handleInputChange('phoneNumber')}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Rol</InputLabel>
              <Select
                value={formData.role}
                label="Rol"
                onChange={handleInputChange('role')}
              >
                <MenuItem value="RECURSOS_HUMANOS">Recursos Humanos</MenuItem>
                <MenuItem value="PERSONAL_ADMINISTRATIVO">Personal Administrativo</MenuItem>
                <MenuItem value="SOPORTE_INFORMACION">Soporte de Información</MenuItem>
                <MenuItem value="ENFERMERA">Enfermera</MenuItem>
                <MenuItem value="MEDICO">Médico</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Fecha de Nacimiento"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange('birthDate')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Dirección"
              value={formData.address}
              onChange={handleInputChange('address')}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSaveUser} variant="contained">
            {editingUser ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserList;