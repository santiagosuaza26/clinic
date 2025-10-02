# Sistema de Gestión de Clínica - Interfaz Gráfica

Interfaz gráfica profesional desarrollada en React para el sistema de gestión de clínica.

## 🚀 Características

- **Autenticación basada en roles** - Control de acceso según roles del personal médico
- **Interfaz responsiva** - Diseño moderno y adaptable a diferentes dispositivos
- **Comunicación con API REST** - Integración completa con el backend Java Spring Boot
- **TypeScript** - Type safety para desarrollo robusto
- **Material-UI** - Componentes modernos y consistentes

## 📋 Roles y Funcionalidades

### Recursos Humanos
- Gestión completa de usuarios
- Creación, edición y eliminación de cuentas
- Asignación de roles y permisos

### Personal Administrativo
- Registro de pacientes
- Gestión de información personal
- Contactos de emergencia
- Pólizas de seguros médicos
- Programación de citas
- Facturación y cálculos de copagos

### Enfermeras
- Registro de visitas de pacientes
- Signos vitales (presión arterial, temperatura, pulso, oxígeno)
- Administración de medicamentos
- Procedimientos realizados

### Médicos
- Historias clínicas completas
- Diagnósticos y tratamientos
- Órdenes médicas (medicamentos, procedimientos, ayudas diagnósticas)
- Resultados de pruebas

### Soporte de Información
- Gestión de inventario
- Mantenimiento de medicamentos
- Procedimientos disponibles
- Ayudas diagnósticas

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca principal para la interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez
- **Material-UI (MUI)** - Framework de componentes
- **React Router** - Navegación entre páginas
- **Axios** - Cliente HTTP para comunicación con API
- **React Hook Form** - Manejo de formularios
- **Context API** - Gestión de estado global
- **JWT** - Autenticación basada en tokens

## 📦 Instalación

1. **Instalar dependencias:**
   ```bash
   cd gui
   npm install
   ```

2. **Configurar variables de entorno:**
   Crear archivo `.env` en la raíz del proyecto:
   ```env
   REACT_APP_API_URL=http://localhost:8080/api
   ```

3. **Iniciar la aplicación:**
   ```bash
   npm start
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   ```

## 🏗️ Estructura del Proyecto

```
gui/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── auth/          # Componentes de autenticación
│   │   ├── layout/        # Componentes de layout (Navbar, etc.)
│   │   └── common/        # Componentes comunes
│   ├── pages/             # Páginas de la aplicación
│   │   ├── auth/          # Página de login
│   │   ├── dashboard/     # Dashboard principal
│   │   ├── users/         # Gestión de usuarios
│   │   ├── patients/      # Gestión de pacientes
│   │   ├── visits/        # Visitas de pacientes
│   │   ├── medical-records/ # Historias clínicas
│   │   ├── inventory/     # Gestión de inventario
│   │   ├── billing/       # Facturación
│   │   └── appointments/  # Citas médicas
│   ├── services/          # Servicios para comunicación con API
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utilidades y constantes
│   ├── context/           # Context API para estado global
│   ├── types/             # Definiciones TypeScript
│   └── styles/            # Estilos globales
├── package.json           # Dependencias del proyecto
├── tsconfig.json          # Configuración TypeScript
└── README.md              # Esta documentación
```

## 🔗 Conexión con Backend

La aplicación se conecta automáticamente con la API REST del backend Java Spring Boot que debe estar corriendo en `http://localhost:8080`.

### Endpoints principales utilizados:
- `/api/auth/login` - Inicio de sesión
- `/api/users/*` - Gestión de usuarios
- `/api/patients/*` - Gestión de pacientes
- `/api/patient-visits/*` - Visitas de pacientes
- `/api/medical-records/*` - Historias clínicas
- `/api/orders/*` - Órdenes médicas
- `/api/inventory/*` - Gestión de inventario
- `/api/billing/*` - Facturación
- `/api/appointments/*` - Citas médicas

## 🔐 Seguridad

- **Autenticación JWT** - Tokens seguros para mantener sesiones
- **Control de acceso basado en roles** - Cada usuario ve solo lo que puede acceder
- **Protección de rutas** - Componentes de protección automática
- **Refresh token automático** - Mantenimiento de sesiones activas

## 🎨 Características de UI/UX

- **Tema Material Design** - Diseño moderno y profesional
- **Responsive Design** - Funciona en desktop, tablet y móvil
- **Navegación intuitiva** - Menús organizados por roles
- **Feedback visual** - Estados de carga, errores y éxito
- **Accesibilidad** - Cumple estándares de accesibilidad web

## 🚧 Estado del Desarrollo

✅ **Completado:**
- Estructura base del proyecto
- Configuración inicial de React + TypeScript
- Sistema de autenticación básico
- Navegación por roles
- Páginas básicas para todos los módulos

🔄 **En Desarrollo:**
- Formularios de registro y edición
- Integración completa con API
- Validaciones avanzadas
- Dashboard con estadísticas reales

⏳ **Pendiente:**
- Funcionalidades avanzadas de cada módulo
- Reportes y exportación de datos
- Notificaciones en tiempo real
- Optimizaciones de rendimiento

## 📝 Desarrollo

Para contribuir al desarrollo:

1. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
2. Desarrollar la funcionalidad
3. Ejecutar pruebas: `npm test`
4. Crear Pull Request

## 🐛 Reportar Problemas

Si encuentras algún problema o tienes sugerencias, por favor crea un issue en el repositorio.

## 📄 Licencia

Este proyecto es parte del sistema de gestión de clínica desarrollado para fines educativos y profesionales.