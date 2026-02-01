"use client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

export interface ArticleMetadataPanelProps {
  categoria?: string;
  onCategoriaChange?: (categoria: string) => void;
  activo?: boolean;
  onActivoChange?: (activo: boolean) => void;
}

interface Categoria {
  id: string;
  nombre: string;
}

export function ArticleMetadataPanel({
  categoria = "",
  onCategoriaChange,
  activo = true,
  onActivoChange,
}: ArticleMetadataPanelProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategorias = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/v1/categorias?page=1&limit=1000");
        const json = await response.json();
        if (json.success) {
          setCategorias(json.data.items || []);
        }
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategorias();
  }, []);
  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Información del Artículo
        </h3>
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categoría <span className="text-red-500">*</span>
        </label>
        <Select
          value={categoria}
          onValueChange={onCategoriaChange}
          disabled={isLoading}
        >
          <SelectTrigger className="bg-sauro-gray-light border-gray-300">
            <SelectValue
              placeholder={
                isLoading
                  ? "Cargando categorías..."
                  : "Selecciona una categoría"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {categorias.length === 0 && !isLoading ? (
              <div className="px-2 py-1.5 text-sm text-gray-500">
                No hay categorías disponibles
              </div>
            ) : (
              categorias.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.nombre}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Estado */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
          </div>
          <button
            onClick={() => onActivoChange?.(!activo)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              activo ? "bg-sauro-green" : "bg-gray-800"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                activo ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              activo ? "text-sauro-green" : "text-gray-800"
            }`}
          >
            {activo ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>

      {/* Información adicional */}
      <div className="pt-4 border-t border-gray-200 space-y-3 text-xs text-gray-500">
        <div>
          <p className="font-medium text-gray-700">Consejos</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Usa títulos descriptivos y atractivos</li>
            <li>Elige la categoría más relevante</li>
            <li>Los artículos activos serán visibles en el sitio</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
