"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { User } from "lucide-react";

export function SidebarHeader() {
  const { user, loading } = useAuth();

  return (
    <div className="p-6 border-b border-white/10">
      <Link href="/admin" className="flex items-center justify-center mb-4">
        <Image src="/logo.png" alt="SAURO" width={80} height={80} />
      </Link>

      {!loading && user && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-sauro-green flex items-center justify-center">
              <User size={20} className="text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                {user.nombre} {user.apellido}
              </p>
              <p className="text-gray-400 text-xs truncate">{user.rol}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
