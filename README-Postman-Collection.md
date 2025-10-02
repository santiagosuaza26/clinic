# 📋 Colección de Postman - Sistema de Gestión Clínica

## 📖 Descripción General

Esta colección de Postman proporciona acceso completo a todos los endpoints de la API REST del Sistema de Gestión Clínica. Está organizada por módulos funcionales para facilitar su uso y mantenimiento.

## 🚀 Configuración Inicial

### 1. Importar la Colección

1. Abre Postman
2. Haz clic en "Import" en la esquina superior izquierda
3. Selecciona "Upload Files"
4. Busca y selecciona el archivo `clinic-api-collection.postman_collection.json`
5. La colección aparecerá en tu workspace

### 2. Configurar Variables de Entorno

Crea un nuevo entorno en Postman llamado "Desarrollo Clínica" con las siguientes variables:

| Variable | Valor Inicial | Descripción |
|----------|---------------|-------------|
| `baseUrl` | `http://localhost:8080` | URL base de la aplicación |
| `jwt_token` | *(vacío)* | Token JWT para autenticación |
| `patient_cedula` | `12345678` | Cédula de ejemplo para pruebas |
| `doctor_cedula` | `87654321` | Cédula de doctor para pruebas |
| `appointment_id` | `1` | ID de cita para pruebas |
| `order_number` | `ORD001` | Número de orden para pruebas |
| `patient_id` | `1` | ID de paciente para pruebas |
| `user_id` | `1` | ID de usuario para pruebas |

## 🔐 Autenticación

La aplicación utiliza autenticación JWT. Para obtener un token:

1. **Crear Usuario Doctor (opcional)**: Usa el endpoint "Crear Usuario" con rol `DOCTOR`
2. **Iniciar Sesión**: Actualmente la aplicación no tiene endpoint de login implementado, pero el token se puede obtener del response de creación de usuario o usar un token de prueba

### Token de Prueba
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRyLiBUZXN0IiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## 📂 Estructura de la Colección

### 🏠 Información Pública
- **Health Check**: Verificar estado de la aplicación
- **Welcome Message**: Mensaje de bienvenida
- **Application Info**: Información de la aplicación

### 👥 Gestión de Usuarios
- Crear, actualizar, eliminar usuarios
- Obtener usuarios por cédula, username o rol
- Gestión de permisos y roles

### 🏥 Gestión de Pacientes
- Crear pacientes con información completa
- Gestionar contactos de emergencia
- Manejar pólizas de seguro
- Consultar información del paciente

### 📅 Gestión de Citas
- Crear y gestionar citas médicas
- Verificar disponibilidad de doctores
- Cancelar o completar citas
- Estadísticas de citas por paciente

### 🏥 Gestión de Visitas
- Crear visitas médicas
- Registrar signos vitales
- Completar visitas
- Validar parámetros médicos

### 📋 Gestión de Órdenes Médicas
- Crear órdenes de medicamentos, procedimientos y ayudas diagnósticas
- Validar órdenes antes de crear
- Seguimiento de órdenes por paciente

### 📋 Gestión de Registros Médicos
- Crear y consultar historial médico
- Organización por fecha y paciente
- Gestión de datos médicos sensibles

### 💊 Gestión de Inventario
- Control de medicamentos y suministros
- Gestión de costos y disponibilidad
- Búsqueda y filtrado de items

### 💰 Gestión de Facturación
- Cálculo automático de facturas
- Validación de seguros médicos
- Control de límites de copago
- Estadísticas de facturación

## 🧪 Flujo de Pruebas Recomendado

### 1. Verificación Inicial
```bash
# 1. Verificar que la aplicación esté corriendo
GET {{baseUrl}}/public/health

# 2. Obtener información de la aplicación
GET {{baseUrl}}/public/info
```

