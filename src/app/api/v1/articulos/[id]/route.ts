import { NextRequest } from "next/server";
import { articuloService } from "@/modules/articulos/articulo.service";
import { successResponse, errorResponse } from "@/shared/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articuloId = BigInt(params.id);
    const articulo = await articuloService.getArticuloWithRelations(articuloId);
    return successResponse(articulo);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articuloId = BigInt(params.id);
    const data = await request.json();
    const articulo = await articuloService.updateArticulo(articuloId, data);
    return successResponse(articulo);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articuloId = BigInt(params.id);
    await articuloService.delete(articuloId);
    return successResponse({ message: "Artículo eliminado correctamente" });
  } catch (error) {
    return errorResponse(error);
  }
}
