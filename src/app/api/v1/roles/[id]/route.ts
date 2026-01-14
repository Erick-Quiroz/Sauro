import { NextRequest } from "next/server";
import { rolService } from "@/modules/roles/rol.service";
import { successResponse, errorResponse } from "@/shared/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const roleId = BigInt(params.id);
    const rol = await rolService.findById(roleId);
    return successResponse(rol);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const roleId = BigInt(params.id);
    const data = await request.json();
    const rol = await rolService.updateRol(roleId, data);
    return successResponse(rol);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const roleId = BigInt(params.id);
    await rolService.delete(roleId);
    return successResponse({ message: "Rol eliminado correctamente" });
  } catch (error) {
    return errorResponse(error);
  }
}
