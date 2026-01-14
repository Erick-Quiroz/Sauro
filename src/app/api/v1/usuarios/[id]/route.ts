import { NextRequest } from "next/server";
import { usuarioService } from "@/modules/usuarios/usuario.service";
import { successResponse, errorResponse } from "@/shared/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const usuarioId = BigInt(params.id);
    const usuario = await usuarioService.getUsuarioWithRol(usuarioId);
    return successResponse(usuario);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const usuarioId = BigInt(params.id);
    const data = await request.json();
    const usuario = await usuarioService.updateUsuario(usuarioId, data);
    return successResponse(usuario);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const usuarioId = BigInt(params.id);
    await usuarioService.delete(usuarioId);
    return successResponse({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    return errorResponse(error);
  }
}
