import type { Doctor } from "../../types/dashboard.types";
import DataTable from "./DataTable";
import EmptyState from "./EmptyState";

type DoctoresTabProps = {
  data: Doctor[];
  onNew?: () => void;
  onView?: (item: Doctor) => void;
  onEdit?: (item: Doctor) => void;
  onDelete?: (item: Doctor) => void;
};

export default function DoctoresTab({ data, onNew, onView, onEdit, onDelete }: DoctoresTabProps) {
  const columns = [
    { key: "id", label: "ID", className: "font-mono text-xs" },
    { key: "nombre", label: "Nombre", className: "font-medium text-gray-900" },
    { key: "especialidad", label: "Especialidad", className: "text-gray-600" },
    { key: "telefono", label: "Teléfono", className: "text-gray-600" },
    { key: "correo", label: "Correo", className: "text-gray-600" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Lista de Doctores</h3>
        {onNew && (
          <button onClick={onNew} className="btn-primary">
            <svg className="h-5 w-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Doctor
          </button>
        )}
      </div>

      {data.length === 0 ? (
        <EmptyState
          icon={
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          title="No hay doctores"
          description="Comienza agregando tu primer doctor"
        />
      ) : (
        <DataTable data={data} columns={columns} onView={onView} onEdit={onEdit} onDelete={onDelete} getRowKey={(item) => item.id} />
      )}
    </div>
  );
}
