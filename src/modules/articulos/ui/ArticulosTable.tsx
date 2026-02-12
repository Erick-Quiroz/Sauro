"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable, Pagination } from "@/components";
import { Plus, Search } from "lucide-react";
import { Articulo } from "../articulo.types";

export interface ArticulosTableProps {
  articulos: Articulo[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  onSearch: (term: string) => void;
  onPageChange: (page: number) => void;
  onEdit: (articulo: Articulo) => void;
  onDelete: (articulo: Articulo) => void;
  onCreateClick: () => void;
}

export function ArticulosTable({
  articulos,
  searchTerm,
  currentPage,
  totalPages,
  onSearch,
  onPageChange,
  onEdit,
  onDelete,
  onCreateClick,
}: ArticulosTableProps) {
  const columns = [
    { key: "titulo", label: "Título" },
    { key: "activo", label: "Activo" },
  ];

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="header-title">
          <h1 className="header-title-text">Artículos</h1>
          <p className="header-title-subtitle">
            Gestiona todos los artículos publicados
          </p>
        </div>
        <Button onClick={onCreateClick} className="btn-primary h-auto">
          <Plus size={20} className="mr-2" />
          Nuevo Artículo
        </Button>
      </div>

      <div className="search-box">
        <Search className="text-gray-400 flex-shrink-0" size={20} />
        <Input
          placeholder="Buscar por título, categoría o autor..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="card-padded">
        <div className="table-container">
          <DataTable
            columns={columns}
            data={articulos}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}
