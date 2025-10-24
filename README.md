# 🏥 Sistema de Gestión de Citas Médicas

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Sistema completo de gestión de citas médicas con arquitectura de tres capas: Backend REST API con Spring Boot, Frontend con React + TypeScript, y base de datos PostgreSQL.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Documentation](#-api-documentation)
- [Componentes Frontend](#-componentes-frontend)
- [Seguridad](#-seguridad)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## ✨ Características

### Backend
- ✅ **Autenticación JWT** - Sistema completo de login/registro con tokens
- ✅ **Control de Acceso Basado en Roles (RBAC)** - ADMIN, DOCTOR, PACIENTE
- ✅ **API REST** - Endpoints RESTful con Spring Boot
- ✅ **Base de Datos Relacional** - PostgreSQL con JPA/Hibernate
- ✅ **Mapeo de Objetos** - MapStruct para conversión DTO ↔ Entity
- ✅ **Validación** - Bean Validation (Jakarta Validation)
- ✅ **Manejo de Excepciones** - GlobalExceptionHandler centralizado
- ✅ **CORS** - Configurado para desarrollo local

### Frontend
- ✅ **Dashboard Modular** - Arquitectura de componentes reutilizables
- ✅ **Sistema de Pestañas Dinámicas** - Según rol del usuario
- ✅ **CRUD Completo** - Pacientes, Doctores, Usuarios y Citas
- ✅ **Pre-selección Inteligente** - Formularios contextuales por rol
- ✅ **Modales Informativos** - Sin IDs técnicos, con iconos y descripciones
- ✅ **Gestión de Estado** - Context API para autenticación
- ✅ **Routing Protegido** - Rutas privadas con React Router
- ✅ **UI Moderna** - Tailwind CSS v4 con animaciones

### Funcionalidades por Rol

#### 👨‍⚕️ ADMIN
- Gestión completa de pacientes, doctores y usuarios
- Creación y modificación de citas
- Edición de contraseñas de usuarios
- Acceso total al sistema

#### 🩺 DOCTOR
- Visualización de pacientes
- Gestión de sus propias citas
- Pre-selección automática en formularios
- Acceso limitado a sus datos

#### 🤒 PACIENTE
- Visualización de sus citas
- Creación de nuevas citas
- Pre-selección automática como paciente
- Acceso solo a información personal

---

## 🏗 Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │  Components  │  │    Hooks     │      │
│  │  Dashboard   │  │   Modals     │  │  useAuth     │      │
│  │   Welcome    │  │   Tables     │  │  useData     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         ↓                  ↓                  ↓             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Services (Axios + JWT Interceptors)         │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────────┬─────────────────────────────┘
                                ↓ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Spring Boot)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Controllers  │→ │   Services   │→ │ Repositories │      │
│  │  REST API    │  │   Business   │  │     JPA      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         ↑                  ↑                  ↓             │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │   Security   │  │    Mappers   │                        │
│  │  JWT Filter  │  │  MapStruct   │                        │
│  └──────────────┘  └──────────────┘                        │
└───────────────────────────────┬─────────────────────────────┘
                                ↓ JDBC
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE (PostgreSQL)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Users   │  │ Pacientes│  │ Doctores │  │  Citas   │   │
│  │  Roles   │  │          │  │          │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Datos

1. **Autenticación:**
   ```
   Usuario → Login → Backend (AuthController) → JWT Token → Frontend (localStorage) → Axios Interceptor
   ```

2. **Operaciones CRUD:**
   ```
   UI → Evento → Service (Axios) → Backend Controller → Service Layer → Repository → Database
   ```

3. **Protección de Rutas:**
   ```
   Navegación → PrivateRoute → hasRole() → Dashboard (según rol)
   ```

---

## 🛠 Tecnologías

### Backend

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Spring Boot** | 3.5.6 | Framework principal |
| **Java** | 21 | Lenguaje de programación |
| **Spring Security** | 6.x | Autenticación y autorización |
| **JWT** | 0.11.5 | Tokens de autenticación |
| **Spring Data JPA** | 3.x | ORM y repositorios |
| **PostgreSQL** | 15+ | Base de datos relacional |
| **MapStruct** | 1.5.5 | Mapeo automático DTO ↔ Entity |
| **Lombok** | 1.18.40 | Reducción de boilerplate |
| **Jakarta Validation** | 3.x | Validación de datos |
| **Maven** | 3.9+ | Gestión de dependencias |

### Frontend

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React** | 19.1.1 | Librería UI |
| **TypeScript** | 5.9.3 | Tipado estático |
| **Vite** | 7.1.7 | Build tool |
| **React Router** | 6.30.1 | Routing |
| **Axios** | 1.12.2 | Cliente HTTP |
| **Tailwind CSS** | 4.1.14 | Framework CSS |
| **Context API** | - | Gestión de estado global |

---

## 📦 Requisitos Previos

### Desarrollo Local

- **Java JDK** 21 o superior
- **Node.js** 20.x o superior
- **PostgreSQL** 15.x o superior
- **Maven** 3.9+ (o usar el wrapper incluido)
- **Git** para control de versiones

### Herramientas Recomendadas

- **IntelliJ IDEA** / **Eclipse** para backend
- **VS Code** para frontend
- **Postman** / **Insomnia** para testing de API
- **pgAdmin** / **DBeaver** para gestión de base de datos

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/santiago03m/Gestion-de-citas.git
cd Gestion-de-citas
```

### 2. Configurar Base de Datos

```bash
# Crear base de datos PostgreSQL
psql -U postgres
CREATE DATABASE citasdb;
CREATE USER citas_user WITH ENCRYPTED PASSWORD 'citas_pass_123';
GRANT ALL PRIVILEGES ON DATABASE citasdb TO citas_user;
\q
```

### 3. Configurar Backend

```bash
cd backend

# Crear archivo .env (opcional)
echo "JWT_SECRET=tu_secreto_jwt_super_seguro_de_minimo_256_bits" > .env

# Compilar y ejecutar
./mvnw clean install
./mvnw spring-boot:run
```

El backend estará disponible en `http://localhost:8080`

### 4. Configurar Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

---

## ⚙️ Configuración

### Variables de Entorno (Backend)

Crear archivo `.env` en la carpeta `backend/`:

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=citasdb
DB_USER=citas_user
DB_PASS=citas_pass_123

# JWT
JWT_SECRET=tu_secreto_jwt_super_seguro_de_minimo_256_bits_en_base64
```

### Variables de Entorno (Frontend)

Crear archivo `.env` en la carpeta `frontend/`:

```env
VITE_API_URL=http://localhost:8080/api
```

### Configuración de Base de Datos (application.properties)

```properties
# Ubicación: backend/src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:citasdb}
spring.datasource.username=${DB_USER:citas_user}
spring.datasource.password=${DB_PASS:citas_pass_123}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

security.jwt.secret-key=${JWT_SECRET}
security.jwt.expiration-time=3600000
```

---

## 📁 Estructura del Proyecto

### Backend Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/gestion/citas/
│   │   │   ├── config/                      # Configuraciones
│   │   │   │   ├── ApplicationConfiguration.java
│   │   │   │   ├── SecurityConfig.java      # Spring Security + JWT
│   │   │   │   └── JwtAuthenticationFilter.java
│   │   │   ├── controller/                  # Controladores REST
│   │   │   │   ├── AuthController.java      # Login/Register
│   │   │   │   ├── UserController.java      # Gestión usuarios
│   │   │   │   ├── PacienteController.java
│   │   │   │   ├── DoctorController.java
│   │   │   │   └── CitaController.java
│   │   │   ├── service/                     # Lógica de negocio
│   │   │   │   ├── JwtService.java
│   │   │   │   ├── PacienteService.java
│   │   │   │   ├── DoctorService.java
│   │   │   │   ├── CitaService.java
│   │   │   │   └── impl/                    # Implementaciones
│   │   │   ├── repository/                  # Repositorios JPA
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── RoleRepository.java
│   │   │   │   ├── PacienteRepository.java
│   │   │   │   ├── DoctorRepository.java
│   │   │   │   └── CitaRepository.java
│   │   │   ├── model/
│   │   │   │   ├── entity/                  # Entidades JPA
│   │   │   │   │   ├── User.java
│   │   │   │   │   ├── Role.java
│   │   │   │   │   ├── Paciente.java
│   │   │   │   │   ├── Doctor.java
│   │   │   │   │   └── Cita.java
│   │   │   │   └── dto/                     # Data Transfer Objects
│   │   │   │       ├── AuthenticationRequest.java
│   │   │   │       ├── AuthenticationResponse.java
│   │   │   │       ├── RegisterRequest.java
│   │   │   │       ├── CurrentUserDto.java
│   │   │   │       ├── UpdateUserDto.java
│   │   │   │       ├── PacienteDto.java
│   │   │   │       ├── DoctorDto.java
│   │   │   │       └── CitaDto.java
│   │   │   ├── mapper/                      # MapStruct Mappers
│   │   │   │   ├── PacienteMapper.java
│   │   │   │   ├── DoctorMapper.java
│   │   │   │   └── CitaMapper.java
│   │   │   ├── exceptions/                  # Manejo de errores
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   └── ResourceNotFoundException.java
│   │   │   └── CitasApplication.java        # Clase principal
│   │   └── resources/
│   │       ├── application.properties       # Configuración principal
│   │       └── application-docker.properties
│   └── test/                                # Tests
├── pom.xml                                  # Dependencias Maven
└── .env                                     # Variables de entorno
```

### Frontend Structure

```
frontend/
├── src/
│   ├── main.tsx                             # Punto de entrada
│   ├── App.tsx                              # Componente raíz
│   ├── pages/                               # Páginas principales
│   │   ├── Welcome.tsx                      # Landing page
│   │   └── Dashboard.tsx                    # Dashboard principal
│   ├── components/                          # Componentes reutilizables
│   │   ├── login.tsx                        # Formulario login
│   │   ├── Register.tsx                     # Formulario registro
│   │   └── dashboard/                       # Componentes del dashboard
│   │       ├── ActionButtons.tsx            # Botones de acciones
│   │       ├── DashboardNavbar.tsx          # Barra de navegación
│   │       ├── DashboardTabs.tsx            # Sistema de pestañas
│   │       ├── DataTable.tsx                # Tabla genérica de datos
│   │       ├── Modal.tsx                    # Modal base
│   │       ├── LoadingSpinner.tsx           # Indicador de carga
│   │       ├── ErrorAlert.tsx               # Alertas de error
│   │       ├── EmptyState.tsx               # Estado vacío
│   │       ├── EntityDetailsModal.tsx       # Modal de detalles
│   │       ├── PacientesTab.tsx             # Pestaña pacientes
│   │       ├── PacienteFormModal.tsx        # Formulario paciente
│   │       ├── DoctoresTab.tsx              # Pestaña doctores
│   │       ├── DoctorFormModal.tsx          # Formulario doctor
│   │       ├── CitasTab.tsx                 # Pestaña citas
│   │       ├── CitaFormModal.tsx            # Formulario cita
│   │       ├── UsuariosTab.tsx              # Pestaña usuarios
│   │       ├── UsuarioFormModal.tsx         # Formulario usuario
│   │       └── ConfirmDeleteModal.tsx       # Modal confirmación
│   ├── hooks/                               # Custom Hooks
│   │   ├── useAuth.ts                       # Hook de autenticación
│   │   ├── useCurrentUser.ts                # Hook usuario actual
│   │   └── useDashboardData.ts              # Hook carga de datos
│   ├── context/                             # Context API
│   │   ├── AuthContext.ts                   # Contexto auth
│   │   └── AuthProvider.tsx                 # Provider auth
│   ├── services/                            # Servicios HTTP
│   │   ├── api.ts                           # Cliente Axios
│   │   └── authService.ts                   # Servicios auth
│   ├── types/                               # TypeScript Types
│   │   └── dashboard.types.ts               # Tipos del dashboard
│   ├── utils/                               # Utilidades
│   │   └── dashboardHelpers.ts              # Helpers dashboard
│   ├── index.css                            # Estilos globales
│   └── App.css                              # Estilos App
├── public/                                  # Archivos estáticos
├── package.json                             # Dependencias npm
├── tsconfig.json                            # Configuración TypeScript
├── vite.config.ts                           # Configuración Vite
└── tailwind.config.js                       # Configuración Tailwind
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Autenticación

#### POST `/auth/register` - Registro de usuario
```json
Request:
{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "fullName": "Nombre Completo"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600000
}
```

#### POST `/auth/login` - Inicio de sesión
```json
Request:
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600000
}
```

### Usuarios

#### GET `/users/me` - Usuario actual
```json
Response: 200 OK
{
  "id": 1,
  "fullName": "Nombre Completo",
  "email": "usuario@ejemplo.com",
  "roles": ["ADMIN"],
  "pacienteId": 5,
  "doctorId": null
}
```

#### GET `/users` - Listar usuarios (ADMIN)
```json
Response: 200 OK
[
  {
    "id": 1,
    "fullName": "Admin User",
    "email": "admin@ejemplo.com",
    "roles": [
      { "id": 1, "name": "ADMIN" }
    ]
  }
]
```

#### PUT `/users/{id}` - Actualizar usuario (ADMIN)
```json
Request:
{
  "fullName": "Nuevo Nombre",
  "email": "nuevo@ejemplo.com",
  "password": "nueva_password" // Opcional
}

Response: 200 OK
{
  "id": 1,
  "fullName": "Nuevo Nombre",
  "email": "nuevo@ejemplo.com"
}
```

#### DELETE `/users/{id}` - Eliminar usuario (ADMIN)
```
Response: 204 No Content
```

### Pacientes

#### GET `/pacientes` - Listar pacientes
```json
Response: 200 OK
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "documento": "12345678",
    "telefono": "3001234567",
    "correo": "juan@ejemplo.com"
  }
]
```

#### GET `/pacientes/{id}` - Obtener paciente
```json
Response: 200 OK
{
  "id": 1,
  "nombre": "Juan Pérez",
  "documento": "12345678",
  "telefono": "3001234567",
  "correo": "juan@ejemplo.com"
}
```

#### POST `/pacientes` - Crear paciente
```json
Request:
{
  "nombre": "Juan Pérez",
  "documento": "12345678",
  "telefono": "3001234567",
  "correo": "juan@ejemplo.com"
}

