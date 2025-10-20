import type { Cita } from "../../types/dashboard.types";
import DataTable from "./DataTable";
import EmptyState from "./EmptyState";

type CitasTabProps = {
  data: Cita[];
  onNew?: () => void;
  onView?: (item: Cita) => void;
  onEdit?: (item: Cita) => void;
  onDelete?: (item: Cita) => void;
};

export default function CitasTab({ data, onNew, onView, onEdit, onDelete }: CitasTabProps) {
  const columns = [
    { key: "id", label: "ID", className: "font-mono text-xs" },
    { key: "fecha", label: "Fecha", className: "text-gray-900" },
    { key: "hora", label: "Hora", className: "text-gray-600" },
    {
      key: "paciente",
      label: "Paciente",
      className: "text-gray-600",
      render: (item: Cita) => item.paciente?.nombre || "-",
    },
    {
      key: "doctor",
      label: "Doctor",
      className: "text-gray-600",
      render: (item: Cita) => item.doctor?.nombre || "-",
    },
    {
      key: "estado",
      label: "Estado",
      render: (item: Cita) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.estado === "CONFIRMADA"
              ? "bg-green-100 text-green-800"
              : item.estado === "PENDIENTE"
              ? "bg-yellow-100 text-yellow-800"
              : item.estado === "CANCELADA"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {item.estado || "N/A"}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Lista de Citas</h3>
        {onNew && (
          <button onClick={onNew} className="btn-primary">
            <svg className="h-5 w-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Cita
          </button>
        )}
      </div>

      {data.length === 0 ? (
        <EmptyState
          icon={
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          title="No hay citas"
          description="Comienza agendando tu primera cita"
        />
      ) : (
        <DataTable data={data} columns={columns} onView={onView} onEdit={onEdit} onDelete={onDelete} getRowKey={(item) => item.id} />
      )}
    </div>
  );
}
