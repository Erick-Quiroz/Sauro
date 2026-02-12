"use client";

import { useState, useEffect } from "react";
import { FormModal } from "@/components";
import { Usuario, CreateUsuarioDTO } from "../usuario.types";

interface Rol {
  id: string;
  nombre: string;
}

export interface UsuarioFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: CreateUsuarioDTO) => void;
  editingUsuario: Usuario | null;
}

export function UsuarioFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingUsuario,
}: UsuarioFormModalProps) {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        setIsLoadingRoles(true);
        const response = await fetch("/api/v1/roles?page=1&limit=1000");
        const json = await response.json();
        if (json.success) {
          setRoles(json.data.items || []);
        }
      } catch (error) {
      } finally {
        setIsLoadingRoles(false);
      }
    };

    if (isOpen) {
      loadRoles();
    }
  }, [isOpen]);

  const hasEditingData =
    editingUsuario && Object.keys(editingUsuario).length > 0;
  const fields = [
    {
      name: "nombre",
      label: "Nombre",
      type: "text" as const,
      placeholder: "Juan",
      required: true,
      defaultValue: hasEditingData ? editingUsuario?.nombre || "" : "",
    },
    {
      name: "apellido",
      label: "Apellido",
      type: "text" as const,
      placeholder: "Pérez",
      required: true,
      defaultValue: hasEditingData ? editingUsuario?.apellido || "" : "",
    },
    {
      name: "email",
      label: "Correo Electrónico",
      type: "email" as const,
      placeholder: "juan@example.com",
      required: true,
      defaultValue: hasEditingData ? editingUsuario?.email || "" : "",
    },
    {
      name: "id_rol",
      label: "Rol",
      type: "select" as const,
      placeholder: isLoadingRoles ? "Cargando roles..." : "Selecciona un rol",
      required: true,
      options: roles.map((rol) => ({ value: rol.id, label: rol.nombre })),
      defaultValue: hasEditingData
        ? editingUsuario?.id_rol?.toString() || ""
        : "",
    },
    {
      name: "password",
      label: hasEditingData ? "Nueva Contraseña (opcional)" : "Contraseña",
      type: "password" as const,
      placeholder: hasEditingData
        ? "Dejar vacío para mantener la actual"
        : "••••••••",
      required: !hasEditingData,
    },
    {
      name: "activo",
      label: "Activo",
      type: "toggle" as const,
      defaultValue: hasEditingData ? editingUsuario?.activo === true : true,
    },
  ];

  const handleSubmit = (formData: any) => {
    const submitData: any = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      id_rol: formData.id_rol,
      activo: formData.activo !== false,
    };

    if (formData.password && formData.password.trim() !== "") {
      submitData.password = formData.password;
    } else if (!hasEditingData) {
      submitData.password = "";
    }

    onSubmit(submitData);
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={editingUsuario ? "Editar Usuario" : "Crear Nuevo Usuario"}
      fields={fields}
    />
  );
}
