import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { successResponse, errorResponse } from "@/shared/errors";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return errorResponse(new Error("No autenticado"), 401);
    }

    return successResponse(
      {
        user: {
          id: user.id.toString(),
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          rol: user.rol.nombre,
          permisos: user.rol.permisos,
        },
      },
      200,
    );
  } catch (error) {
    return errorResponse(
      new Error("Error al obtener información del usuario"),
      500,
    );
  }
}
