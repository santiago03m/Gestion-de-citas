import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useDashboardData } from "../hooks/useDashboardData";
import {
  getAvailableTabs,
  getDashboardTitle,
  getDashboardDescription,
} from "../utils/dashboardHelpers";
import type {
  TabType,
  Paciente,
  Doctor,
  Usuario,
  Cita,
} from "../types/dashboard.types";
import api from "../services/api";

// Componentes
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardTabs from "../components/dashboard/DashboardTabs";
import LoadingSpinner from "../components/dashboard/LoadingSpinner";
import ErrorAlert from "../components/dashboard/ErrorAlert";
import PacientesTab from "../components/dashboard/PacientesTab";
import DoctoresTab from "../components/dashboard/DoctoresTab";
import UsuariosTab from "../components/dashboard/UsuariosTab";
import CitasTab from "../components/dashboard/CitasTab";
import EntityDetailsModal from "../components/dashboard/EntityDetailsModal";
import PacienteFormModal from "../components/dashboard/PacienteFormModal";
import DoctorFormModal from "../components/dashboard/DoctorFormModal";
import CitaFormModal from "../components/dashboard/CitaFormModal";
import UsuarioFormModal from "../components/dashboard/UsuarioFormModal";
import ConfirmDeleteModal from "../components/dashboard/ConfirmDeleteModal";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout, auth, hasRole } = useAuth();

  // Obtener usuario actual y sus IDs relacionados
  const { currentUserId, currentUser } = useCurrentUser();

  // Determinar pestañas disponibles según el rol
  const tabs = getAvailableTabs(hasRole);

  // Estado para las pestañas - inicializar con la primera pestaña disponible
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0] || "citas");

  // Cargar datos según la pestaña activa
  const { pacientes, doctores, usuarios, citas, loading, error, reload } =
    useDashboardData({
      activeTab,
      currentUserId,
      hasRole,
    });

  // Estados para modales
  const [detailsModal, setDetailsModal] = useState<{
    isOpen: boolean;
    type: "paciente" | "doctor" | "usuario" | "cita" | null;
    data: Paciente | Doctor | Usuario | Cita | null;
  }>({ isOpen: false, type: null, data: null });

  const [pacienteFormModal, setPacienteFormModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    data?: Paciente;
  }>({ isOpen: false, mode: "create" });

  const [doctorFormModal, setDoctorFormModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    data?: Doctor;
  }>({ isOpen: false, mode: "create" });

  const [citaFormModal, setCitaFormModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    data?: Cita;
  }>({ isOpen: false, mode: "create" });

  const [usuarioFormModal, setUsuarioFormModal] = useState<{
    isOpen: boolean;
    data?: Usuario;
  }>({ isOpen: false });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: "paciente" | "doctor" | "usuario" | "cita" | null;
    id: number | null;
    name: string;
  }>({ isOpen: false, type: null, id: null, name: "" });

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Handlers para Ver detalles
  const handleViewPaciente = (paciente: Paciente) => {
    setDetailsModal({ isOpen: true, type: "paciente", data: paciente });
  };

  const handleViewDoctor = (doctor: Doctor) => {
    setDetailsModal({ isOpen: true, type: "doctor", data: doctor });
  };

  const handleViewUsuario = (usuario: Usuario) => {
    setDetailsModal({ isOpen: true, type: "usuario", data: usuario });
  };

  const handleViewCita = (cita: Cita) => {
    setDetailsModal({ isOpen: true, type: "cita", data: cita });
  };

  // Handlers para Crear
  const handleNewPaciente = () => {
    setPacienteFormModal({ isOpen: true, mode: "create" });
  };

  const handleNewDoctor = () => {
    setDoctorFormModal({ isOpen: true, mode: "create" });
  };

  const handleNewCita = () => {
    setCitaFormModal({ isOpen: true, mode: "create" });
  };

  // Handlers para Editar
  const handleEditPaciente = (paciente: Paciente) => {
    setPacienteFormModal({ isOpen: true, mode: "edit", data: paciente });
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setDoctorFormModal({ isOpen: true, mode: "edit", data: doctor });
  };

  const handleEditCita = (cita: Cita) => {
    setCitaFormModal({ isOpen: true, mode: "edit", data: cita });
  };

  const handleEditUsuario = (usuario: Usuario) => {
    setUsuarioFormModal({ isOpen: true, data: usuario });
  };

  // Handlers para Eliminar
  const handleDeletePaciente = (paciente: Paciente) => {
    setDeleteModal({
      isOpen: true,
      type: "paciente",
      id: paciente.id,
      name: paciente.nombre,
    });
  };

  const handleDeleteDoctor = (doctor: Doctor) => {
    setDeleteModal({
      isOpen: true,
      type: "doctor",
      id: doctor.id,
      name: doctor.nombre,
    });
  };

  const handleDeleteUsuario = (usuario: Usuario) => {
    setDeleteModal({
      isOpen: true,
      type: "usuario",
      id: usuario.id,
      name: usuario.fullName,
    });
  };

  const handleDeleteCita = (cita: Cita) => {
    setDeleteModal({
      isOpen: true,
      type: "cita",
      id: cita.id,
      name: `Cita del ${cita.fecha} a las ${cita.hora}`,
    });
  };

  // Funciones de guardado
  const handleSavePaciente = async (
    paciente: Omit<Paciente, "id"> & { id?: number }
  ) => {
    if (paciente.id) {
      await api.put(`/pacientes/${paciente.id}`, paciente);
    } else {
      await api.post("/pacientes", paciente);
    }
    reload();
  };

  const handleSaveDoctor = async (
    doctor: Omit<Doctor, "id"> & { id?: number }
  ) => {
    if (doctor.id) {
      await api.put(`/doctores/${doctor.id}`, doctor);
    } else {
      await api.post("/doctores", doctor);
    }
    reload();
  };

  const handleSaveCita = async (
    cita: Omit<Cita, "id"> & {
      id?: number;
      pacienteId: number;
      doctorId: number;
    }
  ) => {
    const payload = {
      fecha: cita.fecha,
      hora: cita.hora,
      estado: cita.estado,
      pacienteId: cita.pacienteId,
      doctorId: cita.doctorId,
    };

    if (cita.id) {
      await api.put(`/citas/${cita.id}`, payload);
    } else {
      await api.post("/citas", payload);
    }
    reload();
  };

  const handleSaveUsuario = async (usuario: {
    id: number;
    fullName: string;
    email: string;
    password?: string;
  }) => {
    await api.put(`/users/${usuario.id}`, usuario);
    reload();
  };

  // Función de eliminación
  const handleConfirmDelete = async () => {
    if (!deleteModal.id || !deleteModal.type) return;

    setDeleteLoading(true);
    try {
      const endpoints: Record<string, string> = {
        paciente: `/pacientes/${deleteModal.id}`,
        doctor: `/doctores/${deleteModal.id}`,
        usuario: `/users/${deleteModal.id}`,
        cita: `/citas/${deleteModal.id}`,
      };

      await api.delete(endpoints[deleteModal.type]);
      reload();
      setDeleteModal({ isOpen: false, type: null, id: null, name: "" });
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Error al eliminar el registro");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <DashboardNavbar
        username={auth?.username || undefined}
        roles={auth?.roles}
        onLogout={handleLogout}
      />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Card principal */}
        <div className="card">
          {/* Header con pestañas */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {getDashboardTitle(hasRole)}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {getDashboardDescription(hasRole)}
                </p>
              </div>
            </div>

            {/* Pestañas */}
            <DashboardTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Estados de carga y error */}
          {loading && <LoadingSpinner />}
          {error && <ErrorAlert message={error} />}

          {/* Contenido según la pestaña activa */}
          {!loading && !error && (
            <>
              {activeTab === "pacientes" && (
                <PacientesTab
                  data={pacientes}
                  onNew={hasRole("ADMIN") ? handleNewPaciente : undefined}
                  onView={handleViewPaciente}
                  onEdit={handleEditPaciente}
                  onDelete={handleDeletePaciente}
                />
              )}
              {activeTab === "doctores" && (
                <DoctoresTab
                  data={doctores}
                  onNew={handleNewDoctor}
                  onView={handleViewDoctor}
                  onEdit={handleEditDoctor}
                  onDelete={handleDeleteDoctor}
                />
              )}
              {activeTab === "usuarios" && (
                <UsuariosTab
                  data={usuarios}
                  onView={handleViewUsuario}
                  onEdit={handleEditUsuario}
                  onDelete={handleDeleteUsuario}
                />
              )}
              {activeTab === "citas" && (
                <CitasTab
                  data={citas}
                  onNew={handleNewCita}
                  onView={handleViewCita}
                  onEdit={handleEditCita}
                  onDelete={handleDeleteCita}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Modal de Detalles */}
      {detailsModal.isOpen && detailsModal.type && detailsModal.data && (
        <EntityDetailsModal
          type={detailsModal.type}
          data={detailsModal.data as never}
          isOpen={detailsModal.isOpen}
          onClose={() =>
            setDetailsModal({ isOpen: false, type: null, data: null })
          }
        />
      )}

      {/* Modal de Formulario de Paciente */}
      <PacienteFormModal
        isOpen={pacienteFormModal.isOpen}
        onClose={() => setPacienteFormModal({ isOpen: false, mode: "create" })}
        onSave={handleSavePaciente}
        paciente={pacienteFormModal.data}
        mode={pacienteFormModal.mode}
      />

      {/* Modal de Formulario de Doctor */}
      <DoctorFormModal
        isOpen={doctorFormModal.isOpen}
        onClose={() => setDoctorFormModal({ isOpen: false, mode: "create" })}
        onSave={handleSaveDoctor}
        doctor={doctorFormModal.data}
        mode={doctorFormModal.mode}
      />

      {/* Modal de Formulario de Cita */}
      <CitaFormModal
        isOpen={citaFormModal.isOpen}
        onClose={() => setCitaFormModal({ isOpen: false, mode: "create" })}
        onSave={handleSaveCita}
        cita={citaFormModal.data}
        mode={citaFormModal.mode}
        pacientes={pacientes}
        doctores={doctores}
        currentDoctorId={currentUser?.doctorId}
        currentPacienteId={currentUser?.pacienteId}
      />

      {/* Modal de Formulario de Usuario */}
      {usuarioFormModal.data && (
        <UsuarioFormModal
          isOpen={usuarioFormModal.isOpen}
          onClose={() => setUsuarioFormModal({ isOpen: false })}
          onSave={handleSaveUsuario}
          usuario={usuarioFormModal.data}
        />
      )}

      {/* Modal de Confirmación de Eliminación */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, type: null, id: null, name: "" })
        }
        onConfirm={handleConfirmDelete}
        title={`Eliminar ${deleteModal.type}`}
        message={`¿Está seguro que desea eliminar "${deleteModal.name}"? Esta acción no se puede deshacer.`}
        loading={deleteLoading}
      />
    </div>
  );
}
