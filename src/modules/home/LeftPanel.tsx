"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Articulo {
  id: bigint | number;
  titulo: string;
  contenido?: any;
}

interface Categoria {
  id: bigint | number;
  nombre: string;
  articulos: Articulo[];
}

interface LeftPanelProps {
  categorias: Categoria[];
}

export function LeftPanel({ categorias }: LeftPanelProps) {
  return (
    <div className="p-6   h-full ">
      <h3 className="text-2xl font-bold mb-2">Categorías</h3>
      <p className="mb-6 text-sm" style={{ color: "rgb(4, 120, 87)" }}>
        Explora todas nuestras categorías de ayuda
      </p>

      <Accordion type="single" collapsible className="w-full space-y-3">
        {categorias.map((categoria) => (
          <AccordionItem
            key={categoria.id.toString()}
            value={categoria.id.toString()}
            className="rounded-lg border"
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              borderColor: "green",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 rounded-lg"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className="font-semibold"
                  style={{ color: "rgb(6, 78, 59)" }}
                >
                  {categoria.nombre}
                </span>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: "rgb(209, 250, 229)",
                    color: "rgb(4, 120, 87)",
                  }}
                >
                  {categoria.articulos.length}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent
              className="px-4 pb-4"
              style={{ backgroundColor: "rgb(240, 253, 250)" }}
            >
              {categoria.articulos.length > 0 ? (
                <ul className="space-y-2 mt-2">
                  {categoria.articulos.map((articulo) => (
                    <li key={articulo.id.toString()}>
                      <Link
                        href={`/articulo/${articulo.id}`}
                        className="flex items-center justify-between p-3 border rounded-lg transition-all text-sm hover:shadow-md"
                        style={{
                          backgroundColor: "rgb(204, 251, 241)",
                          borderColor: "rgb(94, 234, 212)",
                          color: "rgb(19, 78, 74)",
                        }}
                      >
                        <span>{articulo.titulo}</span>
                        <svg
                          className="w-5 h-5 flex-shrink-0 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: "rgb(13, 148, 136)" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm italic mt-2" style={{ color: "#6b7280" }}>
                  No hay artículos en esta categoría
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {categorias.length === 0 && (
        <p className="text-center py-4" style={{ color: "#6b7280" }}>
          No hay categorías disponibles
        </p>
      )}
    </div>
  );
}
