import { useState, useEffect } from "react";
import type { Cita, Paciente, Doctor } from "../../types/dashboard.types";
import Modal from "./Modal";

interface CitaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cita: Omit<Cita, "id"> & { id?: number; pacienteId: number; doctorId: number }) => Promise<void>;
  cita?: Cita & { pacienteId?: number; doctorId?: number };
  mode: "create" | "edit";
  pacientes: Paciente[];
  doctores: Doctor[];
  currentDoctorId?: number; // ID del doctor actual si el usuario es doctor
  currentPacienteId?: number; // ID del paciente actual si el usuario es paciente
}

export default function CitaFormModal({
  isOpen,
  onClose,
  onSave,
  cita,
  mode,
  pacientes,
  doctores,
  currentDoctorId,
  currentPacienteId,
}: CitaFormModalProps) {
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    pacienteId: 0,
    doctorId: 0,
    estado: "PENDIENTE",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cita && mode === "edit") {
      setFormData({
        fecha: cita.fecha || "",
        hora: cita.hora || "",
        pacienteId: cita.pacienteId || 0,
        doctorId: cita.doctorId || 0,
        estado: cita.estado || "PENDIENTE",
      });
    } else {
      // Si es creación, pre-seleccionar doctor o paciente según el usuario actual
      setFormData({
        fecha: "",
        hora: "",
        pacienteId: currentPacienteId || 0,
        doctorId: currentDoctorId || 0,
        estado: "PENDIENTE",
      });
    }
    setError(null);
  }, [cita, mode, isOpen, currentDoctorId, currentPacienteId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.pacienteId === 0 || formData.doctorId === 0) {
      setError("Debe seleccionar un paciente y un doctor");
      setLoading(false);
      return;
    }

    try {
      const dataToSave = mode === "edit" && cita
        ? { ...formData, id: cita.id }
        : formData;
      
      await onSave(dataToSave as typeof formData & { id?: number });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar la cita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "create" ? "Nueva Cita" : "Editar Cita"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div>
          <label htmlFor="pacienteId" className="block text-sm font-medium text-gray-700 mb-1">
            Paciente <span className="text-red-500">*</span>
          </label>
          <select
            id="pacienteId"
            required
            value={formData.pacienteId}
            onChange={(e) => setFormData({ ...formData, pacienteId: Number(e.target.value) })}
            disabled={!!currentPacienteId} // Deshabilitar si el usuario es paciente
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value={0}>Seleccione un paciente</option>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nombre}
              </option>
            ))}
          </select>
          {currentPacienteId && (
            <p className="text-xs text-gray-500 mt-1">
              Las citas se crean automáticamente a tu nombre
            </p>
          )}
        </div>

        <div>
          <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-1">
            Doctor <span className="text-red-500">*</span>
          </label>
          <select
            id="doctorId"
            required
            value={formData.doctorId}
            onChange={(e) => setFormData({ ...formData, doctorId: Number(e.target.value) })}
            disabled={!!currentDoctorId} // Deshabilitar si el usuario es doctor
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value={0}>Seleccione un doctor</option>
            {doctores.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.nombre} {doctor.especialidad ? `- ${doctor.especialidad}` : ""}
              </option>
            ))}
          </select>
          {currentDoctorId && (
            <p className="text-xs text-gray-500 mt-1">
              Las citas se crean automáticamente a tu nombre
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="fecha"
              required
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="hora" className="block text-sm font-medium text-gray-700 mb-1">
              Hora <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="hora"
              required
              value={formData.hora}
              onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            id="estado"
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="PENDIENTE">Pendiente</option>
            <option value="CONFIRMADA">Confirmada</option>
            <option value="CANCELADA">Cancelada</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Guardando..." : mode === "create" ? "Crear Cita" : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
