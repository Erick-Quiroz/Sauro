import { ValidationError, CreateArticuloDTO } from "../articulo.types";

export const validateArticulo = (
  data: CreateArticuloDTO,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.titulo?.trim()) {
    errors.push({
      field: "titulo",
      message: "El título es requerido",
    });
  } else if (data.titulo.trim().length < 3) {
    errors.push({
      field: "titulo",
      message: "El título debe tener al menos 3 caracteres",
    });
  } else if (data.titulo.length > 255) {
    errors.push({
      field: "titulo",
      message: "El título no puede exceder 255 caracteres",
    });
  }

  if (!data.id_categoria) {
    errors.push({
      field: "id_categoria",
      message: "Debe seleccionar una categoría",
    });
  }

  if (!data.create_by) {
    errors.push({
      field: "create_by",
      message: "El autor es requerido",
    });
  }

  if (data.activo !== undefined && typeof data.activo !== "boolean") {
    errors.push({
      field: "activo",
      message: "El estado no es válido",
    });
  }

  return errors;
};

export const generateSlug = (titulo: string): string => {
  return titulo
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
};
