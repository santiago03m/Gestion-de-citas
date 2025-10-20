import type { Paciente, Doctor, Usuario, Cita } from "../../types/dashboard.types";
import Modal from "./Modal";

type EntityDetailsModalProps =
  | { type: "paciente"; data: Paciente; isOpen: boolean; onClose: () => void }
  | { type: "doctor"; data: Doctor; isOpen: boolean; onClose: () => void }
  | { type: "usuario"; data: Usuario; isOpen: boolean; onClose: () => void }
  | { type: "cita"; data: Cita; isOpen: boolean; onClose: () => void };

export default function EntityDetailsModal(props: EntityDetailsModalProps) {
  const { isOpen, onClose } = props;

  const renderContent = () => {
    switch (props.type) {
      case "paciente":
        return (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{props.data.nombre}</h3>
                  <p className="text-sm text-gray-600">Información del paciente</p>
                </div>
              </div>
            </div>
            <DetailRow icon="📄" label="Documento de identidad" value={props.data.documento || "No registrado"} />
            <DetailRow icon="📞" label="Teléfono de contacto" value={props.data.telefono || "No registrado"} />
            <DetailRow icon="✉️" label="Correo electrónico" value={props.data.correo || "No registrado"} />
          </div>
        );

      case "doctor":
        return (
          <div className="space-y-3">
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Dr. {props.data.nombre}</h3>
                  <p className="text-sm text-gray-600">Información del médico</p>
                </div>
              </div>
            </div>
            <DetailRow icon="🩺" label="Especialidad médica" value={props.data.especialidad || "No especificada"} />
            <DetailRow icon="📞" label="Teléfono de contacto" value={props.data.telefono || "No registrado"} />
            <DetailRow icon="✉️" label="Correo electrónico" value={props.data.correo || "No registrado"} />
          </div>
        );

      case "usuario":
        return (
          <div className="space-y-3">
            <div className="bg-purple-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{props.data.fullName}</h3>
                  <p className="text-sm text-gray-600">Información de usuario del sistema</p>
                </div>
              </div>
            </div>
            <DetailRow icon="✉️" label="Correo electrónico" value={props.data.email} />
            <DetailRow
              icon="👤"
              label="Permisos y accesos"
              value={
                <div className="flex flex-wrap gap-1">
                  {props.data.roles && props.data.roles.length > 0 ? (
                    props.data.roles.map((r) => (
                      <span key={r.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {r.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">Sin roles asignados</span>
                  )}
                </div>
              }
            />
          </div>
        );

      case "cita":
        return (
          <div className="space-y-3">
            <div className="bg-indigo-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Cita Médica</h3>
                  <p className="text-sm text-gray-600">Información de la cita programada</p>
                </div>
              </div>
            </div>
            <DetailRow icon="📅" label="Fecha programada" value={new Date(props.data.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} />
            <DetailRow icon="🕐" label="Hora de atención" value={props.data.hora} />
            <DetailRow icon="👤" label="Paciente" value={props.data.paciente?.nombre || "No asignado"} />
            <DetailRow icon="🩺" label="Doctor asignado" value={props.data.doctor?.nombre || "No asignado"} />
            <DetailRow
              icon="📊"
              label="Estado de la cita"
              value={
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    props.data.estado === "CONFIRMADA"
                      ? "bg-green-100 text-green-800"
                      : props.data.estado === "PENDIENTE"
                      ? "bg-yellow-100 text-yellow-800"
                      : props.data.estado === "CANCELADA"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {props.data.estado === "CONFIRMADA" && "✓ Confirmada"}
                  {props.data.estado === "PENDIENTE" && "⏳ Pendiente"}
                  {props.data.estado === "CANCELADA" && "✗ Cancelada"}
                  {!props.data.estado && "Sin estado"}
                </span>
              }
            />
          </div>
        );
    }
  };

  const getTitle = () => {
    switch (props.type) {
      case "paciente":
        return `Detalles del Paciente: ${props.data.nombre}`;
      case "doctor":
        return `Detalles del Doctor: ${props.data.nombre}`;
      case "usuario":
        return `Detalles del Usuario: ${props.data.fullName}`;
      case "cita":
        return "Detalles de la Cita";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()} size="md">
      {renderContent()}
    </Modal>
  );
}

function DetailRow({ icon, label, value }: { icon?: string; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors">
      {icon && <span className="text-2xl flex-shrink-0">{icon}</span>}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
        <div className="text-base text-gray-900 break-words">{value}</div>
      </div>
    </div>
  );
}
