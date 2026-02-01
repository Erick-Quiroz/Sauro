export interface ValidationError {
  field: string;
  message: string;
}

export const validateCategoria = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.nombre?.trim()) {
    errors.push({ field: "nombre", message: "El nombre es requerido" });
  } else if (data.nombre.length < 3) {
    errors.push({
      field: "nombre",
      message: "El nombre debe tener al menos 3 caracteres",
    });
  }

  return errors;
};

export const generateSlug = (nombre: string): string => {
  return nombre
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};
