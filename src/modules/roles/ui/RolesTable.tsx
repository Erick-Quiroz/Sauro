"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable, Pagination } from "@/components";
import { Plus, Search } from "lucide-react";
import { Rol } from "../rol.types";

export interface RolesTableProps {
  roles: Rol[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  onSearch: (term: string) => void;
  onPageChange: (page: number) => void;
  onEdit: (rol: Rol) => void;
  onDelete: (rol: Rol) => void;
  onCreateClick: () => void;
}

export function RolesTable({
  roles,
  searchTerm,
  currentPage,
  totalPages,
  onSearch,
  onPageChange,
  onEdit,
  onDelete,
  onCreateClick,
}: RolesTableProps) {
  const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "activo", label: "Activo" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Roles</h1>
          <p className="text-gray-500 mt-1">Gestiona los roles del sistema</p>
        </div>
        <Button
          onClick={onCreateClick}
          className="bg-sauro-green hover:bg-sauro-green/90 text-black font-semibold"
        >
          <Plus size={20} className="mr-2" />
          Nuevo Rol
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
          data={roles}
          onEdit={onEdit}
          onDelete={onDelete}
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
