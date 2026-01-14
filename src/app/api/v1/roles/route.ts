import { NextRequest } from "next/server";
import { rolService } from "@/modules/roles/rol.service";
import { successResponse, errorResponse } from "@/shared/errors";
import { PaginationParams } from "@/shared/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (id) {
      // Obtener rol específico con usuarios
      const roleId = BigInt(id);
      const rol = await rolService.getRolWithUsers(roleId);
      return successResponse(rol);
    }

    // Obtener todos los roles con paginación
    const pagination: PaginationParams = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "10"),
      sortBy: searchParams.get("sortBy") || undefined,
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "asc",
    };

    const roles = await rolService.findAll(pagination);
    return successResponse(roles);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const rol = await rolService.createRol(data);
    return successResponse(rol, 201);
  } catch (error) {
    console.error("Error en POST /roles:", error);
    return errorResponse(error);
  }
}
