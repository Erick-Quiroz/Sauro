"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FolderOpen,
  Package,
  Users,
  Shield,
  Settings,
  Home,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Categorías",
    href: "/admin/categorias",
    icon: FolderOpen,
  },
  {
    title: "Artículos",
    href: "/admin/articulos",
    icon: Package,
  },
  {
    title: "Usuarios",
    href: "/admin/usuarios",
    icon: Users,
  },
  {
    title: "Roles",
    href: "/admin/roles",
    icon: Shield,
  },
];

interface SidebarMenuProps {
  closeMenu?: () => void;
}

export function SidebarMenu({ closeMenu }: SidebarMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // Para "/admin" - activo solo en el dashboard exacto
    if (href === "/admin") {
      return pathname === "/admin" || pathname === "/admin/";
    }
    // Para otras rutas, usar startsWith
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex-1 px-4 py-6 space-y-2">
      {/* Botón Atrás al Inicio */}
      <Link href="/" onClick={closeMenu}>
        <div className="flex items-center gap-2 px-3 py-2 mb-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
          <ArrowLeft size={18} className="animate-pulse" />
          <Home size={18} />
          <span className="text-sm">Inicio</span>
        </div>
      </Link>

      {/* Separador */}
      <div className="border-t border-gray-600 my-4"></div>

      {/* Menú principal */}
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
          <Link key={item.href} href={item.href} onClick={closeMenu}>
            <div
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-r-lg transition-all duration-200",
                active
                  ? "bg-sauro-green text-black font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-white/10",
              )}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
