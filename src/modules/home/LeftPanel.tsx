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
    <div className="backdrop-blur-sm bg-white/70 rounded-2xl shadow-xl p-8 border border-white/20 h-full hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-slate-800">Categorías</h3>
      </div>
      <p className="mb-8 text-slate-600 ml-14">
        Explora todas nuestras categorías de ayuda
      </p>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {categorias.map((categoria) => (
          <AccordionItem
            key={categoria.id.toString()}
            value={categoria.id.toString()}
            className="rounded-xl border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden bg-gradient-to-r from-white to-emerald-50/30"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-emerald-50/50 transition-colors duration-200">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  <span className="font-bold text-lg text-slate-700">
                    {categoria.nombre}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-3 py-1.5 rounded-full font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md">
                    {categoria.articulos.length}{" "}
                    {categoria.articulos.length === 1
                      ? "artículo"
                      : "artículos"}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 bg-gradient-to-b from-emerald-50/30 to-teal-50/20">
              {categoria.articulos.length > 0 ? (
                <ul className="space-y-3 mt-3">
                  {categoria.articulos.map((articulo) => (
                    <li key={articulo.id.toString()}>
                      <Link
                        href={`/articulo/${articulo.id}`}
                        className="group flex items-center justify-between p-4 bg-white border border-emerald-200 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-emerald-400 hover:bg-gradient-to-r hover:from-white hover:to-emerald-50"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:w-2 group-hover:h-2 transition-all"></div>
                          <span className="text-slate-700 font-medium group-hover:text-emerald-700 transition-colors">
                            {articulo.titulo}
                          </span>
                        </div>
                        <svg
                          className="w-5 h-5 flex-shrink-0 ml-3 text-emerald-600 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
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
                <p className="text-sm italic mt-3 text-slate-500 text-center py-4">
                  No hay artículos en esta categoría
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {categorias.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-slate-100 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-slate-500 font-medium">
            No hay categorías disponibles
          </p>
        </div>
      )}
    </div>
  );
}
