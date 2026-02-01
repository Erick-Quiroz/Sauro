"use client";

import Image from "next/image";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function RightPanel() {
  return (
    <div className="p-6 rounded-lg  h-full flex flex-col" style={{}}>
      <div className="mb-6 w-full rounded-lg overflow-hidden flex items-center justify-center">
        <Image
          src="/faq.png"
          alt="Ayuda"
          width={600}
          height={250}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      <h3
        className="text-2xl font-bold mb-4"
        style={{ color: "rgb(180, 83, 9)" }}
      >
        Búsqueda Rápida
      </h3>
      <p className="mb-4" style={{ color: "rgb(146, 64, 14)" }}>
        Encuentra lo que necesitas al instante
      </p>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar artículos..."
          className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            color: "rgb(31, 41, 55)",
            borderColor: "rgb(251, 191, 36)",
            borderWidth: "1px",
          }}
        />
      </div>

      <div
        className="rounded p-4"
        style={{ backgroundColor: "rgb(234, 88, 12)" }}
      >
        <h4
          className="font-semibold mb-2"
          style={{ color: "rgb(255, 255, 255)" }}
        >
          ¿Necesitas más ayuda?
        </h4>
        <p className="text-sm mb-4" style={{ color: "rgb(254, 243, 199)" }}>
          Contacta con nuestro equipo de soporte
        </p>
        <div className="flex gap-3">
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
            style={{ color: "rgb(255, 255, 255)" }}
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
            style={{ color: "rgb(255, 255, 255)" }}
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="mailto:soporte@email.com"
            className="hover:opacity-80"
            style={{ color: "rgb(255, 255, 255)" }}
          >
            <MdEmail size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}
