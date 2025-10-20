import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

export default function Register() {
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    telefono: "",
    correo: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    nombre?: string;
    documento?: string;
    correo?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const errors: typeof validationErrors = {};

    if (!formData.nombre.trim()) {
      errors.nombre = "El nombre completo es requerido";
    }

    if (!formData.documento.trim()) {
      errors.documento = "El documento es requerido";
    }

    if (!formData.correo.trim()) {
      errors.correo = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      errors.correo = "Correo inválido";
    }

    if (!formData.password) {
      errors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Registrar usuario con todos los datos del paciente
      const registerPayload = {
        fullName: formData.nombre,
        email: formData.correo,
        password: formData.password,
        roleName: "PACIENTE",
        // Datos adicionales del paciente para que el backend los procese
        documento: formData.documento,
        telefono: formData.telefono || null,
      };

      const response = await axios.post(`${API_URL}/auth/register`, registerPayload);
      const { accessToken, email, roles, expiresIn } = response.data;

      // Auto-login
      setAuthData({
        accessToken,
        username: email,
        roles: roles || [],
        expiresIn,
      });

      // Redirigir a página de bienvenida
      navigate("/welcome");
    } catch (err) {
      const error = err as { response?: { status?: number; data?: { message?: string } } };
      if (error.response?.status === 400) {
        setError("Este correo o documento ya está registrado");
      } else {
        setError(
          error.response?.data?.message || "Error al registrar. Intenta nuevamente."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error de validación del campo cuando el usuario empieza a escribir
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card principal */}
        <div className="card">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
          </div>

          {/* Título */}
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Registro de Paciente
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Completa tus datos para crear tu cuenta
          </p>

          {/* Mensaje de error general */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
              <svg
                className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre completo */}
            <div>
              <label className="label">Nombre Completo</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={validationErrors.nombre ? "input-error" : "input"}
                placeholder="Juan Pérez"
                disabled={loading}
              />
              {validationErrors.nombre && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.nombre}
                </p>
              )}
            </div>

            {/* Documento */}
            <div>
              <label className="label">Documento de Identidad</label>
              <input
                type="text"
                name="documento"
                value={formData.documento}
                onChange={handleChange}
                className={validationErrors.documento ? "input-error" : "input"}
                placeholder="12345678"
                disabled={loading}
              />
              {validationErrors.documento && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.documento}
                </p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label className="label">Teléfono (opcional)</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="input"
                placeholder="+57 300 123 4567"
                disabled={loading}
              />
            </div>

            {/* Correo */}
            <div>
              <label className="label">Correo Electrónico</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className={validationErrors.correo ? "input-error" : "input"}
                placeholder="tu@email.com"
                disabled={loading}
              />
              {validationErrors.correo && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.correo}
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label className="label">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={validationErrors.password ? "input-error" : "input"}
                placeholder="••••••••"
                disabled={loading}
              />
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="label">Confirmar Contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={
                  validationErrors.confirmPassword ? "input-error" : "input"
                }
                placeholder="••••••••"
                disabled={loading}
              />
              {validationErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-base"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Registrando...</span>
                </>
              ) : (
                <span>Crear cuenta</span>
              )}
            </button>
          </form>

          {/* Link a login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Inicia Sesión
              </Link>
            </p>
          </div>
        </div>

        {/* Link a inicio */}
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
