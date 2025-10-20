import type { Usuario } from "../../types/dashboard.types";
import DataTable from "./DataTable";
import EmptyState from "./EmptyState";

type UsuariosTabProps = {
  data: Usuario[];
  onNew?: () => void;
  onView?: (item: Usuario) => void;
  onEdit?: (item: Usuario) => void;
  onDelete?: (item: Usuario) => void;
};

export default function UsuariosTab({ data, onNew, onView, onEdit, onDelete }: UsuariosTabProps) {
  const columns = [
    { key: "id", label: "ID", className: "font-mono text-xs" },
    { key: "fullName", label: "Nombre", className: "font-medium text-gray-900" },
    { key: "email", label: "Email", className: "text-gray-600" },
    {
      key: "roles",
      label: "Roles",
      className: "text-gray-600",
      render: (item: Usuario) =>
        item.roles && item.roles.length > 0 ? item.roles.map((r) => r.name).join(", ") : "-",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Lista de Usuarios</h3>
        {onNew && (
          <button onClick={onNew} className="btn-primary">
            <svg className="h-5 w-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Usuario
          </button>
        )}
      </div>

      {data.length === 0 ? (
        <EmptyState
          icon={
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          title="No hay usuarios"
          description="Comienza agregando tu primer usuario"
        />
      ) : (
        <DataTable data={data} columns={columns} onView={onView} onEdit={onEdit} onDelete={onDelete} getRowKey={(item) => item.id} />
      )}
    </div>
  );
}
