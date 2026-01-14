// Tipos de dominio para Rol
export interface RolDTO {
  id?: bigint;
  nombre: string;
  permisos?: Record<string, any>;
  create_at?: Date;
  update_at?: Date;
}

export interface CreateRolDTO {
  nombre: string;
  permisos?: Record<string, any>;
}

export interface UpdateRolDTO {
  nombre?: string;
  permisos?: Record<string, any>;
}
