import { ValidationError, CreateArticuloDTO } from "../articulo.types";

export const validateArticulo = (
  data: CreateArticuloDTO
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validar título
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

  // Validar categoría
  if (!data.categoria?.trim()) {
    errors.push({
      field: "categoria",
      message: "Debe seleccionar una categoría",
    });
  }

  // Validar autor
  if (!data.autor?.trim()) {
    errors.push({
      field: "autor",
      message: "El autor es requerido",
    });
  }

  // Validar estado
  if (!["publicado", "borrador", "archivado"].includes(data.estado)) {
    errors.push({
      field: "estado",
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
