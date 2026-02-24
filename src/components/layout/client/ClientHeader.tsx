"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";

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

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-semibold leading-tight">
                    {user.nombre} {user.apellido}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-tight">
                    {user.email}
                  </p>
                </div>
                <div className="w-px h-6 bg-white/20 hidden sm:block" />
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-sauro-green/10 hover:bg-sauro-green/20 text-sauro-green border border-sauro-green/30 transition-colors"
                >
                  <LayoutDashboard size={13} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 hover:bg-red-500/10 text-gray-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-colors"
                >
                  <LogOut size={13} />
                  Salir
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
