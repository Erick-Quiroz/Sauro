"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

export function SidebarFooter() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutConfirm = async () => {
    setShowLogoutDialog(false);
    await logout();
  };

  return (
    <div className="p-4 border-t border-white/10 space-y-2">
      <Link href="/admin/settings" className="block">
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-r-lg transition-all duration-200",
            pathname.startsWith("/admin/settings")
              ? "bg-sauro-green text-black font-semibold"
              : "text-gray-300 hover:text-white hover:bg-white/10",
          )}
        >
          <Settings size={20} />
          <span>Configuración</span>
        </div>
      </Link>
      <Button
        variant="default"
        className="w-full bg-sauro-green hover:bg-sauro-green/90 text-black font-semibold"
        onClick={() => setShowLogoutDialog(true)}
      >
        <LogOut size={18} className="mr-2" />
        Cerrar Sesión
      </Button>

      <ConfirmDialog
        isOpen={showLogoutDialog}
        title="Cerrar Sesión"
        description="¿Estás seguro de que deseas cerrar sesión?"
        confirmText="Cerrar Sesión"
        variant="info"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutDialog(false)}
      />
    </div>
  );
}
