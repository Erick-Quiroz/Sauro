import React from "react";

export function ClientFooter() {
  return (
    <footer className="bg-neutral-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          Todos los Derechos Reservados - {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
