export interface CategoriaDTO {
  id?: bigint;
  nombre: string;
  activo?: boolean;
  create_by?: bigint;
  update_by?: bigint;
  create_at?: Date;
  update_at?: Date;
}

export interface CreateCategoriaDTO {
  nombre: string;
  activo?: boolean;
  create_by?: bigint;
}

export interface UpdateCategoriaDTO {
  nombre?: string;
  activo?: boolean;
  update_by?: bigint;
}
