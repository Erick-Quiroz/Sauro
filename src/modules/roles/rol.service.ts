import { prisma } from "@/lib/prisma";
import { BaseService } from "@/infrastructure/base.service";
import { RolDTO, CreateRolDTO, UpdateRolDTO } from "./rol.types";
import { AppError } from "@/shared/errors";

export class RolService extends BaseService<RolDTO> {
  constructor() {
    super(prisma.rol);
  }

  async createRol(data: CreateRolDTO): Promise<RolDTO> {
    // Validar que el nombre no exista
    const existingRol = await prisma.rol.findFirst({
      where: { nombre: data.nombre },
    });

    if (existingRol) {
      throw new AppError(
        "DUPLICATE_ROL",
        409,
        `El rol "${data.nombre}" ya existe`
      );
    }

    const result = await this.create(data);
    return result;
  }

  async updateRol(id: bigint, data: UpdateRolDTO): Promise<RolDTO> {
    // Si se cambia el nombre, validar que no exista otro rol con ese nombre
    if (data.nombre) {
      const existingRol = await prisma.rol.findFirst({
        where: {
          nombre: data.nombre,
          NOT: { id },
        },
      });

      if (existingRol) {
        throw new AppError(
          "DUPLICATE_ROL",
          409,
          `El rol "${data.nombre}" ya existe`
        );
      }
    }

    return this.update(id, data);
  }

  async getRolWithUsers(id: bigint): Promise<any> {
    const rol = await prisma.rol.findUnique({
      where: { id },
      include: {
        usuarios: {
          select: {
            id: true,
            email: true,
            nombre: true,
            apellido: true,
          },
        },
      },
    });

    if (!rol) {
      throw new AppError("NOT_FOUND", 404, `Rol no encontrado`);
    }

    return rol;
  }
}

export const rolService = new RolService();