Response: 201 Created
{
  "id": 1,
  "nombre": "Juan Pérez",
  "documento": "12345678",
  "telefono": "3001234567",
  "correo": "juan@ejemplo.com"
}
```

#### PUT `/pacientes/{id}` - Actualizar paciente
```json
Request:
{
  "nombre": "Juan Pérez Actualizado",
  "documento": "12345678",
  "telefono": "3001234567",
  "correo": "juan@ejemplo.com"
}

Response: 200 OK
{
  "id": 1,
  "nombre": "Juan Pérez Actualizado",
  ...
}
```

#### DELETE `/pacientes/{id}` - Eliminar paciente
```
Response: 204 No Content
```

### Doctores

#### GET `/doctores` - Listar doctores
```json
Response: 200 OK
[
  {
    "id": 1,
    "nombre": "Dra. María García",
    "especialidad": "Cardiología",
    "telefono": "3009876543",
    "correo": "maria@ejemplo.com"
  }
]
```

#### POST `/doctores` - Crear doctor
```json
Request:
{
  "nombre": "Dr. Carlos López",
  "especialidad": "Pediatría",
  "telefono": "3001112233",
  "correo": "carlos@ejemplo.com"
}

Response: 201 Created
```

#### PUT `/doctores/{id}` - Actualizar doctor
#### DELETE `/doctores/{id}` - Eliminar doctor

### Citas

#### GET `/citas` - Listar todas las citas (ADMIN)
```json
Response: 200 OK
[
  {
    "id": 1,
    "fecha": "2025-01-15",
    "hora": "10:30",
    "estado": "PENDIENTE",
    "paciente": {
      "id": 1,
      "nombre": "Juan Pérez"
    },
    "doctor": {
      "id": 1,
      "nombre": "Dra. María García"
    }
  }
]
```

#### GET `/citas/doctor/{doctorId}` - Citas de un doctor
```json
Response: 200 OK
[...]
```

#### GET `/citas/paciente/{pacienteId}` - Citas de un paciente
```json
Response: 200 OK
[...]
```

#### POST `/citas` - Crear cita
```json
Request:
{
  "fecha": "2025-01-15",
  "hora": "10:30",
  "pacienteId": 1,
  "doctorId": 1,
  "estado": "PENDIENTE"
}

Response: 201 Created
{
  "id": 1,
  "fecha": "2025-01-15",
  "hora": "10:30",
  "estado": "PENDIENTE",
  "paciente": {
    "id": 1,
    "nombre": "Juan Pérez"
  },
  "doctor": {
    "id": 1,
    "nombre": "Dra. María García"
  }
}
```

#### PUT `/citas/{id}` - Actualizar cita
```json
Request:
{
  "fecha": "2025-01-16",
  "hora": "11:00",
  "pacienteId": 1,
  "doctorId": 1,
  "estado": "CONFIRMADA"
}

Response: 200 OK
```

#### DELETE `/citas/{id}` - Eliminar cita
```
Response: 204 No Content
```

### Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 204 | No Content - Eliminación exitosa |
| 400 | Bad Request - Error de validación |
| 401 | Unauthorized - Token inválido/expirado |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## 🎨 Componentes Frontend

### Componentes Principales

#### **Dashboard.tsx**
Componente orquestador principal del sistema. Gestiona:
- Sistema de pestañas dinámicas según rol
- Estados de modales (crear, editar, eliminar, ver)
- Carga de datos con `useDashboardData`
- Handlers para todas las operaciones CRUD

```typescript
// Uso
<Dashboard />

// Features:
- Pestañas dinámicas: ADMIN (4 tabs), DOCTOR (2 tabs), PACIENTE (1 tab)
- Pre-selección automática de doctor/paciente en formularios
- Recarga automática después de operaciones
- Validación de permisos por rol
```

#### **Modal.tsx**
Modal base reutilizable con:
- Backdrop translúcido con glassmorphism
- Animaciones fadeIn
- Cierre con ESC o click fuera
- Tamaños configurables (sm, md, lg, xl)

```typescript
<Modal 
  isOpen={true}
  onClose={() => {}}
  title="Título del Modal"
  size="md"
>
  {children}
</Modal>
```

#### **DataTable.tsx**
Tabla genérica con TypeScript generics:
- Columnas configurables con renderizado custom
- Botones de acción (ver, editar, eliminar)
- Responsive design
- Hover effects

```typescript
<DataTable<Paciente>
  data={pacientes}
  columns={columns}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
  getRowKey={(item) => item.id}
/>
```

### Componentes de Formulario

#### **CitaFormModal.tsx**
Formulario inteligente de citas con:
- Pre-selección de doctor para usuarios DOCTOR
- Pre-selección de paciente para usuarios PACIENTE
- Campos deshabilitados contextuales
- Validación de campos requeridos
- Mensajes informativos

```typescript
<CitaFormModal
  isOpen={true}
  onClose={() => {}}
  onSave={handleSave}
  cita={citaToEdit}
  mode="edit"
  pacientes={pacientes}
  doctores={doctores}
  currentDoctorId={15}  // Pre-selección
  currentPacienteId={8} // Pre-selección
/>
```

#### **PacienteFormModal.tsx**
Formulario de pacientes:
- Nombre (requerido)
- Documento
- Teléfono
- Correo electrónico
- Modos: create/edit

#### **DoctorFormModal.tsx**
Formulario de doctores:
- Nombre (requerido)
- Especialidad
- Teléfono
- Correo electrónico

#### **UsuarioFormModal.tsx**
Formulario de usuarios (solo ADMIN):
- Nombre completo
- Email
- Contraseña (opcional - vacío mantiene actual)
- Toggle show/hide password
- Nota informativa sobre roles

### Componentes de Visualización

#### **EntityDetailsModal.tsx**
Modal de detalles sin IDs técnicos:
- Cabecera visual con iconos SVG
- Iconos emoji para cada campo
- Descripciones amigables
- Formato de fecha en español
- Badges con colores para estados

**Tipos soportados:**
- `paciente` - 🔵 Azul
- `doctor` - 🟢 Verde
- `usuario` - 🟣 Púrpura
- `cita` - 🔷 Índigo

```typescript
<EntityDetailsModal
  type="cita"
  data={cita}
  isOpen={true}
  onClose={() => {}}
/>
```

### Custom Hooks

#### **useAuth**
Hook de autenticación:
```typescript
const { auth, login, logout, hasRole } = useAuth();

// Métodos:
- auth: { token, username, roles }
- login(email, password): Promise<void>
- logout(): void
- hasRole(role: string): boolean
```

#### **useCurrentUser**
Hook para obtener usuario actual:
```typescript
const { currentUserId, currentUser, loading, error } = useCurrentUser();

// Retorna:
- currentUserId: number | null
- currentUser: { id, fullName, email, roles, pacienteId?, doctorId? }
- loading: boolean
- error: string | null
```

#### **useDashboardData**
Hook para carga de datos del dashboard:
```typescript
const { pacientes, doctores, usuarios, citas, loading, error, reload } = useDashboardData({
  activeTab: 'citas',
  currentUserId: 1,
  hasRole: (role) => true
});

// Características:
- Carga datos según pestaña activa
- Filtra citas por rol (ADMIN: todas, DOCTOR: sus citas, PACIENTE: sus citas)
- Función reload() para recargar datos
```

### Utilidades

#### **dashboardHelpers.ts**
Funciones auxiliares:
```typescript
// Pestañas disponibles según rol
getAvailableTabs(hasRole): TabType[]

// Título del dashboard
getDashboardTitle(hasRole): string