### 2. Crear Datos de Prueba
```bash
# 1. Crear un doctor
POST {{baseUrl}}/users
{
  "cedula": "87654321",
  "username": "doctor1",
  "password": "Password123@",
  "fullName": "Dr. Juan Pérez",
  "birthDate": "15/03/1980",
  "address": "Calle 123 #45-67",
  "phoneNumber": "3001234567",
  "email": "doctor@clinic.com",
  "role": "DOCTOR"
}

# 2. Crear un paciente
POST {{baseUrl}}/patients
{
  "cedula": "12345678",
  "username": "paciente1",
  "password": "Password123@",
  "fullName": "María González",
  "birthDate": "25/08/1990",
  "gender": "FEMENINO",
  "address": "Carrera 50 #25-30",
  "phoneNumber": "3109876543",
  "email": "maria@email.com",
  "emergencyContact": {
    "name": "Carlos González",
    "phoneNumber": "3114567890",
    "relationship": "HERMANO"
  },
  "insurancePolicy": {
    "policyNumber": "POL001",
    "companyName": "Seguros ABC",
    "expirationDate": "31/12/2024",
    "validityDays": 365,
    "status": "ACTIVE"
  }
}
```

### 3. Crear una Cita
```bash
# Crear cita médica
POST {{baseUrl}}/appointments
{
  "patientCedula": "12345678",
  "doctorCedula": "87654321",
  "appointmentDateTime": "15/01/2024 10:30",
  "consultationReason": "Consulta general",
  "requiresSpecialistAssistance": false
}
```

### 4. Crear Visita y Registrar Signos Vitales
```bash
# Crear visita
POST {{baseUrl}}/patient-visits
{
  "patientCedula": "12345678",
  "doctorCedula": "87654321",
  "appointmentId": 1,
  "symptoms": "Dolor de cabeza y fiebre",
  "diagnosis": "Gripe común",
  "observations": "Paciente presenta síntomas típicos de gripe"
}

# Registrar signos vitales
PUT {{baseUrl}}/patient-visits/1/vital-signs
{
  "temperature": 37.2,
  "pulse": 75,
  "bloodPressure": "120/80",
  "oxygenLevel": 98,
  "nurseRecord": {
    "nurseCedula": "87654321",
    "observations": "Paciente estable"
  }
}
```

## 🔧 Características Avanzadas

### Variables Dinámicas
- Usa las variables predefinidas para mantener consistencia
- Actualiza los valores según tus necesidades de prueba
- Las variables se pueden cambiar globalmente desde el entorno

### Scripts de Pre-request y Tests
- **Pre-request Scripts**: Configuran automáticamente headers y autenticación
- **Tests**: Validan respuestas y tiempos de respuesta
- **Status Code Validation**: Verifica que no haya errores 500

### Organización por Carpetas
Cada módulo funcional está organizado en carpetas con:
- Endpoints CRUD completos
- Ejemplos de datos de prueba
- Descripciones detalladas de cada operación

## 🚨 Notas Importantes

### Seguridad
- Los endpoints protegidos requieren autenticación JWT
- Los endpoints públicos no necesitan token
- Mantén seguros tus tokens de prueba

### Validaciones
- La aplicación tiene validaciones estrictas en los DTOs
- Revisa los mensajes de error para ajustes necesarios
- Los formatos de fecha deben ser `DD/MM/YYYY`

### Configuración Regional
- Zona horaria configurada para `America/Bogota`
- Formatos de fecha en español (DD/MM/YYYY)
- Moneda en pesos colombianos (COP)

## 🆘 Solución de Problemas

### Error 401 (Unauthorized)
- Verifica que el `jwt_token` esté configurado correctamente
- Algunos endpoints pueden requerir roles específicos

### Error 404 (Not Found)
- Verifica que la aplicación esté corriendo en el puerto correcto
- Confirma que la URL base sea `http://localhost:8080`

### Error 500 (Internal Server Error)
- Revisa los logs de la aplicación
- Verifica que la base de datos H2 esté inicializada correctamente

### Datos de Prueba
Si necesitas limpiar datos entre pruebas:
1. Reinicia la aplicación (detiene e inicia el proceso)
2. La base de datos H2 se recrea automáticamente

## 📊 Monitoreo y Logs

La aplicación incluye:
- Logs detallados en consola
- Métricas de salud en `/public/health`
- Información de la aplicación en `/public/info`

## 🔄 Actualizaciones

Para actualizar la colección:
1. Importa el nuevo archivo JSON
2. Se reemplazará la colección existente
3. Verifica que las variables de entorno se mantengan

---

**Desarrollado para**: Sistema de Gestión Clínica
**Versión**: 1.0.0
**Última actualización**: Octubre 2024