import { ValidationError, CreateRolDTO } from "../rol.types";

export const validateRol = (data: CreateRolDTO): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validar nombre
  if (!data.nombre?.trim()) {
    errors.push({
      field: "nombre",
      message: "El nombre del rol es requerido",
    });
  } else if (data.nombre.trim().length < 2) {
    errors.push({
      field: "nombre",
      message: "El nombre debe tener al menos 2 caracteres",
    });
  }

  return errors;
};

export const generateRolSlug = (nombre: string): string => {
  return nombre
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};
