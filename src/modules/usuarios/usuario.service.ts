import { prisma } from "@/lib/prisma";
import { BaseService } from "@/infrastructure/base.service";
import {
  UsuarioDTO,
  CreateUsuarioDTO,
  UpdateUsuarioDTO,
} from "./usuario.types";
import { AppError } from "@/shared/errors";

export class UsuarioService extends BaseService<UsuarioDTO> {
  constructor() {
    super(prisma.usuarios);
  }

  async createUsuario(data: CreateUsuarioDTO): Promise<UsuarioDTO> {
    // Validar que el email no exista
    const existingUsuario = await prisma.usuarios.findUnique({
      where: { email: data.email },
    });

    if (existingUsuario) {
      throw new AppError(
        "DUPLICATE_EMAIL",
        409,
        `El email "${data.email}" ya está registrado`
      );
    }

    // Validar que el rol exista
    const rol = await prisma.rol.findUnique({
      where: { id: data.id_rol },
    });

    if (!rol) {
      throw new AppError("INVALID_ROL", 400, `El rol no existe`);
    }

    return this.create(data);
  }

  async updateUsuario(id: bigint, data: UpdateUsuarioDTO): Promise<UsuarioDTO> {
    // Validar que el usuario exista
    const usuario = await this.findById(id);

    // Si se cambia el email, validar que no exista otro usuario con ese email
    if (data.email && data.email !== usuario.email) {
      const existingUsuario = await prisma.usuarios.findUnique({
        where: { email: data.email },
      });

      if (existingUsuario) {
        throw new AppError(
          "DUPLICATE_EMAIL",
          409,
          `El email "${data.email}" ya está registrado`
        );
      }
    }

    // Si se cambia el rol, validar que exista
    if (data.id_rol) {
      const rol = await prisma.rol.findUnique({
        where: { id: data.id_rol },
      });

      if (!rol) {
        throw new AppError("INVALID_ROL", 400, `El rol no existe`);
      }
    }

    return this.update(id, data);
  }

  async getUsuarioWithRol(id: bigint): Promise<any> {
    const usuario = await prisma.usuarios.findUnique({
      where: { id },
      include: {
        rol: {
          select: {
            id: true,
            nombre: true,
            permisos: true,
          },
        },
      },
    });

    if (!usuario) {
      throw new AppError("NOT_FOUND", 404, `Usuario no encontrado`);
    }

    // Excluir password de la respuesta
    const { password, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
  }
}

export const usuarioService = new UsuarioService();
