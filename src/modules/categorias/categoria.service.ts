import { prisma } from "@/lib/prisma";
import { BaseService } from "@/infrastructure/base.service";
import {
  CategoriaDTO,
  CreateCategoriaDTO,
  UpdateCategoriaDTO,
} from "./categoria.types";
import { AppError } from "@/shared/errors";

export class CategoriaService extends BaseService<CategoriaDTO> {
  constructor() {
    super(prisma.categorias);
  }

  async createCategoria(data: CreateCategoriaDTO): Promise<CategoriaDTO> {
    if (data.create_by) {
      const usuario = await prisma.usuarios.findUnique({
        where: { id: data.create_by },
      });
      if (!usuario) {
        throw new AppError("INVALID_USER", 400, `El usuario no existe`);
      }
    }

    return this.create(data);
  }

  async updateCategoria(
    id: bigint,
    data: UpdateCategoriaDTO,
  ): Promise<CategoriaDTO> {
    if (data.update_by) {
      const usuario = await prisma.usuarios.findUnique({
        where: { id: data.update_by },
      });
      if (!usuario) {
        throw new AppError("INVALID_USER", 400, `El usuario no existe`);
      }
    }

    return this.update(id, data);
  }

  async getCategoriaWithArticulos(id: bigint): Promise<any> {
    const categoria = await prisma.categorias.findUnique({
      where: { id },
      include: {
        articulos: {
          select: {
            id: true,
            titulo: true,
            create_at: true,
          },
        },
        creador: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
      },
    });

    if (!categoria) {
      throw new AppError("NOT_FOUND", 404, `Categoría no encontrada`);
    }

    return categoria;
  }

  async getAllCategoriasWithArticulos(): Promise<any[]> {
    const categorias = await prisma.categorias.findMany({
      where: { activo: true },
      include: {
        articulos: {
          where: { activo: true },
          select: {
            id: true,
            titulo: true,
            contenido: true,
          },
          orderBy: {
            create_at: "desc",
          },
        },
      },
      orderBy: {
        nombre: "asc",
      },
    });

    return categorias;
  }
}

export const categoriaService = new CategoriaService();
