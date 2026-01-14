export interface UsuarioDTO {
  id?: bigint;
  id_rol: bigint;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  create_at?: Date;
  update_at?: Date;
}

export interface CreateUsuarioDTO {
  id_rol: bigint;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

export interface UpdateUsuarioDTO {
  id_rol?: bigint;
  nombre?: string;
  apellido?: string;
  email?: string;
  password?: string;
}

export interface UsuarioResponseDTO {
  id: bigint;
  nombre: string;
  apellido: string;
  email: string;
  create_at: Date;
  rol: {
    id: bigint;
    nombre: string;
  };
}
