import { NextRequest } from "next/server";
import { usuarioService } from "@/modules/usuarios/usuario.service";
import { successResponse, errorResponse } from "@/shared/errors";
import { PaginationParams } from "@/shared/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (id) {
      const usuarioId = BigInt(id);
      const usuario = await usuarioService.getUsuarioWithRol(usuarioId);
      return successResponse(usuario);
    }

    const pagination: PaginationParams = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "10"),
      sortBy: searchParams.get("sortBy") || undefined,
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "asc",
    };

    const usuarios = await usuarioService.findAll(pagination);
    return successResponse(usuarios);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Convertir id_rol de string a BigInt si está presente
    if (data.id_rol) {
      data.id_rol = BigInt(data.id_rol);
    }
    
    const usuario = await usuarioService.createUsuario(data);
    return successResponse(usuario, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
