import { prisma } from "@/lib/prisma";
import { BaseService } from "@/infrastructure/base.service";
import {
  ArticuloDTO,
  CreateArticuloDTO,
  UpdateArticuloDTO,
} from "./articulo.types";
import { AppError } from "@/shared/errors";

export class ArticuloService extends BaseService<ArticuloDTO> {
  constructor() {
    super(prisma.articulos);
  }

  async createArticulo(data: CreateArticuloDTO): Promise<ArticuloDTO> {
    // Validar que la categoría exista
    const categoria = await prisma.categorias.findUnique({
      where: { id: data.id_categoria },
    });

    if (!categoria) {
      throw new AppError("INVALID_CATEGORIA", 400, `La categoría no existe`);
    }

    // Validar usuario creador si se proporciona
    if (data.create_by) {
      const usuario = await prisma.usuarios.findUnique({
        where: { id: data.create_by },
      });
      if (!usuario) {
        throw new AppError("INVALID_USER", 400, `El usuario no existe`);
      }
    }

    const result = await this.create(data);
    return result;
  }

  async updateArticulo(
    id: bigint,
    data: UpdateArticuloDTO
  ): Promise<ArticuloDTO> {
    // Validar usuario editor si se proporciona
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

  async getArticuloWithRelations(id: bigint): Promise<any> {
    const articulo = await prisma.articulos.findUnique({
      where: { id },
      include: {
        categoria: {
          select: {
            id: true,
            nombre: true,
          },
        },
        creador: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
        imagenes: {
          select: {
            id: true,
            url: true,
            orden: true,
          },
        },
      },
    });

    if (!articulo) {
      throw new AppError("NOT_FOUND", 404, `Artículo no encontrado`);
    }

    return articulo;
  }
}

export const articuloService = new ArticuloService();
