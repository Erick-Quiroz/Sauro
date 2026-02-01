"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { validateCategoria } from "../validators/categoria.validators";
import { CategoriaDTO, CreateCategoriaDTO } from "../categoria.types";

const ITEMS_PER_PAGE = 10;

export interface UseCategoriesReturn {
  categorias: CategoriaDTO[];
  filteredCategorias: CategoriaDTO[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  isModalOpen: boolean;
  editingCategoria: CategoriaDTO | null;
  isLoading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  openModal: (categoria?: CategoriaDTO) => void;
  closeModal: () => void;
  handleCreate: (formData: CreateCategoriaDTO) => void;
  handleUpdate: (id: bigint | string, formData: CreateCategoriaDTO) => void;
  handleDelete: (id: bigint | string) => void;
  refetch: () => Promise<void>;
  getValidationErrors: (data: any) => any[];
}

export const useCategorias = (
  onToast: (message: string, type: "success" | "error") => void,
): UseCategoriesReturn => {
  const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<CategoriaDTO | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Usar ref para evitar re-crear la función y causar loops infinitos
  const onToastRef = useRef(onToast);

  useEffect(() => {
    onToastRef.current = onToast;
  }, [onToast]);

  // Función para cargar datos (sin dependencias de onToast)
  const loadCategorias = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/v1/categorias?page=1&limit=1000");
      const json = await response.json();
      if (json.success) {
        setCategorias(json.data.items || []);
      } else {
        const errorMsg = json.error?.message || "Error al cargar categorías";
        setError(errorMsg);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar datos solo una vez al montar
  useEffect(() => {
    loadCategorias();
  }, [loadCategorias]);

  // Filtrar datos
  const filteredCategorias = categorias.filter((c) =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCategorias.length / ITEMS_PER_PAGE) || 1;

  // Modal functions
  const openModal = useCallback((categoria?: CategoriaDTO) => {
    setEditingCategoria(categoria || null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingCategoria(null);
  }, []);

  // Create
  const handleCreate = useCallback(
    async (formData: CreateCategoriaDTO) => {
      const errors = validateCategoria(formData);
      if (errors.length > 0) {
        onToastRef.current(
          "Por favor corrige los errores en el formulario",
          "error",
        );
        return;
      }

      try {
        setIsLoading(true);
        const cleanData = {
          nombre: formData.nombre,
          activo: formData.activo !== false,
        };

        const response = await fetch("/api/v1/categorias", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanData),
        });

        const json = await response.json();

        if (json.success) {
          onToastRef.current("Categoría creada correctamente", "success");
          await loadCategorias();
          closeModal();
        } else {
          onToastRef.current(
            json.error?.message || "Error al crear categoría",
            "error",
          );
        }
      } catch (err) {
        onToastRef.current(
          err instanceof Error ? err.message : "Error desconocido",
          "error",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [closeModal, loadCategorias],
  );

  // Update
  const handleUpdate = useCallback(
    async (id: bigint | string, formData: CreateCategoriaDTO) => {
      const errors = validateCategoria(formData);
      if (errors.length > 0) {
        onToastRef.current(
          "Por favor corrige los errores en el formulario",
          "error",
        );
        return;
      }

      try {
        setIsLoading(true);
        const cleanData = {
          nombre: formData.nombre,
          activo: formData.activo !== false,
        };

        const response = await fetch(`/api/v1/categorias/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanData),
        });

        const json = await response.json();

        if (json.success) {
          onToastRef.current("Categoría actualizada correctamente", "success");
          await loadCategorias();
          closeModal();
        } else {
          onToastRef.current(
            json.error?.message || "Error al actualizar categoría",
            "error",
          );
        }
      } catch (err) {
        onToastRef.current(
          err instanceof Error ? err.message : "Error desconocido",
          "error",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [closeModal, loadCategorias],
  );

  // Delete
  const handleDelete = useCallback(
    async (id: bigint | string) => {
      if (!confirm("¿Deseas eliminar esta categoría?")) return;

      try {
        setIsLoading(true);
        const response = await fetch(`/api/v1/categorias/${id}`, {
          method: "DELETE",
        });

        const json = await response.json();

        if (json.success) {
          onToastRef.current("Categoría eliminada correctamente", "success");
          await loadCategorias();
        } else {
          onToastRef.current(
            json.error?.message || "Error al eliminar categoría",
            "error",
          );
        }
      } catch (err) {
        onToastRef.current(
          err instanceof Error ? err.message : "Error desconocido",
          "error",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [loadCategorias],
  );

  const getValidationErrors = useCallback((data: any) => {
    return validateCategoria(data);
  }, []);

  // Refetch se queda para compatibilidad backward
  const refetch = loadCategorias;

  return {
    categorias: filteredCategorias,
    filteredCategorias,
    searchTerm,
    currentPage,
    totalPages,
    isModalOpen,
    editingCategoria,
    isLoading,
    error,
    setSearchTerm,
    setCurrentPage,
    openModal,
    closeModal,
    handleCreate,
    handleUpdate,
    handleDelete,
    refetch,
    getValidationErrors,
  };
};
