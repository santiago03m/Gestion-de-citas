import type { Paciente, Doctor, Usuario, Cita } from "../../types/dashboard.types";
import ActionButtons from "./ActionButtons";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  getRowKey: (item: T) => string | number;
};

export default function DataTable<T extends Paciente | Doctor | Usuario | Cita>({
  data,
  columns,
  onView,
  onEdit,
  onDelete,
  getRowKey,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className={col.className}>
                {col.label}
              </th>
            ))}
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={getRowKey(item)}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={col.className}>
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, string | number>)[col.key as string] || "-")}
                </td>
              ))}
              <td>
                <ActionButtons
                  onView={onView ? () => onView(item) : undefined}
                  onEdit={onEdit ? () => onEdit(item) : undefined}
                  onDelete={onDelete ? () => onDelete(item) : undefined}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
