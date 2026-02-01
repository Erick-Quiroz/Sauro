"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./sidebar";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón hamburguesa - Visible solo en mobile */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-sauro-dark text-white hover:bg-opacity-90 transition-all duration-300"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay - Visible cuando el menú está abierto en mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar - Responsive con posicionamiento correcto */}
      <aside
        className={`
          w-64 bg-sauro-dark text-white flex flex-col
          fixed left-0 top-0 h-screen z-30 md:z-0
          transition-transform duration-300 ease-in-out
          md:static md:h-screen md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <Sidebar closeMenu={closeMenu} />
      </aside>
    </>
  );
}
