import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, createSession } from "@/lib/auth";
import { successResponse, errorResponse } from "@/shared/errors";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return errorResponse(new Error("Email y contraseña son requeridos"), 400);
    }

    const user = await verifyCredentials(email.trim(), password);

    if (!user) {
      return errorResponse(new Error("Credenciales inválidas"), 401);
    }

    await createSession(user);

    return successResponse(
      {
        user: {
          id: user.id.toString(),
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          rol: user.rol.nombre,
        },
      },
      200,
    );
  } catch (error) {
    return errorResponse(new Error("Error al iniciar sesión"), 500);
  }
}
