import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
import { successResponse, errorResponse } from "@/shared/errors";

export async function POST() {
  try {
    await destroySession();

    return successResponse({ message: "Sesión cerrada correctamente" }, 200);
  } catch (error) {
    return errorResponse(new Error("Error al cerrar sesión"), 500);
  }
}
