import React from "react";

interface AdminMainContentProps {
  children: React.ReactNode;
}

export function AdminMainContent({ children }: AdminMainContentProps) {
  return (
    <main className="flex-1 w-full min-h-screen overflow-y-auto p-4 sm:p-6 md:p-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full">{children}</div>
    </main>
  );
}
