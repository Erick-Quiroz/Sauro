import { ValidationError, CreateUsuarioDTO } from "../usuario.types";

export const validateUsuario = (data: CreateUsuarioDTO): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validar nombre
  if (!data.nombre?.trim()) {
    errors.push({
      field: "nombre",
      message: "El nombre es requerido",
    });
  } else if (data.nombre.trim().length < 2) {
    errors.push({
      field: "nombre",
      message: "El nombre debe tener al menos 2 caracteres",
    });
  }

  // Validar apellido
  if (!data.apellido?.trim()) {
    errors.push({
      field: "apellido",
      message: "El apellido es requerido",
    });
  } else if (data.apellido.trim().length < 2) {
    errors.push({
      field: "apellido",
      message: "El apellido debe tener al menos 2 caracteres",
    });
  }

  // Validar correo
  if (!data.email?.trim()) {
    errors.push({
      field: "email",
      message: "El correo es requerido",
    });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({
      field: "email",
      message: "El correo no es válido",
    });
  }

  // Validar contraseña (solo si es nuevo usuario)
  if (!data.id && !data.password?.trim()) {
    errors.push({
      field: "password",
      message: "La contraseña es requerida",
    });
  } else if (data.password && data.password.length < 6) {
    errors.push({
      field: "password",
      message: "La contraseña debe tener al menos 6 caracteres",
    });
  }

  return errors;
};

export const generateInitials = (nombre: string, apellido: string): string => {
  return (nombre.charAt(0) + apellido.charAt(0)).toUpperCase();
};
