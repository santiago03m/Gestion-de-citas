import { useEffect, useState } from "react";
import api from "../services/api";
import type { TabType, DataItem, Paciente, Doctor, Usuario, Cita } from "../types/dashboard.types";

type UseDashboardDataProps = {
  activeTab: TabType;
  currentUserId: number | null;
  hasRole: (role: string) => boolean;
};

export function useDashboardData({ activeTab, currentUserId, hasRole }: UseDashboardDataProps) {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [doctores, setDoctores] = useState<Doctor[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const reload = () => setReloadTrigger((prev) => prev + 1);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        let endpoint = "";
        let setter: (data: DataItem[]) => void = () => {};

        switch (activeTab) {
          case "pacientes":
            endpoint = "/pacientes";
            setter = setPacientes as (data: DataItem[]) => void;
            break;
          case "doctores":
            endpoint = "/doctores";
            setter = setDoctores as (data: DataItem[]) => void;
            break;
          case "usuarios":
            endpoint = "/users";
            setter = setUsuarios as (data: DataItem[]) => void;
            break;
          case "citas":
            // Filtrar citas según el rol
            if (hasRole("ADMIN")) {
              endpoint = "/citas";
            } else if (hasRole("DOCTOR") && currentUserId) {
              endpoint = `/citas/doctor/${currentUserId}`;
            } else if (hasRole("PACIENTE") && currentUserId) {
              endpoint = `/citas/paciente/${currentUserId}`;
            } else {
              // Si no hay userId aún, esperar
              if (mounted) setLoading(false);
              return;
            }
            setter = setCitas as (data: DataItem[]) => void;
            break;
        }

        const res = await api.get(endpoint);
        if (!mounted) return;

        const payload = res.data;
        let list: DataItem[] = [];

        if (Array.isArray(payload)) {
          list = payload;
        } else if (payload && Array.isArray(payload.data)) {
          list = payload.data;
        } else if (payload && typeof payload === "object") {
          // Intentar extraer array del objeto
          const keys = Object.keys(payload);
          for (const key of keys) {
            if (Array.isArray(payload[key])) {
              list = payload[key];
              break;
            }
          }
        }

        setter(list);
      } catch (err) {
        console.error(err);
        if (mounted) {
          setError(`No se pudo cargar la lista de ${activeTab}`);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [activeTab, currentUserId, hasRole, reloadTrigger]);

  return { pacientes, doctores, usuarios, citas, loading, error, reload };
}
