import { NextRequest } from "next/server";
import { articuloService } from "@/modules/articulos/articulo.service";
import { successResponse, errorResponse } from "@/shared/errors";
import { PaginationParams } from "@/shared/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (id) {
      const articuloId = BigInt(id);
      const articulo =
        await articuloService.getArticuloWithRelations(articuloId);
      return successResponse(articulo);
    }

    const pagination: PaginationParams = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "10"),
      sortBy: searchParams.get("sortBy") || undefined,
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "asc",
    };

    const articulos = await articuloService.findAll(pagination);
    return successResponse(articulos);
  } catch (error) {
    console.error("Error en GET /articulos:", error);
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Convertir id_categoria a BigInt si viene como string
    if (data.id_categoria && typeof data.id_categoria === "string") {
      data.id_categoria = BigInt(data.id_categoria);
    }

    const articulo = await articuloService.createArticulo(data);
    return successResponse(articulo, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
