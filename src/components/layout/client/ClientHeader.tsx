"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ClientHeaderProps {
  user?: {
    nombre: string;
    apellido: string;
    email: string;
  } | null;
}

export function ClientHeader({ user }: ClientHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="bg-neutral-800 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="text-right mr-4">
                  <p className="text-sm font-semibold">
                    {user.nombre} {user.apellido}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                <Link
                  href="/admin"
                  className="bg-sauro-green hover:bg-sauro-green/90 text-black font-medium px-4 py-2 rounded-md transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
