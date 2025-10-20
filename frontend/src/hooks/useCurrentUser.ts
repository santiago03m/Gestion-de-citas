import { useEffect, useState } from "react";
import api from "../services/api";
import type { CurrentUserResponse } from "../types/dashboard.types";

export function useCurrentUser() {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await api.get<CurrentUserResponse>("/users/me");
        if (mounted && res.data) {
          setCurrentUser(res.data);
          // Guardar el ID apropiado según el rol
          if (res.data.doctorId) {
            setCurrentUserId(res.data.doctorId);
          } else if (res.data.pacienteId) {
            setCurrentUserId(res.data.pacienteId);
          }
        }
      } catch (err) {
        console.error("Error obteniendo usuario actual:", err);
        if (mounted) {
          setError("No se pudo obtener la información del usuario");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { currentUserId, currentUser, loading, error };
}
