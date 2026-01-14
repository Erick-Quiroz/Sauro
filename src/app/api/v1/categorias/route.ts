import { NextRequest } from "next/server";
import { categoriaService } from "@/modules/categorias/categoria.service";
import { successResponse, errorResponse } from "@/shared/errors";
import { PaginationParams } from "@/shared/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (id) {
      const categoriaId = BigInt(id);
      const categoria = await categoriaService.getCategoriaWithArticulos(
        categoriaId
      );
      return successResponse(categoria);
    }

    const pagination: PaginationParams = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "10"),
      sortBy: searchParams.get("sortBy") || undefined,
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "asc",
    };

    const categorias = await categoriaService.findAll(pagination);
    return successResponse(categorias);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const categoria = await categoriaService.createCategoria(data);
    return successResponse(categoria, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
