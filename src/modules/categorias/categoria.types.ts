export interface CategoriaDTO {
  id?: bigint;
  id_seccion: bigint;
  nombre: string;
  create_by?: bigint;
  update_by?: bigint;
  create_at?: Date;
  update_at?: Date;
}

export interface CreateCategoriaDTO {
  id_seccion: bigint;
  nombre: string;
  create_by?: bigint;
}

export interface UpdateCategoriaDTO {
  nombre?: string;
  update_by?: bigint;
}
