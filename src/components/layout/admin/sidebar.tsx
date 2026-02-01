"use client";

import { SidebarHeader } from "./sidebar-header";
import { SidebarMenu } from "./sidebar-menu";
import { SidebarFooter } from "./sidebar-footer";

interface SidebarProps {
  closeMenu?: () => void;
}

export function Sidebar({ closeMenu }: SidebarProps) {
  return (
    <div className="flex flex-col h-full w-full">
      <SidebarHeader />
      <SidebarMenu closeMenu={closeMenu} />
      <SidebarFooter />
    </div>
  );
}
