"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable, Pagination } from "@/components";
import { Search, Plus } from "lucide-react";

interface CategoriaTableProps {
  filteredCategorias: any[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  onSearch: (term: string) => void;
  onPageChange: (page: number) => void;
  onEdit: (categoriaId: string | bigint) => void;
  onDelete: (categoriaId: string | bigint) => void;
  onCreateClick: () => void;
}

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "activo", label: "Activo" },
];

export function CategoriasTable({
  filteredCategorias,
  searchTerm,
  currentPage,
  totalPages,
  onSearch,
  onPageChange,
  onEdit,
  onDelete,
  onCreateClick,
}: CategoriaTableProps) {
  const itemsPerPage = 10;
  const paginatedCategorias = filteredCategorias.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Categorías</h1>
          <p className="text-gray-500 mt-1">
            Gestiona las categorías de artículos
          </p>
        </div>
        <Button
          onClick={onCreateClick}
          className="bg-sauro-green hover:bg-sauro-green/90 text-black font-semibold"
        >
          <Plus size={20} className="mr-2" />
          Nueva Categoría
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Search className="text-gray-400" size={20} />
          <Input
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </Card>

      {/* Table */}
      <Card className="p-6">
        <DataTable
          columns={columns}
          data={paginatedCategorias}
          onEdit={(row) => onEdit(row.id)}
          onDelete={(row) => onDelete(row.id)}
        />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </Card>
    </div>
  );
}
