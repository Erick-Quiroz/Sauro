"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Usuario, CreateUsuarioDTO } from "../usuario.types";
import { validateUsuario } from "../validators/usuario.validators";

const ITEMS_PER_PAGE = 10;

export interface UseUsuariosReturn {
  usuarios: Usuario[];
  filteredUsuarios: Usuario[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  isModalOpen: boolean;
  editingUsuario: Usuario | null;
  isLoading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  openModal: (usuario?: Usuario) => void;
  closeModal: () => void;
  handleCreate: (formData: CreateUsuarioDTO) => void;
  handleUpdate: (id: bigint | string, formData: CreateUsuarioDTO) => void;
  handleDelete: (id: bigint | string) => void;
  refetch: () => Promise<void>;
}

export const useUsuarios = (
  onToast: (message: string, type: "success" | "error") => void,
): UseUsuariosReturn => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onToastRef = useRef(onToast);

  useEffect(() => {
    onToastRef.current = onToast;
  }, [onToast]);

  const itemsPerPage = 10;

  // Función para cargar datos
  const loadUsuarios = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/v1/usuarios?page=1&limit=1000`);
      const json = await response.json();
      if (json.success) {
        setUsuarios(json.data.items || []);
      } else {
        setError(json.error?.message || "Error al cargar usuarios");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar datos solo una vez al montar
  useEffect(() => {
    loadUsuarios();
  }, [loadUsuarios]);

  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage) || 1;

  const openModal = useCallback((usuario?: Usuario) => {
    if (usuario) {
      setEditingUsuario(usuario);
    } else {
      setEditingUsuario(null);
    }
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingUsuario(null);
  }, []);

  const handleCreate = useCallback(
    async (formData: CreateUsuarioDTO) => {
      const errors = validateUsuario(formData);

      if (errors.length > 0) {
        onToastRef.current(errors[0].message, "error");
        return;
      }

      try {
        setIsLoading(true);
        const cleanData = {
          id_rol: formData.id_rol ? BigInt(formData.id_rol) : undefined,
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          password: formData.password || "",
          activo: formData.activo !== false,
        };
        const response = await fetch("/api/v1/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanData, (_, v) =>
            typeof v === "bigint" ? v.toString() : v,
          ),
        });

        const json = await response.json();

        if (json.success) {
          onToastRef.current(
            `Usuario "${formData.nombre} ${formData.apellido}" creado correctamente`,
            "success",
          );
          await loadUsuarios();
          closeModal();
        } else {
          onToastRef.current(
            json.error?.message || "Error al crear usuario",
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
    [closeModal, loadUsuarios],
  );

  const handleUpdate = useCallback(
    async (id: bigint | string, formData: CreateUsuarioDTO) => {
      const errors = validateUsuario(formData);

      if (errors.length > 0) {
        onToastRef.current(errors[0].message, "error");
        return;
      }

      try {
        setIsLoading(true);
        const cleanData = {
          id_rol: formData.id_rol ? BigInt(formData.id_rol) : undefined,
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          password: formData.password || "",
          activo: formData.activo !== false,
        };
        const response = await fetch(`/api/v1/usuarios/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanData, (_, v) =>
            typeof v === "bigint" ? v.toString() : v,
          ),
        });

        const json = await response.json();

        if (json.success) {
          onToastRef.current("Usuario actualizado correctamente", "success");
          await loadUsuarios();
          closeModal();
        } else {
          onToastRef.current(
            json.error?.message || "Error al actualizar usuario",
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
    [closeModal, loadUsuarios],
  );

  const handleDelete = useCallback(
    async (id: bigint | string) => {
      if (!confirm("¿Deseas eliminar este usuario?")) return;

      try {
        setIsLoading(true);
        const response = await fetch(`/api/v1/usuarios/${id}`, {
          method: "DELETE",
        });

        const json = await response.json();

        if (json.success) {
          onToastRef.current("Usuario eliminado correctamente", "success");
          await loadUsuarios();
        } else {
          onToastRef.current(
            json.error?.message || "Error al eliminar usuario",
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
    [loadUsuarios],
  );

  const refetch = loadUsuarios;

  return {
    usuarios: filteredUsuarios,
    filteredUsuarios,
    searchTerm,
    currentPage,
    totalPages,
    isModalOpen,
    editingUsuario,
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
