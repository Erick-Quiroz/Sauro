import { NextRequest } from "next/server";
import { categoriaService } from "@/modules/categorias/categoria.service";
import { successResponse, errorResponse } from "@/shared/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoriaId = BigInt(params.id);
    const categoria = await categoriaService.getCategoriaWithArticulos(
      categoriaId
    );
    return successResponse(categoria);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoriaId = BigInt(params.id);
    const data = await request.json();
    const categoria = await categoriaService.updateCategoria(categoriaId, data);
    return successResponse(categoria);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoriaId = BigInt(params.id);
    await categoriaService.delete(categoriaId);
    return successResponse({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    return errorResponse(error);
  }
}
