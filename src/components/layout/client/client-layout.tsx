import React from "react";
import { ClientHeader } from "./ClientHeader";
import { ClientFooter } from "./ClientFooter";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ClientHeader />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <ClientFooter />
    </div>
  );
}
