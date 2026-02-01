import React from "react";
import { AdminContainer } from "./admin-container";
import { HamburgerMenu } from "./hamburger-menu";
import { AdminMainContent } from "./admin-main-content";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminContainer>
      <HamburgerMenu />
      <AdminMainContent>{children}</AdminMainContent>
    </AdminContainer>
  );
}
