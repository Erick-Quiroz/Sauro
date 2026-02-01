"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2, Eye } from "lucide-react";

interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: TableColumn[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
  showActions?: boolean;
}

export function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  showActions = true,
}: DataTableProps) {
  const renderCell = (column: TableColumn, row: any) => {
    if (column.render) {
      return column.render(row[column.key], row);
    }

    // Render status badge for activo field
    if (column.key === "activo") {
      const isActive = row[column.key] === true || row[column.key] === "true";
      return (
        <Badge
          className={`min-w-28 text-center justify-center ${
            isActive
              ? "bg-sauro-green text-white font-semibold"
              : "bg-sauro-red text-white font-semibold"
          }`}
        >
          {isActive ? "Activo" : "Inactivo"}
        </Badge>
      );
    }

    // Render status badge for estado/status fields (legacy)
    if (column.key === "estado" || column.key === "status") {
      const isActive = row[column.key] === "activo" || row[column.key] === true;
      return (
        <Badge
          className={`min-w-28 text-center justify-center ${
            isActive
              ? "bg-sauro-green text-white font-semibold"
              : "bg-sauro-red text-white font-semibold"
          }`}
        >
          {isActive ? "Activo" : "Inactivo"}
        </Badge>
      );
    }

    return row[column.key];
  };

  return (
    <div className="border-light rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="table-header">
            <TableHead className="w-12 table-header-cell">#</TableHead>
            {columns.map((column) => (
              <TableHead key={column.key} className="table-header-cell">
                {column.label}
              </TableHead>
            ))}
            {showActions && (
              <TableHead className="table-header-cell text-center">
                Acciones
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (showActions ? 2 : 1)}
                className="table-cell text-center py-8"
              >
                No hay datos disponibles
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={row.id || index} className="table-row">
                <TableCell className="table-cell font-medium">
                  {index + 1}
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.key} className="table-cell">
                    {renderCell(column, row)}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      {onView && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onView(row)}
                          className="hover:bg-blue-100 hover:text-blue-700"
                        >
                          <Eye size={18} />
                        </Button>
                      )}
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(row)}
                          className="hover:bg-sauro-yellow/20 hover:text-sauro-yellow"
                        >
                          <Edit2 size={18} />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(row)}
                          className="hover:bg-sauro-red-light hover:text-sauro-red"
                        >
                          <Trash2 size={18} />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:items-center sm:justify-between">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="btn-secondary"
      >
        Anterior
      </Button>
      <span className="text-small text-center">
        Página {currentPage} de {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="btn-secondary"
      >
        Siguiente
      </Button>
    </div>
  );
}
