import { prisma } from "@/lib/prisma";
import { AppError } from "@/shared/errors";
import { PaginationParams, PaginatedResponse } from "@/shared/types";

// Helper para serializar BigInt a string
const bigintReplacer = (key: string, value: any) => {
  return typeof value === "bigint" ? value.toString() : value;
};

export class BaseService<T> {
  constructor(private model: any) {}

  async findAll(pagination?: PaginationParams): Promise<PaginatedResponse<T>> {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.model.findMany({
        skip,
        take: limit,
        orderBy: pagination?.sortBy
          ? { [pagination.sortBy]: pagination.sortOrder || "asc" }
          : { id: "desc" },
      }),
      this.model.count(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: bigint): Promise<T> {
    const item = await this.model.findUnique({
      where: { id },
    });

    if (!item) {
      throw new AppError("NOT_FOUND", 404, `Record not found with id: ${id}`);
    }

    return item;
  }

  async create(data: Partial<T>): Promise<T> {
    const result = await this.model.create({
      data,
    });
    return result;
  }

  async update(id: bigint, data: Partial<T>): Promise<T> {
    const item = await this.model.findUnique({
      where: { id },
    });

    if (!item) {
      throw new AppError("NOT_FOUND", 404, `Record not found with id: ${id}`);
    }

    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: bigint): Promise<boolean> {
    const item = await this.model.findUnique({
      where: { id },
    });

    if (!item) {
      throw new AppError("NOT_FOUND", 404, `Record not found with id: ${id}`);
    }

    await this.model.delete({
      where: { id },
    });

    return true;
  }
}
