import React from "react";

interface AdminContainerProps {
  children: React.ReactNode;
}

export function AdminContainer({ children }: AdminContainerProps) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full overflow-hidden bg-sauro-gray-light">
      {children}
    </div>
  );
}
