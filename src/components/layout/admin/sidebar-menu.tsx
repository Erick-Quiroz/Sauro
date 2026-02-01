"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FolderOpen,
  Package,
  Users,
  Shield,
  Settings,
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
    if (href === "/admin") {
      return pathname === "/admin" || pathname === "/admin/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex-1 px-4 py-6 space-y-2">
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
