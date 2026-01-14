import { NextResponse } from "next/server";
import { ApiResponse, ApiError } from "./types";

// Helper para convertir BigInt a string de forma recursiva
const convertBigIntToString = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "bigint") {
    return obj.toString();
  }

  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      return obj.map(convertBigIntToString);
    }

    const converted: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        converted[key] = convertBigIntToString(obj[key]);
      }
    }
    return converted;
  }

  return obj;
};

export class AppError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const errorResponse = (
  error: unknown,
  statusCode: number = 500
): NextResponse<ApiResponse<null>> => {
  let apiError: ApiError;

  if (error instanceof AppError) {
    apiError = {
      code: error.code,
      message: error.message,
      details: error.details,
    };
    statusCode = error.statusCode;
  } else if (error instanceof Error) {
    apiError = {
      code: "INTERNAL_ERROR",
      message: error.message,
    };
  } else {
    apiError = {
      code: "UNKNOWN_ERROR",
      message: "An unknown error occurred",
    };
  }

  return NextResponse.json(
    {
      success: false,
      error: apiError,
      timestamp: new Date().toISOString(),
    },
    { status: statusCode }
  );
};

export const successResponse = <T>(
  data: T,
  statusCode: number = 200
): NextResponse<ApiResponse<T>> => {
  const convertedData = convertBigIntToString(data);

  return NextResponse.json(
    {
      success: true,
      data: convertedData,
      timestamp: new Date().toISOString(),
    },
    { status: statusCode }
  );
};
