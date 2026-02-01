export interface Rol {
  id?: bigint;
  nombre: string;
  permisos?: RolPermisos;
  activo?: boolean;
  create_at?: Date;
  update_at?: Date;
}

export interface CreateRolDTO {
  nombre: string;
  permisos?: RolPermisos;
  activo?: boolean;
}

export interface UpdateRolDTO {
  nombre?: string;
  permisos?: RolPermisos;
  activo?: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface RolPermisos {
  categorias?: {
    crear?: boolean;
    leer?: boolean;
    editar?: boolean;
    eliminar?: boolean;
  };
  articulos?: {
    crear?: boolean;
    leer?: boolean;
    editar?: boolean;
    eliminar?: boolean;
  };
  roles?: {
    crear?: boolean;
    leer?: boolean;
    editar?: boolean;
    eliminar?: boolean;
  };
  usuarios?: {
    crear?: boolean;
    leer?: boolean;
    editar?: boolean;
    eliminar?: boolean;
  };
}
