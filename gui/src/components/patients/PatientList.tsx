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
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { Patient, Gender, CreatePatientFormDTO, CreatePatientDTO, UpdatePatientDTO, CreateInsurancePolicyDTO, CreateEmergencyContactDTO } from '@/types';
import { patientService } from '@/services/patientService';

/**
 * Componente para mostrar y gestionar la lista de pacientes
 */
const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState<CreatePatientFormDTO>({
    cedula: '',
    username: '',
    password: '',
    fullName: '',
    birthDate: '',
    gender: 'MASCULINO',
    address: '',
    phoneNumber: '',
    email: '',
    emergencyContact: {
      fullName: '',
      relationship: '',
      phoneNumber: '',
    },
    insurancePolicy: {
      companyName: '',
      policyNumber: '',
      status: 'ACTIVA',
      expirationDate: '',
    },
  });

  // Función para transformar CreatePatientFormDTO a CreatePatientDTO
  const transformFormDataToCreatePatientDTO = (formData: CreatePatientFormDTO): CreatePatientDTO => {
    return {
      cedula: formData.cedula,
      username: formData.username,
      password: formData.password,
      fullName: formData.fullName,
      birthDate: formData.birthDate,
      gender: formData.gender,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      emergencyContact: formData.emergencyContact ? {
        fullName: formData.emergencyContact.fullName,
        relationship: formData.emergencyContact.relationship,
        phoneNumber: formData.emergencyContact.phoneNumber,
      } as any : undefined,
      insurancePolicy: formData.insurancePolicy ? {
        companyName: formData.insurancePolicy.companyName,
        policyNumber: formData.insurancePolicy.policyNumber,
        status: formData.insurancePolicy.status,
        expirationDate: formData.insurancePolicy.expirationDate,
      } as any : undefined,
    };
  };

  // Función para transformar CreatePatientFormDTO a UpdatePatientDTO
  const transformFormDataToUpdatePatientDTO = (formData: CreatePatientFormDTO): UpdatePatientDTO => {
    return {
      cedula: formData.cedula,
      username: formData.username,
      password: formData.password,
      fullName: formData.fullName,
      birthDate: formData.birthDate,
      gender: formData.gender,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      emergencyContact: formData.emergencyContact ? {
        fullName: formData.emergencyContact.fullName,
        relationship: formData.emergencyContact.relationship,
        phoneNumber: formData.emergencyContact.phoneNumber,
      } as any : undefined,
      insurancePolicy: formData.insurancePolicy ? {
        companyName: formData.insurancePolicy.companyName,
        policyNumber: formData.insurancePolicy.policyNumber,
        status: formData.insurancePolicy.status,
        expirationDate: formData.insurancePolicy.expirationDate,
      } as any : undefined,
    };
  };

  // Cargar pacientes al montar el componente
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const patientsData = await patientService.getAllPatients();
      setPatients(patientsData);
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Error al cargar pacientes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePatient = () => {
    setEditingPatient(null);
    setFormData({
      cedula: '',
      username: '',
      password: '',
      fullName: '',
      birthDate: '',
      gender: 'MASCULINO',
      address: '',
      phoneNumber: '',
      email: '',
      emergencyContact: {
        fullName: '',
        relationship: '',
        phoneNumber: '',
      },
      insurancePolicy: {
        companyName: '',
        policyNumber: '',
        status: 'ACTIVA',
        expirationDate: '',
      },
    });
    setDialogOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData({
      cedula: patient.cedula,
      username: patient.username,
      password: '', // No mostrar contraseña actual
      fullName: patient.fullName,
      birthDate: patient.birthDate,
      gender: patient.gender,
      address: patient.address,
      phoneNumber: patient.phoneNumber,
      email: patient.email,
      emergencyContact: patient.emergencyContact || {
        fullName: '',
        relationship: '',
        phoneNumber: '',
      },
      insurancePolicy: patient.insurancePolicy || {
        companyName: '',
        policyNumber: '',
        status: 'ACTIVA',
        expirationDate: '',
      },
    });
    setDialogOpen(true);
  };

  const handleDeletePatient = async (cedula: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este paciente?')) {
      try {
        await patientService.deletePatientByCedula(cedula);
        await loadPatients(); // Recargar lista
      } catch (error: any) {
        setError(error.message || 'Error al eliminar paciente');
      }
    }
  };

  const handleSavePatient = async () => {
    try {
      if (editingPatient) {
        // Actualizar paciente existente
        const updateData = transformFormDataToUpdatePatientDTO(formData);
        await patientService.updatePatient(editingPatient.cedula, updateData);
      } else {
        // Crear nuevo paciente
        const createData = transformFormDataToCreatePatientDTO(formData);
        await patientService.createPatient(createData);
      }
      setDialogOpen(false);
      await loadPatients(); // Recargar lista
    } catch (error: any) {
      setError(error.message || 'Error al guardar paciente');
    }
  };

  const handleInputChange = (field: keyof CreatePatientFormDTO) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleEmergencyContactChange = (field: string) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact!,
        [field]: event.target.value,
      },
    }));
  };

  const handleInsurancePolicyChange = (field: string) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      insurancePolicy: {
        ...prev.insurancePolicy!,
        [field]: event.target.value,
      },
    }));
  };

  const getGenderLabel = (gender: Gender): string => {
    const genderLabels: Record<Gender, string> = {
      MASCULINO: 'Masculino',
      FEMENINO: 'Femenino',
      OTRO: 'Otro',
    };
    return genderLabels[gender];
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <Typography>Cargando pacientes...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">
          Lista de Pacientes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreatePatient}
        >
          Nuevo Paciente
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
                  <TableCell>Género</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Seguro</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.cedula}</TableCell>
                    <TableCell>{patient.fullName}</TableCell>
                    <TableCell>{patient.username}</TableCell>
                    <TableCell>
                      <Chip
                        label={getGenderLabel(patient.gender)}
                        color="primary"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{patient.phoneNumber}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>
                      {patient.insurancePolicy ? (
                        <Chip
                          label={patient.insurancePolicy.companyName}
                          color={patient.insurancePolicy.status === 'ACTIVA' ? 'success' : 'default'}
                          size="small"
                        />
                      ) : (
                        <Chip label="Sin seguro" color="default" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEditPatient(patient)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeletePatient(patient.cedula)}
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

      {/* Diálogo para crear/editar paciente */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingPatient ? 'Editar Paciente' : 'Nuevo Paciente'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cédula"
                  value={formData.cedula}
                  onChange={handleInputChange('cedula')}
                  disabled={!!editingPatient}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre de Usuario"
                  value={formData.username}
                  onChange={handleInputChange('username')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre Completo"
                  value={formData.fullName}
                  onChange={handleInputChange('fullName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contraseña"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Género</InputLabel>
                  <Select
                    value={formData.gender}
                    label="Género"
                    onChange={handleInputChange('gender')}
                  >
                    <MenuItem value="MASCULINO">Masculino</MenuItem>
                    <MenuItem value="FEMENINO">Femenino</MenuItem>
                    <MenuItem value="OTRO">Otro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fecha de Nacimiento"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange('birthDate')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={formData.phoneNumber}
                  onChange={handleInputChange('phoneNumber')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  value={formData.address}
                  onChange={handleInputChange('address')}
                />
              </Grid>

              {/* Contacto de emergencia */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Contacto de Emergencia
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Nombre del Contacto"
                  value={formData.emergencyContact?.fullName || ''}
                  onChange={handleEmergencyContactChange('fullName')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Relación"
                  value={formData.emergencyContact?.relationship || ''}
                  onChange={handleEmergencyContactChange('relationship')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Teléfono de Emergencia"
                  value={formData.emergencyContact?.phoneNumber || ''}
                  onChange={handleEmergencyContactChange('phoneNumber')}
                />
              </Grid>

              {/* Información de seguro */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Seguro Médico (Opcional)
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Compañía de Seguros"
                  value={formData.insurancePolicy?.companyName || ''}
                  onChange={handleInsurancePolicyChange('companyName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Número de Póliza"
                  value={formData.insurancePolicy?.policyNumber || ''}
                  onChange={handleInsurancePolicyChange('policyNumber')}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSavePatient} variant="contained">
            {editingPatient ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientList;