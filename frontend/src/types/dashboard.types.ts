export type Paciente = {
  id: number;
  nombre: string;
  documento?: string;
  telefono?: string;
  correo?: string;
};

export type Doctor = {
  id: number;
  nombre: string;
  especialidad?: string;
  telefono?: string;
  correo?: string;
};

export type Usuario = {
  id: number;
  fullName: string;
  email: string;
  roles?: Array<{ id: number; name: string }>;
};

export type Cita = {
  id: number;
  fecha: string;
  hora: string;
  paciente?: { nombre: string };
  doctor?: { nombre: string };
  pacienteId?: number;
  doctorId?: number;
  estado?: string;
};

export type TabType = "pacientes" | "doctores" | "usuarios" | "citas";

export type DataItem = Paciente | Doctor | Usuario | Cita;

export type CurrentUserResponse = {
  id: number;
  fullName: string;
  email: string;
  roles: string[];
  pacienteId?: number;
  doctorId?: number;
};
