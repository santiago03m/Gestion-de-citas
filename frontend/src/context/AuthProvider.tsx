import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type AuthState } from "./AuthContext";
import { loginRequest, saveTokens, clearAuth } from "../services/authService";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    if (typeof window === "undefined")
      return { accessToken: null, roles: [], username: null };
    const token = localStorage.getItem("accessToken");
    const rolesRaw = localStorage.getItem("roles") ?? "[]";
    let rolesParsed: string[] = [];
    try {
      rolesParsed = JSON.parse(rolesRaw);
    } catch {
      rolesParsed = [];
    }
    const username = localStorage.getItem("username");
    return { accessToken: token, roles: rolesParsed, username };
  });

  useEffect(() => {}, []);

  async function login(username: string, password: string) {
    const data = await loginRequest(username, password);
    saveTokens(data);
    setAuth({
      accessToken: data.accessToken,
      roles: data.roles ?? [],
      username: data.email ?? username,
    });
  }

  function logout() {
    clearAuth();
    setAuth({ accessToken: null, roles: [], username: null });
  }

  function hasRole(role: string) {
    return auth.roles.includes(role);
  }

  function setAuthData(data: { accessToken: string; username: string; roles: string[]; expiresIn?: number }) {
    // Guardar en localStorage
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("roles", JSON.stringify(data.roles));
    localStorage.setItem("username", data.username);
    
    // Actualizar estado
    setAuth({
      accessToken: data.accessToken,
      roles: data.roles,
      username: data.username,
    });
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout, hasRole, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}