// Descripción del dashboard
getDashboardDescription(hasRole): string
```

---

## 🔒 Seguridad

### Autenticación JWT

#### Flujo de Autenticación
1. Usuario envía credenciales → `POST /auth/login`
2. Backend valida → Genera JWT token
3. Frontend guarda token → `localStorage`
4. Requests incluyen token → Header `Authorization: Bearer <token>`
5. Backend valida token → Permite acceso

#### Configuración JWT
```java
// JwtService.java
- Algoritmo: HS256
- Secreto: Variable de entorno JWT_SECRET (256+ bits)
- Expiración: 1 hora (configurable)
- Claims: username, roles
```

### Spring Security

#### SecurityConfig.java
```java
// Rutas públicas
/api/auth/**  → Sin autenticación
/api/test/**  → Sin autenticación

// Rutas protegidas
/api/**  → Requiere autenticación JWT

// CORS
Permitido desde: http://localhost:5173 (frontend dev)
```

#### Roles y Permisos

| Endpoint | ADMIN | DOCTOR | PACIENTE |
|----------|-------|--------|----------|
| GET /pacientes | ✅ | ✅ | ❌ |
| POST /pacientes | ✅ | ❌ | ❌ |
| GET /doctores | ✅ | ✅ | ❌ |
| POST /doctores | ✅ | ❌ | ❌ |
| GET /usuarios | ✅ | ❌ | ❌ |
| PUT /usuarios/{id} | ✅ | ❌ | ❌ |
| GET /citas | ✅ | ❌ | ❌ |
| GET /citas/doctor/{id} | ✅ | ✅* | ❌ |
| GET /citas/paciente/{id} | ✅ | ❌ | ✅* |
| POST /citas | ✅ | ✅ | ✅ |
| PUT /citas/{id} | ✅ | ✅* | ✅* |
| DELETE /citas/{id} | ✅ | ✅* | ✅* |

*Solo sus propios recursos

### Protección Frontend

#### PrivateRoute
```typescript
// Componente de ruta protegida
<PrivateRoute>
  <Dashboard />
</PrivateRoute>

// Redirige a /welcome si no está autenticado
```

#### Validación de Roles
```typescript
// En componentes
{hasRole("ADMIN") && <button>Acción de Admin</button>}

// En formularios
onNew={hasRole("ADMIN") ? handleNewPaciente : undefined}
```

### Mejores Prácticas Implementadas

✅ **Contraseñas Encriptadas** - BCryptPasswordEncoder
✅ **Tokens con Expiración** - 1 hora configurable
✅ **CORS Restrictivo** - Solo orígenes permitidos
✅ **Validación de Input** - Bean Validation
✅ **SQL Injection Prevention** - JPA/Hibernate
✅ **XSS Protection** - Sanitización automática React
✅ **CSRF Protection** - Stateless JWT (no cookies)

---

## 🧪 Testing

### Backend Testing

```bash
# Ejecutar todos los tests
./mvnw test

# Ejecutar con cobertura
./mvnw test jacoco:report

# Ejecutar tests específicos
./mvnw test -Dtest=CitaServiceTest
```

### Frontend Testing

```bash
# Ejecutar tests (si están configurados)
npm run test

# Linting
npm run lint
```

### Testing Manual

#### Postman Collection
Importar colección de Postman con todos los endpoints:
```
docs/postman/Gestion-Citas-API.postman_collection.json
```

#### Usuarios de Prueba
```
ADMIN:
- Email: admin@test.com
- Password: admin123

DOCTOR:
- Email: doctor@test.com
- Password: doctor123

PACIENTE:
- Email: paciente@test.com
- Password: paciente123
```

---

## 🚀 Deployment

### Docker Compose (Recomendado)

```bash
# Construir y levantar todos los servicios
docker-compose up --build -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

Servicios incluidos:
- `database` - PostgreSQL 15 (puerto 5432)
- `backend` - Spring Boot (puerto 8080)
- `frontend` - Nginx + React (puerto 80)

### Deployment en Producción

#### Backend (Spring Boot)

```bash
# Generar JAR
./mvnw clean package -DskipTests

# Ejecutar JAR
java -jar target/citas-0.0.1-SNAPSHOT.jar
```

#### Frontend (React + Vite)

```bash
# Build para producción
npm run build

# Archivos generados en: dist/
# Servir con nginx, Apache, o CDN
```

### Variables de Entorno de Producción

```env
# Backend
DB_HOST=production-db-host
DB_PORT=5432
DB_NAME=citasdb_prod
DB_USER=citas_prod_user
DB_PASS=<contraseña_segura>
JWT_SECRET=<secreto_256bits_base64>

# Frontend
VITE_API_URL=https://api.tusitio.com/api
```

---

## 📊 Modelo de Base de Datos

### Diagrama ER

```
┌─────────────────┐         ┌─────────────────┐
│      Users      │         │      Roles      │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │    M─N  │ id (PK)         │
│ email           │◄────────┤ name            │
│ password        │         │                 │
│ full_name       │         └─────────────────┘
└─────────────────┘
        │
        │ 1:1
        ▼
┌─────────────────┐         ┌─────────────────┐
│   Pacientes     │         │    Doctores     │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │         │ id (PK)         │
│ nombre          │         │ nombre          │
│ documento       │         │ especialidad    │
│ telefono        │         │ telefono        │
│ correo          │         │ correo          │
└─────────────────┘         └─────────────────┘
        │                           │
        │ 1                     1   │
        │                           │
        └──────────┬──────────┘
                   │
                   │ M
                   ▼
            ┌─────────────────┐
            │      Citas      │
            ├─────────────────┤
            │ id (PK)         │
            │ fecha           │
            │ hora            │
            │ motivo          │
            │ estado          │
            │ paciente_id(FK) │
            │ doctor_id (FK)  │
            └─────────────────┘
```

### Tablas

#### `users`
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `roles`
```sql
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Roles predefinidos
INSERT INTO roles (name) VALUES ('ADMIN'), ('DOCTOR'), ('PACIENTE');
```

#### `user_roles`
```sql
CREATE TABLE user_roles (
    user_id INTEGER REFERENCES users(id),
    role_id INTEGER REFERENCES roles(id),
    PRIMARY KEY (user_id, role_id)
);
```

#### `pacientes`
```sql
CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    documento VARCHAR(50),
    telefono VARCHAR(20),
    correo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `doctores`
```sql
CREATE TABLE doctores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    especialidad VARCHAR(100),
    telefono VARCHAR(20),
    correo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `citas`
```sql
CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    motivo TEXT,
    estado VARCHAR(50) DEFAULT 'PENDIENTE',
    paciente_id INTEGER REFERENCES pacientes(id),
    doctor_id INTEGER REFERENCES doctores(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🤝 Contribución

### Workflow de Contribución

1. **Fork** el repositorio
2. **Crear rama** feature: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** cambios: `git commit -m 'feat: Agregar nueva funcionalidad'`
4. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
5. **Abrir Pull Request**

### Convención de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Nueva característica
fix: Corrección de bug
docs: Documentación
style: Formato, sin cambios de código
refactor: Refactorización de código
test: Agregar/modificar tests
chore: Mantenimiento, dependencias
```

### Estándares de Código

#### Backend (Java)
- Seguir convenciones de Java (Google Style Guide)
- Usar Lombok para reducir boilerplate
- Documentar métodos públicos con Javadoc
- Tests unitarios para servicios

#### Frontend (TypeScript)
- Usar TypeScript estricto
- Componentes funcionales con hooks
- Props bien tipadas
- ESLint configurado

---

## 📝 Roadmap

### Versión 1.0 (Actual)
- [x] Sistema de autenticación JWT
- [x] CRUD completo de pacientes, doctores y citas
- [x] Dashboard con roles diferenciados
- [x] Pre-selección inteligente de formularios
- [x] Gestión de usuarios por admin

### Versión 1.1 (Próximo)
- [ ] Notificaciones por email
- [ ] Recordatorios de citas
- [ ] Historial de citas
- [ ] Calendario visual
- [ ] Exportación a PDF

### Versión 2.0 (Futuro)
- [ ] App móvil (React Native)
- [ ] Videollamadas integradas
- [ ] Pagos en línea
- [ ] Análisis y reportes
- [ ] Multi-tenancy

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

```
MIT License

Copyright (c) 2025 Santiago

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👥 Autores

- **Santiago** - Desarrollo Full Stack - [@santiago03m](https://github.com/santiago03m)

---

## 🙏 Agradecimientos

- Spring Boot Team
- React Team
- MapStruct
- Tailwind CSS
- Comunidad Open Source

---

## 📞 Contacto

- **GitHub:** [@santiago03m](https://github.com/santiago03m)
- **Email:** santiruedadhhd@gmail.com

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [Spring Boot Docs](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Tutoriales Relacionados
- JWT Authentication with Spring Boot
- React + TypeScript Best Practices
- PostgreSQL Performance Tuning

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub ⭐**

Made with ❤️ by Santiago

</div>
