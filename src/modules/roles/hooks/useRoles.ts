"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Rol, CreateRolDTO } from "../rol.types";
import { validateRol } from "../validators/rol.validators";

const ITEMS_PER_PAGE = 10;

export interface UseRolesReturn {
  roles: Rol[];
  filteredRoles: Rol[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  isModalOpen: boolean;
  editingRol: Rol | null;
  isLoading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  openModal: (rol?: Rol) => void;
  closeModal: () => void;
  handleCreate: (formData: CreateRolDTO) => void;
  handleUpdate: (id: bigint | string, formData: CreateRolDTO) => void;
  handleDelete: (id: bigint | string) => void;
  refetch: () => Promise<void>;
}

export const useRoles = (
  onToast: (message: string, type: "success" | "error") => void,
): UseRolesReturn => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRol, setEditingRol] = useState<Rol | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onToastRef = useRef(onToast);

  useEffect(() => {
    onToastRef.current = onToast;
  }, [onToast]);

  const loadRoles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/v1/roles?page=1&limit=1000`);
      const json = await response.json();
      if (json.success) {
        setRoles(json.data.items || []);
      } else {
        setError(json.error?.message || "Error al cargar roles");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  const filteredRoles = roles.filter((r) =>
    r.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredRoles.length / 10) || 1;

  const openModal = useCallback((rol?: Rol) => {
    if (rol) {
      setEditingRol(rol);
    } else {
      setEditingRol(null);
    }
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingRol(null);
  }, []);

  const handleCreate = useCallback(
    async (formData: CreateRolDTO) => {
      const errors = validateRol(formData);

      if (errors.length > 0) {
        onToastRef.current(errors[0].message, "error");
        return;
      }

      try {
        setIsLoading(true);
        const cleanData = {
          nombre: formData.nombre,
          permisos: formData.permisos || {},
          activo: formData.activo !== false,
        };
        const response = await fetch("/api/v1/roles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanData),
        });

        const json = await response.json();

        if (json.success) {
          onToastRef.current(
            `✓ Rol "${formData.nombre}" creado correctamente`,
            "success",
          );
          await loadRoles();
          closeModal();
        } else {
          onToastRef.current(
            json.error?.message || "Error al crear rol",
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
    [closeModal, loadRoles],
  );

  const handleUpdate = useCallback(
    async (id: bigint | string, formData: CreateRolDTO) => {
      const errors = validateRol(formData);

      if (errors.length > 0) {
        onToastRef.current(errors[0].message, "error");
        return;
      }

      try {
        setIsLoading(true);
        const cleanData = {
          nombre: formData.nombre,
          permisos: formData.permisos || {},
          activo: formData.activo !== false,
        };
        const response = await fetch(`/api/v1/roles/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanData),
        });

        const json = await response.json();

        if (json.success) {
          onToastRef.current(
            `✓ Rol "${formData.nombre}" actualizado correctamente`,
            "success",
          );
          await loadRoles();
          closeModal();
        } else {
          onToastRef.current(
            json.error?.message || "Error al actualizar rol",
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
    [closeModal, loadRoles],
  );

  const handleDelete = useCallback(
    async (id: bigint | string) => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/v1/roles/${id}`, {
          method: "DELETE",
        });

        const json = await response.json();

        if (json.success) {
          onToastRef.current("✓ Rol eliminado correctamente", "success");
          await loadRoles();
        } else {
          onToastRef.current(
            json.error?.message || "Error al eliminar rol",
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
    [loadRoles],
  );

  const refetch = loadRoles;

  return {
    roles: filteredRoles,
    filteredRoles,
    searchTerm,
    currentPage,
    totalPages,
    isModalOpen,
    editingRol,
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
