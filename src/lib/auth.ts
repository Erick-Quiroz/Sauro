import { cookies } from "next/headers";
import { prisma } from "./prisma";

export interface AuthUser {
  id: bigint;
  nombre: string;
  apellido: string;
  email: string;
  rol: {
    id: bigint;
    nombre: string;
    permisos: any;
  };
}

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<AuthUser | null> {
  try {
    const user = await prisma.usuarios.findUnique({
      where: { email, activo: true },
      include: {
        rol: true,
      },
    });

    if (!user) {
      return null;
    }

    const isValidPassword = password === user.password;

    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      rol: {
        id: user.rol.id,
        nombre: user.rol.nombre,
        permisos: user.rol.permisos,
      },
    };
  } catch (error) {
    return null;
  }
}

export async function createSession(user: AuthUser) {
  try {
    const cookieStore = await cookies();

    const token = Buffer.from(
      JSON.stringify({
        id: user.id.toString(),
        email: user.email,
        rol: user.rol.nombre,
        timestamp: Date.now(),
      }),
    ).toString("base64");

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookieStore.set(
      "user_data",
      JSON.stringify({
        id: user.id.toString(),
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol.nombre,
      }),
      {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      },
    );

    return token;
  } catch (error) {
    throw error;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("user_data");
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));

    const tokenAge = Date.now() - decoded.timestamp;
    const maxAge = 60 * 60 * 24 * 7 * 1000;

    if (tokenAge > maxAge) {
      await destroySession();
      return null;
    }

    const user = await prisma.usuarios.findUnique({
      where: {
        id: BigInt(decoded.id),
        activo: true,
      },
      include: {
        rol: true,
      },
    });

    if (!user) {
      await destroySession();
      return null;
    }

    return {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      rol: {
        id: user.rol.id,
        nombre: user.rol.nombre,
        permisos: user.rol.permisos,
      },
    };
  } catch (error) {
    return null;
  }
}

export function hasPermission(user: AuthUser, permission: string): boolean {
  if (!user.rol.permisos) return false;

  const permisos = user.rol.permisos as Record<string, boolean | string[]>;
  return (
    permisos[permission] === true ||
    (Array.isArray(permisos[permission]) && permisos[permission].length > 0)
  );
}
