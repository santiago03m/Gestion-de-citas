import type { TabType } from "../types/dashboard.types";

export function getAvailableTabs(hasRole: (role: string) => boolean): TabType[] {
  if (hasRole("ADMIN")) {
    return ["pacientes", "doctores", "usuarios", "citas"];
  } else if (hasRole("DOCTOR")) {
    return ["pacientes", "citas"];
  } else if (hasRole("PACIENTE")) {
    return ["citas"];
  }
  return [];
}

export function getDashboardTitle(hasRole: (role: string) => boolean): string {
  if (hasRole("ADMIN")) {
    return "Panel de Administración";
  } else if (hasRole("DOCTOR")) {
    return "Panel de Doctor";
  }
  return "Mis Citas";
}

export function getDashboardDescription(hasRole: (role: string) => boolean): string {
  if (hasRole("ADMIN")) {
    return "Gestiona pacientes, doctores, usuarios y citas";
  } else if (hasRole("DOCTOR")) {
    return "Gestiona pacientes y citas";
  }
  return "Visualiza y gestiona tus citas médicas";
}
