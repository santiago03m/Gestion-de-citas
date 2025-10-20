import type { Paciente } from "../../types/dashboard.types";
import DataTable from "./DataTable";
import EmptyState from "./EmptyState";

type PacientesTabProps = {
  data: Paciente[];
  onNew?: () => void;
  onView?: (item: Paciente) => void;
  onEdit?: (item: Paciente) => void;
  onDelete?: (item: Paciente) => void;
};

export default function PacientesTab({ data, onNew, onView, onEdit, onDelete }: PacientesTabProps) {
  const columns = [
    { key: "id", label: "ID", className: "font-mono text-xs" },
    { key: "nombre", label: "Nombre", className: "font-medium text-gray-900" },
    { key: "documento", label: "Documento", className: "text-gray-600" },
    { key: "telefono", label: "Teléfono", className: "text-gray-600" },
    { key: "correo", label: "Correo", className: "text-gray-600" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Lista de Pacientes</h3>
        {onNew && (
          <button onClick={onNew} className="btn-primary">
            <svg
              className="h-5 w-5 mr-2 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nuevo Paciente
          </button>
        )}
      </div>

      {data.length === 0 ? (
        <EmptyState
          icon={
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
          title="No hay pacientes"
          description="Comienza agregando tu primer paciente"
        />
      ) : (
        <DataTable
          data={data}
          columns={columns}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          getRowKey={(item) => item.id}
        />
      )}
    </div>
  );
}
