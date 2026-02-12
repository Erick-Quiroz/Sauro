"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable, Pagination } from "@/components";
import { Plus, Search } from "lucide-react";
import { Usuario } from "../usuario.types";

export interface UsuariosTableProps {
  usuarios: Usuario[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  onSearch: (term: string) => void;
  onPageChange: (page: number) => void;
  onEdit: (usuario: Usuario) => void;
  onDelete: (usuario: Usuario) => void;
  onCreateClick: () => void;
}

export function UsuariosTable({
  usuarios,
  searchTerm,
  currentPage,
  totalPages,
  onSearch,
  onPageChange,
  onEdit,
  onDelete,
  onCreateClick,
}: UsuariosTableProps) {
  const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "email", label: "Correo" },
    { key: "activo", label: "Activo" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-gray-500 mt-1">
            Gestiona los usuarios del sistema
          </p>
        </div>
        <Button
          onClick={onCreateClick}
          className="bg-sauro-green hover:bg-sauro-green/90 text-black font-semibold"
        >
          <Plus size={20} className="mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Search className="text-gray-400" size={20} />
          <Input
            placeholder="Buscar por nombre, apellido o correo..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </Card>

      <Card className="p-6">
        <DataTable
          columns={columns}
          data={usuarios}
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
