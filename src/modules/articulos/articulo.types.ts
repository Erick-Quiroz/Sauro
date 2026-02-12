export interface Articulo {
  id?: bigint;
  id_categoria?: bigint;
  titulo: string;
  contenido?: Record<string, any>;
  activo?: boolean;
  create_at?: Date;
  update_at?: Date;
  create_by?: bigint;
  update_by?: bigint;
}

export interface CreateArticuloDTO {
  id_categoria?: bigint;
  titulo: string;
  contenido?: Record<string, any>;
  activo?: boolean;
  create_by?: bigint;
}

export interface UpdateArticuloDTO {
  id_categoria?: bigint;
  titulo?: string;
  contenido?: Record<string, any>;
  activo?: boolean;
  update_by?: bigint;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface BlockNoteBlock {
  id: string;
  type:
    | "paragraph"
    | "heading"
    | "bulletListItem"
    | "numberedListItem"
    | "codeBlock"
    | "image"
    | "table";
  props: Record<string, any>;
  content?: BlockNoteContent[];
  children?: BlockNoteBlock[];
}

export interface BlockNoteContent {
  type: "text" | "link" | "image" | "bold" | "italic" | "underline" | "code";
  text?: string;
  href?: string;
  src?: string;
  styles?: string[];
}

export interface ArticuloContenido {
  title?: string;
  description?: string;
  blocks?: BlockNoteBlock[];
  tags?: string[];
}

export interface ArticuloDTO {
  id?: bigint;
  id_categoria: bigint;
  titulo: string;
  contenido?: ArticuloContenido | Record<string, any>;
  create_by?: bigint;
  update_by?: bigint;
  create_at?: Date;
  update_at?: Date;
}

export interface CreateArticuloDTO_DB {
  id_categoria: bigint;
  titulo: string;
  contenido?: ArticuloContenido | Record<string, any>;
  create_by?: bigint;
}

export interface UpdateArticuloDTO_DB {
  titulo?: string;
  contenido?: ArticuloContenido | Record<string, any>;
  update_by?: bigint;
}
