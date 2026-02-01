"use client";

import { useState, useCallback, useEffect } from "react";
import { Articulo, CreateArticuloDTO } from "../articulo.types";
import { validateArticulo } from "../validators/articulo.validators";

export interface UseArticulosReturn {
  articulos: Articulo[];
  filteredArticulos: Articulo[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  isModalOpen: boolean;
  editingArticulo: Articulo | null;
  isLoading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  openModal: (articulo?: Articulo) => void;
  closeModal: () => void;
  handleCreate: (formData: CreateArticuloDTO) => void;
  handleUpdate: (id: bigint | string, formData: CreateArticuloDTO) => void;
  handleDelete: (id: bigint | string) => void;
  refetch: () => Promise<void>;
}

export const useArticulos = (
  onToast: (message: string, type: "success" | "error") => void,
): UseArticulosReturn => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticulo, setEditingArticulo] = useState<Articulo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/v1/articulos?page=1&limit=1000`);
      const json = await response.json();
      if (json.success) {
        setArticulos(json.data.items || []);
      } else {
        setError(json.error?.message || "Error al cargar artículos");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar datos solo una vez al montar el componente
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/v1/articulos?page=1&limit=1000`);
        const json = await response.json();
        if (json.success) {
          setArticulos(json.data.items || []);
        } else {
          setError(json.error?.message || "Error al cargar artículos");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []); // Array vacío: ejecutar solo una vez

  const filteredArticulos = articulos.filter((a) =>
    a.titulo.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredArticulos.length / 10) || 1;

  const openModal = useCallback((articulo?: Articulo) => {
    if (articulo) {
      setEditingArticulo(articulo);
    } else {
      setEditingArticulo(null);
    }
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingArticulo(null);
  }, []);

  const handleCreate = useCallback(
    async (formData: CreateArticuloDTO) => {
      const errors = validateArticulo(formData);

      if (errors.length > 0) {
        onToast(errors[0].message, "error");
        return;
      }

      try {
        setIsLoading(true);
        // Limpiar datos: solo enviar campos necesarios
        const cleanData = {
          titulo: formData.titulo,
          contenido: formData.contenido || {},
          activo: formData.activo !== false,
        };
        const response = await fetch("/api/v1/articulos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanData),
        });

        const json = await response.json();

        if (json.success) {
          onToast(
            `Artículo "${formData.titulo}" creado correctamente`,
            "success",
          );
          await refetch();
          closeModal();
        } else {
          onToast(json.error?.message || "Error al crear artículo", "error");
        }
      } catch (err) {
        onToast(
          err instanceof Error ? err.message : "Error desconocido",
          "error",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [onToast, closeModal, refetch],
  );

  const handleUpdate = useCallback(
    async (id: bigint | string, formData: CreateArticuloDTO) => {
      const errors = validateArticulo(formData);

      if (errors.length > 0) {
        onToast(errors[0].message, "error");
        return;
      }

      try {
        setIsLoading(true);
        // Limpiar datos: solo enviar campos necesarios
        const cleanData = {
          titulo: formData.titulo,
          contenido: formData.contenido || {},
          activo: formData.activo !== false,
        };
        const response = await fetch(`/api/v1/articulos/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanData),
        });

        const json = await response.json();

        if (json.success) {
          onToast("Artículo actualizado correctamente", "success");
          await refetch();
          closeModal();
        } else {
          onToast(
            json.error?.message || "Error al actualizar artículo",
            "error",
          );
        }
      } catch (err) {
        onToast(
          err instanceof Error ? err.message : "Error desconocido",
          "error",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [onToast, closeModal, refetch],
  );

  const handleDelete = useCallback(
    async (id: bigint | string) => {
      if (!confirm("¿Deseas eliminar este artículo?")) return;

      try {
        setIsLoading(true);
        const response = await fetch(`/api/v1/articulos/${id}`, {
          method: "DELETE",
        });

        const json = await response.json();

        if (json.success) {
          onToast("Artículo eliminado correctamente", "success");
          await refetch();
        } else {
          onToast(json.error?.message || "Error al eliminar artículo", "error");
        }
      } catch (err) {
        onToast(
          err instanceof Error ? err.message : "Error desconocido",
          "error",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [onToast, refetch],
  );

  return {
    articulos: filteredArticulos,
    filteredArticulos,
    searchTerm,
    currentPage,
    totalPages,
    isModalOpen,
    editingArticulo,
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
  };
};
