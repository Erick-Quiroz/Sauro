"use client";

import { useMemo } from "react";
import { FormModal } from "@/components";

interface CategoriaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  editingCategoria?: any;
}

const formFields = [
  {
    name: "nombre",
    label: "Nombre de la Categoría",
    type: "text" as const,
    placeholder: "Tecnología",
    required: true,
  },
  {
    name: "activo",
    label: "Activo",
    type: "toggle" as const,
    defaultValue: true,
  },
];

export function CategoriaFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingCategoria,
}: CategoriaFormModalProps) {
  const isEditing = useMemo(
    () => editingCategoria && editingCategoria.id,
    [editingCategoria],
  );

  const fields = useMemo(() => {
    if (isEditing && editingCategoria) {
      return formFields.map((f) => ({
        ...f,
        defaultValue:
          f.name === "nombre"
            ? editingCategoria.nombre || ""
            : f.name === "activo"
              ? editingCategoria.activo === true
              : f.defaultValue,
      }));
    }
    return formFields;
  }, [isEditing, editingCategoria]);

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title={
        isEditing
          ? `Editar: ${editingCategoria?.nombre || ""}`
          : "Nueva Categoría"
      }
      fields={fields}
    />
  );
}
